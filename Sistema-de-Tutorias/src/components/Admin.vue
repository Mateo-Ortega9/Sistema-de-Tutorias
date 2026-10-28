<template>
  <div class="admin-page">
    <header class="admin-topbar">
      <div>
        <span class="eyebrow">PANEL INTERNO</span>
        <h1>Administración</h1>
        <p>Gestioná las cuentas registradas en el sistema.</p>
      </div>
      <button class="logout" type="button" @click="cerrarSesion">
        Cerrar sesión
      </button>
    </header>

    <main class="admin-content">
      <section class="stats">
        <article class="stat-card">
          <strong>{{ usuarios.length }}</strong>
          <span>Usuarios registrados</span>
        </article>
        <article class="stat-card">
          <strong>{{ profesores }}</strong>
          <span>Profesores</span>
        </article>
        <article class="stat-card">
          <strong>{{ administradores }}</strong>
          <span>Administradores</span>
        </article>
      </section>

      <section class="users-card">
        <div class="section-title">
          <div>
            <h2>Usuarios del sistema</h2>
            <p>Información guardada en este navegador.</p>
          </div>
        </div>

        <div v-if="usuarios.length" class="user-list">
          <div v-for="usuario in usuarios" :key="usuario.id || usuario.email" class="user-row">
            <div class="avatar">{{ iniciales(usuario) }}</div>
            <div class="user-data">
              <strong>{{ usuario.nombre }} {{ usuario.apellido }}</strong>
              <span>{{ usuario.email }}</span>
            </div>
            <span class="role">{{ etiquetaRol(usuario) }}</span>
          </div>
        </div>

        <p v-else class="empty">Todavía no hay usuarios registrados.</p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const usuarios = ref(JSON.parse(localStorage.getItem("usuariosPROA") || "[]"));

const rolDe = usuario =>
  String(usuario.rol || usuario.tipo || "").trim().toLowerCase();

const profesores = computed(() =>
  usuarios.value.filter(usuario => rolDe(usuario) === "profesor").length
);

const administradores = computed(() =>
  usuarios.value.filter(usuario =>
    ["administrador", "administracion"].includes(rolDe(usuario))
  ).length
);

const iniciales = usuario =>
  [usuario.nombre, usuario.apellido]
    .filter(Boolean)
    .map(texto => texto.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2) || "U";

const etiquetaRol = usuario =>
  rolDe(usuario) === "profesor" ? "Profesor" : "Administración";

const cerrarSesion = () => {
  localStorage.removeItem("usuarioActual");
  router.push("/login");
};
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2ff, #f8fafc 55%, #e0e7ff);
  color: #172033;
}

.admin-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 34px 7%;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.eyebrow {
  color: #4f46e5;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .12em;
}

h1 {
  margin: 8px 0 5px;
}

.admin-topbar p,
.section-title p {
  margin: 0;
  color: #6b7280;
}

.logout {
  padding: 11px 16px;
  border: 0;
  border-radius: 9px;
  background: #4f46e5;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.admin-content {
  width: min(100% - 40px, 1050px);
  margin: 32px auto;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 22px;
}

.stat-card,
.users-card {
  padding: 22px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(37, 50, 90, .06);
}

.stat-card strong {
  display: block;
  color: #4f46e5;
  font-size: 30px;
}

.stat-card span {
  color: #6b7280;
}

.section-title h2 {
  margin: 0 0 5px;
}

.user-list {
  margin-top: 20px;
}

.user-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-top: 1px solid #eef0f4;
}

.avatar {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #e0e7ff;
  color: #4338ca;
  font-weight: 800;
}

.user-data {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.user-data span {
  color: #6b7280;
  font-size: 13px;
}

.role {
  padding: 6px 10px;
  border-radius: 20px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 12px;
  font-weight: 700;
}

.empty {
  padding: 28px 0 8px;
  color: #6b7280;
}

@media (max-width: 650px) {
  .admin-topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .user-row {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .role {
    margin-left: 56px;
  }
}
</style>
