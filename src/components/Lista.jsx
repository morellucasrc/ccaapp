import React, { useState, useCallback } from "react";
import { Timestamp } from "firebase/firestore";
import { usePersonas } from "../context/PersonasContext";

export default function Lista() {
  const { personas, updatePersona, deletePersona, cargando } = usePersonas();
  const [expandedId, setExpandedId] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});

  if (cargando) return <p>Cargando personas...</p>;
  if (!personas || personas.length === 0)
    return <div className="vacio">No hay personas para mostrar.</div>;

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    return fecha instanceof Timestamp
      ? fecha.toDate().toLocaleDateString()
      : fecha;
  };

  const copiarAlPortapapeles = useCallback((persona) => {
    const texto = `
Nombre: ${persona.nombre} ${persona.apellido}
Edad: ${persona.edad || "-"}
Género: ${persona.genero || "-"}
Grupo: ${persona.grupo || "-"}
Teléfono: ${persona.telefono || "-"}
Notas: ${persona.notas || "-"}
Fecha: ${formatearFecha(persona.fecha)}
    `.trim();

    navigator.clipboard.writeText(texto).then(() => {
      const aviso = document.createElement("div");
      aviso.className = "toast";
      aviso.textContent = "📋 Información copiada";
      document.body.appendChild(aviso);
      setTimeout(() => aviso.remove(), 2000);
    });
  }, []);

  const empezarEdicion = (persona) => {
    setEditandoId(persona.id);
    setFormData({
      grupo: persona.grupo || "",
      notas: persona.notas || "",
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormData({});
  };

  const guardarEdicion = (persona) => {
    const datosActualizados = {
      ...persona,
      grupo: formData.grupo || "",
      notas: formData.notas || "",
    };
    updatePersona(datosActualizados);
    setEditandoId(null);
    setFormData({});
  };

  const borrarPersona = (id) => {
    if (window.confirm("¿Seguro que quieres borrar este registro?")) {
      deletePersona(id);
      setExpandedId(null);
      setEditandoId(null);
    }
  };

  return (
    <div className="lista">
      {personas.map((persona) => {
        const isExpanded = expandedId === persona.id;
        const isEditing = editandoId === persona.id;

        return (
          <div
            key={persona.id}
            className={`card card-mini ${isExpanded ? "expandida" : ""}`}
          >
            {isExpanded ? (
              <>
                <button
                  className="cerrar"
                  onClick={() => {
                    setExpandedId(null);
                    setEditandoId(null);
                  }}
                >
                  ❌
                </button>

                {isEditing ? (
                  <div className="form-edicion">
                    <select
                      value={formData.grupo || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, grupo: e.target.value })
                      }
                    >
                      <option value="">Seleccione grupo</option>
                      <option value="Joven">Joven</option>
                      <option value="Matrimonio">Matrimonio</option>
                      <option value="Adulto">Adulto</option>
                    </select>

                    <textarea
                      placeholder="Notas"
                      value={formData.notas || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, notas: e.target.value })
                      }
                    />

                    <div className="acciones-edicion">
                      <button onClick={() => guardarEdicion(persona)}>
                        💾 Guardar
                      </button>
                      <button onClick={cancelarEdicion}>❌ Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3>
                      {persona.nombre} {persona.apellido}
                    </h3>
                    <p>
                      <strong>Edad:</strong> {persona.edad || "-"}
                    </p>
                    <p>
                      <strong>Género:</strong> {persona.genero || "-"}
                    </p>
                    <p>
                      <strong>Grupo:</strong> {persona.grupo || "-"}
                    </p>
                    <p>
                      <strong>Teléfono:</strong> {persona.telefono || "-"}
                    </p>
                    <p>
                      <strong>Fecha:</strong> {formatearFecha(persona.fecha)}
                    </p>
                    <p>
                      <strong>Notas:</strong> {persona.notas || "-"}
                    </p>
                    <div className="acciones">
                      <button onClick={() => copiarAlPortapapeles(persona)}>
                        📋 Copiar info
                      </button>
                      <button onClick={() => empezarEdicion(persona)}>
                        ✏️ Editar
                      </button>
                      <button onClick={() => borrarPersona(persona.id)}>
                        🗑️ Borrar
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => setExpandedId(persona.id)}
                onKeyDown={(e) => e.key === "Enter" && setExpandedId(persona.id)}
              >
                <strong>
                  {persona.nombre} {persona.apellido}
                </strong>
                <p>
                  {persona.grupo || "-"} · {persona.genero || "-"}
                </p>
                <small>{formatearFecha(persona.fecha)}</small>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
