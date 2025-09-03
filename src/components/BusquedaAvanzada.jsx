import { usePersonas } from "../context/PersonasContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";

export default function BusquedaAvanzada({ onClose }) {
  const { personas } = usePersonas();
  const [fechaFiltro, setFechaFiltro] = useState(null);

  // Función para formatear fecha a "YYYY-MM-DD"
  const formatearFecha = (fecha) => {
    if (!fecha) return null;

    if (fecha instanceof Timestamp) {
      fecha = fecha.toDate();
    }

    if (fecha instanceof Date) {
      return fecha.toISOString().slice(0, 10);
    }

    // Si ya es string, intentamos normalizar
    try {
      return new Date(fecha).toISOString().slice(0, 10);
    } catch {
      return null;
    }
  };

  const personasFiltradas = fechaFiltro
    ? personas.filter((p) => formatearFecha(p.fecha) === formatearFecha(fechaFiltro))
    : personas;

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="card glass busqueda-avanzada fade-in">
        <h3>Búsqueda Avanzada</h3>
        <Calendar onChange={setFechaFiltro} value={fechaFiltro} />

        <button onClick={() => setFechaFiltro(null)} className="btn-cancelar">
          Limpiar filtro
        </button>

        <p>
          Total personas registradas: <strong>{personas.length}</strong>
        </p>

        <div className="lista">
          {personasFiltradas.length === 0 ? (
            <p className="vacio">No hay registros para esta fecha.</p>
          ) : (
            personasFiltradas.map((p) => (
              <div className="card card-mini" key={p.id}>
                <strong>
                  {p.nombre} {p.apellido}
                </strong>
                <p>
                  {p.grupo} - {p.genero} - {p.edad ? `${p.edad} años` : "Edad no indicada"}
                </p>
                <small>{formatearFecha(p.fecha)}</small>
              </div>
            ))
          )}
        </div>

        <button onClick={onClose} className="btn-cancelar" style={{ marginTop: "1rem" }}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
