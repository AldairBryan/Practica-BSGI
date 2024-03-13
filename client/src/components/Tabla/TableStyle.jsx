import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTable, useGlobalFilter, useSortBy, useFilters, usePagination, useRowSelect } from 'react-table';

import { GlobalFilter } from "./GlobalFilter";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { BsFillTrashFill, BsFillPencilFill, BsChevronBarLeft, BsChevronLeft, BsChevronRight, BsChevronBarRight } from "react-icons/bs";


// Componente Table: Un componente para renderizar una tabla con funciones avanzadas.
// Props:
//   - columns: Definición de las columnas de la tabla.
//   - data: Datos para la tabla.
//   - nombre: Nombre específico para mostrar en el título.
//   - onEdit: Función para manejar la acción de editar.
//   - onDelete: Función para manejar la acción de eliminar.
function Table ({ columns, data, nombre, onEdit, onDelete, onEditName }) {

  // Use la lógica y funciones proporcionadas por useTable para construir la interfaz de usuario
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      // Agregar una columna para la selección
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  /*seleccion de filas*/
  const navigate = useNavigate();
  const handleRowClick = (rowId) => {
    navigate(`/${nombre}/${rowId}`);
  }



  // Renderizar la IU de la tabla
  return (
  <>
  {/* Contenedor del filtro global */}
  <div className="contenedor-filtro">
    <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      globalFilter={state.globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
    {headerGroups.map((headerGroup) =>
      headerGroup.headers.map((column) =>
        column.Filter ? (
          <div key={column.id} className="contenedor-seleccionar">
            <label htmlFor={column.id} className='text-fil'>{column.render("Header")}: </label>
            {column.render("Filter")}
          </div>
        ) : null
      )
    )}
  </div>

  {/* Contenedor de la lista */}
  <div className="contenedor-lista">
    <h3>Lista de {nombre}</h3>
    <table {...getTableProps()} className="tabla">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr className="tabla-header"
          {...headerGroup.getHeaderGroupProps()} >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  }
              >
                {column.render("Header")}
              </th>
            ))}
            <th>Acciones</th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className='tabla-row'>
              {row.cells.map((cell, index) => {
                return  (
                  <td 
                    key={index}
                    onClick={() => {
                      handleRowClick(eval(`row.original.${onEditName}`));                      
                    }}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
              <td>
                <span className="actions">
                  <BsFillPencilFill
                    color='green'
                    className="btn-edit"
                    onClick={() => onEdit(eval(`row.original.${onEditName}`))}
                  />
                  <BsFillTrashFill
                    color='green'
                    className="btn-delete"
                    onClick={() => onDelete(eval(`row.original.${onEditName}`))}
                  />
                </span>
              </td>
            </tr>            
          );
        })}        
      </tbody>
    </table>

    {/* Paginación y selección de tamaño de página */}
    <div className="paginacion">
      <p>
        <span>
          Página{' '}
          <strong>
            {state.pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
      </p>
      <div className="pag-botones">
        <button className='btn-pagin' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <BsChevronBarLeft color='white' width={10} height={10}/>
        </button>
        <button className='btn-pagin' onClick={() => previousPage()} disabled={!canPreviousPage}>
          <BsChevronLeft color='white' width={10} height={10}/>
        </button>
        <button className='btn-pagin' onClick={() => nextPage()} disabled={!canNextPage}>
          <BsChevronRight color='white' width={10} height={10}/>
        </button>
        <button className='btn-pagin' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <BsChevronBarRight color='white' width={10} height={10}/>
        </button> 
      </div>     
      <select className="select"
        value={state.pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[5, 10, 20].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Mostrar {pageSize}
          </option>
        ))}
      </select>
      
    </div>
  </div>
    {/*<div>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
        </div>*/}    
  </>    
  );
}
export { Table };