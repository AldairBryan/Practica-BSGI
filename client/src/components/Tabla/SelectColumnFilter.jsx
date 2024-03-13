import React, { useMemo } from 'react';


// Componente SelectColumnFilter: Filtro para una columna que utiliza un cuadro de selección.
// Props:
//   - column: Objeto de la columna proporcionado por react-table.
//     - filterValue: Valor actual del filtro.
//     - setFilter: Función para actualizar el filtro.
//     - preFilteredRows: Filas antes de aplicar el filtro.
//     - id: Identificador único de la columna.
function SelectColumnFilter({
    column: { filterValue,
              setFilter,
              preFilteredRows,
              id },
}) {
  
  // Calcular las opciones para el filtro utilizando las filas antes de aplicar el filtro.
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  
  /// Renderizar multi-select box
  return (
    <select
      name={id}
      id={id}
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className='select'
    >
      <option value="">Todos</option>
      {options.map((option, i) => (
        <option key={i} value={option}>{option}</option>
      ))}
    </select>   
  );
}
export { SelectColumnFilter };