import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePersonas } from "../context/PersonasContext";
import { toast } from "react-toastify";

export default function Formulario() {
  const { addPersona } = usePersonas();

  const valoresIniciales = {
    nombre: "",
    apellido: "",
    fecha: new Date().toISOString().slice(0, 10),
    edad: "",
    genero: "Hombre",
    grupo: "Joven",
    telefono: "",
    notas: "",
  };

  const [data, setData] = useState(valoresIniciales);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.nombre.trim() || !data.apellido.trim()) {
      toast.error("Nombre y Apellido son obligatorios");
      return;
    }

    if (data.edad && (data.edad < 0 || data.edad > 120)) {
      toast.error("Edad inválida");
      return;
    }

    if (new Date(data.fecha) > new Date()) {
      toast.error("La fecha no puede ser futura");
      return;
    }

    // Guardar persona
    addPersona({
      ...data,
      grupo: data.grupo.toLowerCase(), // normalizar
      id: uuidv4(),
    });

    toast.success("Persona agregada");

    // Resetear todos los inputs
    setData(valoresIniciales);
  };

  return (
    <form onSubmit={handleSubmit} className="card glass formulario">
      <h2>Registrar Persona</h2>
      <input
        name="nombre"
        value={data.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        name="apellido"
        value={data.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        required
      />
      <input
        type="number"
        name="edad"
        value={data.edad}
        onChange={handleChange}
        placeholder="Edad"
        min="0"
        max="120"
      />
      <input
        type="tel"
        name="telefono"
        value={data.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
      />
      <textarea
        name="notas"
        value={data.notas}
        onChange={handleChange}
        placeholder="Notas"
      />
      <label>
        Fecha:
        <input
          type="date"
          name="fecha"
          value={data.fecha}
          onChange={handleChange}
          max={new Date().toISOString().slice(0, 10)}
        />
      </label>
      <select name="genero" value={data.genero} onChange={handleChange}>
        <option>Hombre</option>
        <option>Mujer</option>
      </select>
      <select name="grupo" value={data.grupo} onChange={handleChange}>
        <option>Joven</option>
        <option>Matrimonio</option>
        <option>Adulto</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
}
