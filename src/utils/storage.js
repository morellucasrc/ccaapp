const KEY = "miapp_personas";

export function guardarPersonasLS(personas) {
  localStorage.setItem(KEY, JSON.stringify(personas));
}

export function leerPersonasLS() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}
