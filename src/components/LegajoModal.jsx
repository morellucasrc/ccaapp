import React, { useState, useEffect } from "react";
import { usePersonas } from "../context/PersonasContext";

export default function LegajoModal({ persona, cerrar }) {
  const { updatePersona, deletePersona } = usePersonas();
  const [editando, setEditando] = useState(false);
  const [datos, setDatos] = useState({ grupo: persona.grupo, notas: persona.notas });

  useEffect(() => {
    setDatos({ grupo: persona.grupo, notas: persona.notas });
    setEditando(false);
  }, [persona]);

  const handleChange = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const handleGuardar = () => {
    updatePersona({ id: persona.id, ...datos });
    setEditando(false);
  };

  const handleEliminar = () => {
    if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
      deletePersona(persona.id);
      cerrar();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content card glass">
        <button className="cerrar" onClick={cerrar}>✖</button>
        <h2>Ficha de {persona.nombre} {persona.apellido}</h2>

        {editando ? (
          <form onSubmit={(e) => { e.preventDefault(); handleGuardar(); }}>
            <select name="grupo" value={datos.grupo || ""} onChange={handleChange}>
              <option value="">Seleccione grupo</option>
              <option value="Joven">Joven</option>
              <option value="Matrimonio">Matrimonio</option>
              <option value="Adulto">Adulto</option>
            </select>

            <textarea name="notas" value={datos.notas || ""} onChange={handleChange} placeholder="Notas" rows="3" />

            <div className="acciones">
              <button type="submit">💾 Guardar</button>
              <button type="button" onClick={() => setEditando(false)}>✖ Cancelar</button>
            </div>
          </form>
        ) : (
          <>
            <p><strong>Nombre:</strong> {persona.nombre} {persona.apellido}</p>
            <p><strong>Edad:</strong> {persona.edad || "-"}</p>
            <p><strong>Género:</strong> {persona.genero || "-"}</p>
            <p><strong>Grupo:</strong> {persona.grupo || "-"}</p>
            <p><strong>Teléfono:</strong> {persona.telefono || "-"}</p>
            <p><strong>Fecha:</strong> {persona.fecha || "-"}</p>
            <p><strong>Notas:</strong> {persona.notas || "-"}</p>

            <div className="acciones">
              <button onClick={() => setEditando(true)}>✏ Editar</button>
              <button onClick={handleEliminar}>🗑 Eliminar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
