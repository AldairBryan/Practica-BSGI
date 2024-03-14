import React from 'react';
import { BsBuildingFill, BsPersonFill } from 'react-icons/bs';

const DetalleOperador = ({ operador }) => {
  return (
    <div className='detalle-operador'>
      <div className='detalle-subtitle'>
        <BsPersonFill color='green' className=''/>
        <h4>{operador.colnom}</h4>
        <div className="linea"></div>
      </div>
      <div className='detalle-datos'>
        <h6>Nombre</h6>
        <p>{operador.colnom}</p>
        <h6>Apellido</h6>
        <p>{operador.colape}</p>
        <h6>Fecha de Nacimiento</h6>
        <p>{operador.colfecnac}</p>
        <h6>Posición</h6>
        <p>{operador.colpos}</p>
      </div>
    </div>
  );
};

export default DetalleOperador;