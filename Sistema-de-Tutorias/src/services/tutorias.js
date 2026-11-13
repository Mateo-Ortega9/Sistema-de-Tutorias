import { supabase, supabaseConfigurado } from "../lib/supabase";

const STORAGE_KEY = "tutoriasPROA";

const leerLocalmente = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

const guardarLocalmente = tutorias => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tutorias));
  return tutorias;
};

export async function listarTutorias() {
  if (!supabaseConfigurado) {
    return {
      data: leerLocalmente(),
      error: null,
      origen: "local"
    };
  }

  const { data, error } = await supabase
    .from("tutorias")
    .select("*")
    .order("id", { ascending: true });

  return {
    data: data || [],
    error,
    origen: "supabase"
  };
}

export async function crearTutoria(tutoria) {
  if (!supabaseConfigurado) {
    const nuevas = [
      ...leerLocalmente(),
      { id: Date.now(), ...tutoria }
    ];

    return {
      data: guardarLocalmente(nuevas).at(-1),
      error: null,
      origen: "local"
    };
  }

  const { data: usuarioActual } = await supabase.auth.getUser();
  const payload = usuarioActual.user
    ? { ...tutoria, creador_id: usuarioActual.user.id }
    : tutoria;

  const { data, error } = await supabase
    .from("tutorias")
    .insert(payload)
    .select()
    .single();

  return {
    data,
    error,
    origen: "supabase"
  };
}
