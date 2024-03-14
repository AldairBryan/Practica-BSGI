import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHorario } from '../../api/Horario.api';
import { toast } from 'react-toastify';
import { BsBuildingFill, BsPersonFill } from "react-icons/bs";
import DetalleOperador from './DetalleOperador';

function PagoOperadorDetalle() {

  const params = useParams();
  /*Datos del alquiler*/ 
  const [horario, setHorario] = useState([]);

  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate('/horarios');
  };
  const handleEditar = () => {
    navigate(`/horarios/${params.id}/edit`);
  };

  useEffect(() => {
    const loadHorario = async () => {
      try {
        const response = await getHorario(params.id);
        setHorario(response.data);
      } catch (error) {
        toast.error(`Error al cargar el horario: ${error.message}`);
      }
  };
  loadHorario();
  }, []);

  const styles = {
    separador: {
      color: '#000000',
      fontWeight: 'bold',
    },
  };
  
  return (
    <div className='contenedor-componente'>
      <h2>Detalle del Horario: </h2>
      <div className='contenedor-detalle'>
      <div className='detalle-subtitle'>
          <BsBuildingFill color='green' className=''/>
          <h4>Datos del Horario</h4>
          <div className="linea"></div>
        </div>
        <div className='detalle-datos'>
        <h6>Dia</h6>
        <p> {horario.hordia}</p>
        <h6>Hora de Inicio</h6>
        <p> {horario.horini}</p>
        <h6>Hora de Fin</h6>
        <p> {horario.horfin}</p>
        </div>
        <div className='detalle-subtitle'>
          <BsPersonFill color='green' className=''/>
          <h4>Colaboradores</h4>
          <div className="linea"></div>
        </div>
          {horario?.horcolcod?.map((operador, index) => (
            <DetalleOperador key={index} operador={operador} />
          ))}
      </div>
      <div className='contenedor-btn-detalle'>
        <button className='btn-regresar' type='button' onClick={ () => handleRegresar() } >Regresar</button>
        <button className='btn-editar' type='button' onClick={ () => handleEditar()} >Editar</button>
      </div>      
    </div>
  );
}

export default PagoOperadorDetalle;
