import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { BsSearch } from "react-icons/bs";
import 'regenerator-runtime/runtime';


// Componente GlobalFilter: Un filtro de búsqueda global para una tabla.
// Props:
//   - preGlobalFilteredRows: Filas antes de aplicar el filtro global.
//   - globalFilter: Valor actual del filtro global.
//   - setGlobalFilter: Función para actualizar el filtro global.
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {

  // Extraer la longitud de las filas antes de aplicar el filtro global.
  const count = preGlobalFilteredRows.length;

  // Estado local para el valor actual del filtro.
  const [value, setValue] = useState(globalFilter);
  
  // Debounce para retrasar la actualización del filtro global para evitar llamadas innecesarias.
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200);

  // Manejar el cambio de valor en el campo de búsqueda.
  const handleInputChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  
  // Renderizar el componente de filtro global.
  return (
    <div className="contenedor-input">
      <span>
        <BsSearch className='icon-search'/>
      </span>
      <input
        type="search"
        value={value || ""}
        onChange={ handleInputChange }
        placeholder={`${count} registros...`}
        className='input-search'
      />
    </div>
  );
}
export { GlobalFilter };