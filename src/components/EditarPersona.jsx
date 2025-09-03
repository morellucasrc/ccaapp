import { useState } from "react";
import { usePersonas } from "../context/PersonasContext";

export default function EditarPersona({ persona, onClose }) {
  const { updatePersona, deletePersona } = usePersonas();
  const [data, setData] = useState({ grupo: persona.grupo, notas: persona.notas });

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSave = () => {
    updatePersona({ id: persona.id, ...data });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("¿Seguro que quieres eliminar esta persona?")) {
      deletePersona(persona.id);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="card glass editar-persona">
        <button className="cerrar" onClick={onClose}>✖</button>
        <h2>Editar datos de {persona.nombre} {persona.apellido}</h2>

        <select name="grupo" value={data.grupo || ""} onChange={handleChange}>
          <option value="">Seleccione grupo</option>
          <option value="Joven">Joven</option>
          <option value="Matrimonio">Matrimonio</option>
          <option value="Adulto">Adulto</option>
        </select>

        <textarea name="notas" value={data.notas || ""} onChange={handleChange} placeholder="Notas" />

        <div className="acciones" style={{ marginTop: "1rem" }}>
          <button onClick={handleSave}>Guardar cambios</button>
          <button onClick={handleDelete} className="btn-eliminar">Eliminar</button>
          <button onClick={onClose} className="btn-cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
