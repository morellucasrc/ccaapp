import React from "react";
import { useAuth } from "./AuthContext"; // 👈 importamos login

export default function Sidebar({ current, setCurrent }) {
  const { user } = useAuth(); // si no hay login → user = null

  const opcionesBase = [{ label: "Registrar", value: "registro" }];
  const opcionesPrivadas = [
    { label: "Lista", value: "lista" },
    { label: "Buscar", value: "busqueda" },
  ];

  // unir las opciones: siempre las base, y solo si hay user las privadas
  const opciones = user ? [...opcionesBase, ...opcionesPrivadas] : opcionesBase;

  return (
    <aside className="sidebar glass">
      <h2 className="titulo-app">CCA NUEVOS</h2>

      <nav>
        {opciones.map((op) => (
          <button
            key={op.value}
            className={current === op.value ? "active" : ""}
            onClick={() => setCurrent(op.value)}
            aria-current={current === op.value ? "page" : undefined}
          >
            {op.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
