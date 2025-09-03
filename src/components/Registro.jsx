import { useState } from "react";
import { usePersonas } from "../context/PersonasContext";
import { v4 as uuidv4 } from "uuid";

export default function Registro() {
  const { addPersona } = usePersonas();

  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    fecha: new Date().toISOString().slice(0, 10),
    edad: "",
    genero: "",
    grupo: "",
    telefono: "",
    notas: "",
  });

  const handleChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (!persona.nombre.trim() || !persona.apellido.trim()) return false;
    if (persona.edad && (persona.edad < 0 || persona.edad > 120)) return false;
    if (persona.fecha && new Date(persona.fecha) > new Date()) return false;
    if (!persona.genero || !persona.grupo) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validar()) {
      return alert("Por favor, completa correctamente todos los campos obligatorios.");
    }

    // Convertir fecha a objeto Date para Firestore
    const fechaObj = persona.fecha ? new Date(persona.fecha) : new Date();

    await addPersona({ ...persona, id: uuidv4(), fecha: fechaObj });

    // Resetear formulario
    setPersona({
      nombre: "",
      apellido: "",
      fecha: new Date().toISOString().slice(0, 10),
      edad: "",
      genero: "",
      grupo: "",
      telefono: "",
      notas: "",
    });
  };

  return (
    <form className="formulario glass" onSubmit={handleSubmit} noValidate>
      <input
        name="nombre"
        value={persona.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
        aria-label="Nombre"
      />
      <input
        name="apellido"
        value={persona.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        required
        aria-label="Apellido"
      />
      <input
        type="date"
        name="fecha"
        value={persona.fecha}
        onChange={handleChange}
        max={new Date().toISOString().slice(0, 10)}
        aria-label="Fecha"
      />
      <input
        type="number"
        name="edad"
        value={persona.edad}
        onChange={handleChange}
        placeholder="Edad"
        min="0"
        max="120"
        aria-label="Edad"
      />
      <select
        name="genero"
        value={persona.genero}
        onChange={handleChange}
        aria-label="Género"
        required
      >
        <option value="">Seleccione género</option>
        <option value="Hombre">Hombre</option>
        <option value="Mujer">Mujer</option>
      </select>
      <select
        name="grupo"
        value={persona.grupo}
        onChange={handleChange}
        aria-label="Grupo"
        required
      >
        <option value="">Seleccione grupo</option>
        <option value="Joven">Joven</option>
        <option value="Matrimonio">Matrimonio</option>
        <option value="Adulto">Adulto</option>
      </select>
      <input
        type="tel"
        name="telefono"
        value={persona.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        aria-label="Teléfono"
      />
      <textarea
        name="notas"
        value={persona.notas}
        onChange={handleChange}
        placeholder="Notas"
        aria-label="Notas"
      />
      <button type="submit" className="btn-guardar">
        Guardar
      </button>
    </form>
  );
}
