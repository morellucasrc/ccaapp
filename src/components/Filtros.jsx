export default function Filtros({ filtros, setFiltros }) {
  const handleChange = (e) =>
    setFiltros({ ...filtros, [e.target.name]: e.target.value });

  return (
    <div className="filtros">
      <input
        name="nombre"
        value={filtros.nombre}
        onChange={handleChange}
        placeholder="Buscar por nombre"
      />
      <select name="genero" value={filtros.genero} onChange={handleChange}>
        <option value="">Todos</option>
        <option>Hombre</option>
        <option>Mujer</option>
      </select>
      <select name="grupo" value={filtros.grupo} onChange={handleChange}>
        <option value="">Todos</option>
        <option>Joven</option>
        <option>Matrimonio</option>
        <option>Adulto</option>
      </select>
      <input
        type="number"
        name="edadMin"
        value={filtros.edadMin}
        onChange={handleChange}
        placeholder="Edad mínima"
        min="0"
        max="120"
      />
      <input
        type="number"
        name="edadMax"
        value={filtros.edadMax}
        onChange={handleChange}
        placeholder="Edad máxima"
        min="0"
        max="120"
      />
      <input
        name="notas"
        value={filtros.notas}
        onChange={handleChange}
        placeholder="Buscar en notas"
      />
    </div>
  );
}
