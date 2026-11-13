import { supabase, supabaseConfigurado } from "../lib/supabase";

const normalizarRol = rol => {
  const valor = String(rol || "").trim().toLowerCase();
  return valor === "administrador" ? "administracion" : valor;
};

export const obtenerSesionActual = async () => {
  if (!supabaseConfigurado) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

export const obtenerPerfilActual = async (usuario = null) => {
  if (!supabaseConfigurado) return null;
  const actual = usuario || (await supabase.auth.getUser()).data.user;
  if (!actual) return null;

  const { data, error } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", actual.id)
    .maybeSingle();

  if (error) throw error;

  if (data) return data;

  const metadata = actual.user_metadata || {};
  const perfilInicial = {
    id: actual.id,
    email: actual.email || "",
    nombre: metadata.nombre || "",
    apellido: metadata.apellido || "",
    rol: normalizarRol(metadata.rol) || "profesor"
  };

  const { data: perfilCreado, error: errorCreacion } = await supabase
    .from("perfiles")
    .upsert(perfilInicial, { onConflict: "id" })
    .select()
    .single();

  if (errorCreacion) throw errorCreacion;
  return perfilCreado;
};

export const registrarUsuario = async ({ nombre, apellido, email, password, rol }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nombre,
        apellido,
        rol: normalizarRol(rol)
      }
    }
  });

  if (error) throw error;
  return data;
};

export const iniciarSesion = async ({ email, password, rol }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;

  const perfil = await obtenerPerfilActual(data.user);
  const rolReal = normalizarRol(perfil?.rol);

  if (rolReal && rolReal !== normalizarRol(rol)) {
    await supabase.auth.signOut();
    throw new Error("El tipo de usuario seleccionado no coincide con tu cuenta.");
  }

  return { ...data, perfil };
};

export const solicitarRecuperacion = async email => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/recuperar`
  });
  if (error) throw error;
};

export const actualizarPassword = async password => {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data;
};

export const guardarPerfil = async datos => {
  const { data: usuario, error: errorUsuario } = await supabase.auth.getUser();
  if (errorUsuario) throw errorUsuario;
  if (!usuario.user) throw new Error("No hay una sesión activa.");

  const { data, error } = await supabase
    .from("perfiles")
    .upsert(
      {
        id: usuario.user.id,
        email: usuario.user.email,
        ...datos
      },
      { onConflict: "id" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const cerrarSesion = async () => {
  if (!supabaseConfigurado) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export { normalizarRol };
