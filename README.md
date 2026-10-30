# Sistema de Tutorías PROA

<div align="center">

## Una plataforma para organizar tutorías, estudiantes y acompañamiento educativo

**Estado del proyecto: En desarrollo**

</div>

---

## Sobre el proyecto

El **Sistema de Tutorías PROA** es una aplicación web pensada para ayudar a las instituciones educativas a organizar el acompañamiento de sus estudiantes.

El sistema permite centralizar información de profesores, estudiantes, cursos, materias, tutorías y horarios en una interfaz sencilla. La idea principal es facilitar la comunicación y la planificación del trabajo tutorial, evitando que la información quede desordenada o repartida en distintos lugares.

Actualmente el proyecto se encuentra **en proceso de desarrollo**. La versión disponible ya cuenta con el flujo principal de acceso y con diferentes paneles para profesores y administradores, pero todavía se siguen agregando mejoras y nuevas funcionalidades.

## Descripción del producto

La aplicación está organizada en dos experiencias principales:

### Panel del profesor

El profesor puede:

- Iniciar sesión como profesor.
- Consultar estudiantes.
- Filtrar por curso y materia.
- Ver un calendario de tutorías.
- Enviar una tutoría por correo o WhatsApp.
- Completar y editar su perfil.
- Subir una foto de perfil.
- Elegir la materia que enseña.
- Agregar una descripción personal.
- Cerrar sesión.

### Panel de administración

El administrador puede:

- Consultar un resumen general del sistema.
- Ver la cantidad de usuarios, profesores y estudiantes.
- Crear nuevos usuarios.
- Buscar usuarios por nombre o correo.
- Filtrar usuarios por rol.
- Consultar estudiantes por curso y materia.
- Revisar cursos y materias.
- Cargar eventos en la agenda.
- Hacer seguimiento de tutorías programadas.
- Consultar reportes.
- Exportar información de usuarios a CSV.
- Ver notificaciones del sistema.
- Acceder a la vista del profesor.

## Funcionalidades principales

- Registro de usuarios.
- Inicio de sesión para profesores y administración.
- Recuperación de contraseña.
- Protección de rutas según el tipo de usuario.
- Perfil editable del profesor.
- Carga de foto de perfil.
- Gestión visual de cursos, materias y estudiantes.
- Agenda de tutorías.
- Reportes y estadísticas.
- Exportación de usuarios.
- Diseño responsive para computadora y celular.
- Cierre de sesión.

> En esta etapa los datos se guardan en el almacenamiento local del navegador mediante `localStorage`. No se utiliza todavía una base de datos real ni un servidor backend.

## Tecnologías utilizadas

- **Vue 3.5.40**
- **Vue Router 5.3.1**
- **Vite 8.1.5**
- **JavaScript**
- **HTML5**
- **CSS3**
- **Node.js**
- **npm**
- **localStorage** para persistencia local
- **Git y GitHub** para control de versiones y colaboración

## Herramientas de trabajo

- Visual Studio Code.
- GitHub.
- Git.
- npm.
- Navegador web.
- Vue Devtools para revisar el funcionamiento de la aplicación.
- Ramas de Git para organizar los cambios.
- Componentes reutilizables de Vue.

## Autores

- **Mateo Ortega**
- **Ariel RuizDiaz**
- **Felipe Funes**

## Requisitos

Para ejecutar el proyecto se necesita:

- Node.js 22.18.0 o superior.
- npm.
- Un navegador actualizado.
- Git, si se desea clonar el repositorio.

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Mateo-Ortega9/Sistema-de-Tutorias.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd Sistema-de-Tutorias/Sistema-de-Tutorias
```

3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

5. Abrir en el navegador la dirección que muestra Vite. Generalmente es:

```text
http://localhost:5173
```

## Guía rápida de uso

### Crear una cuenta

1. Entrar a la pantalla de inicio de sesión.
2. Seleccionar **Registrate**.
3. Completar nombre, apellido, correo institucional y contraseña.
4. Elegir el tipo de usuario:
   - Profesor.
   - Administración.
5. Presionar **Crear cuenta**.
6. Volver al inicio de sesión.

### Iniciar sesión como profesor

1. Seleccionar **Profesor**.
2. Escribir el correo institucional.
3. Escribir la contraseña.
4. Presionar **Iniciar sesión**.
5. Se abrirá el panel principal del profesor.

Desde el panel se pueden consultar estudiantes, usar filtros, revisar el calendario y abrir el perfil desde el ícono de usuario.

### Usar el perfil del profesor

1. Presionar el ícono de usuario.
2. Seleccionar **Mi perfil**.
3. Cargar una foto si se desea.
4. Completar nombre, apellido, materia y descripción.
5. Presionar **Guardar cambios**.

### Iniciar sesión como administración

1. Seleccionar **Administración**.
2. Escribir el correo y la contraseña de una cuenta administrativa.
3. Presionar **Iniciar sesión**.
4. Se abrirá el panel de administración.

Desde allí se pueden consultar usuarios, estudiantes, cursos, agenda, tutorías, reportes y notificaciones.

### Cargar una tutoría en la agenda

1. Entrar al panel de administración.
2. Abrir la sección **Agenda**.
3. Seleccionar fecha y hora.
4. Elegir materia, curso y estudiante.
5. Presionar **Agregar a la agenda**.
6. El evento aparecerá en la lista de próximas actividades.

### Ejecutar una tutoría desde el panel del profesor

1. Entrar a la vista del profesor.
2. Usar los filtros de curso y materia.
3. Presionar **Enviar Tutoría**.
4. Seleccionar un estudiante.
5. Elegir contacto por correo o WhatsApp.

### Cerrar sesión

En el menú del perfil o en el panel de administración, presionar **Cerrar sesión**. La aplicación vuelve a la pantalla de inicio de sesión.

## Comandos disponibles

Ejecutar el proyecto en desarrollo:

```bash
npm run dev
```

Compilar la aplicación para producción:

```bash
npm run build
```

Previsualizar la compilación:

```bash
npm run preview
```

## Estado actual y próximos pasos

El proyecto continúa en desarrollo. Algunas mejoras previstas son:

- Conectar una base de datos real.
- Crear un backend para usuarios y tutorías.
- Proteger las contraseñas de manera segura.
- Agregar permisos más avanzados.
- Permitir editar y administrar estudiantes.
- Incorporar notificaciones reales.
- Mejorar la agenda con calendario mensual.
- Agregar pruebas automatizadas.
- Publicar la aplicación en un servidor.

## Licencia

Este proyecto es desarrollado con fines educativos y forma parte del trabajo del equipo de Sistema de Tutorías PROA.
