import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { getAllHorarios } from '../../api/Horario.api';
import horarioColumns from '../../Utils/ComponentesUtils/horarioColumns';
import  Modal  from '../../components/Modal';
import { Table } from '../../components/Tabla/TableStyle';
import { FormDeleteHorario } from './FormDeleteHorario';
import '../../styles/ContenedorComp.css';

//import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function Horarios() {

  const navigate = useNavigate();

  /*Datos de proyectos para la tabla*/    
  const [horarios, setHorarios] = useState([]);   

  /*Estado del formulario para create, edit y delete*/
  const [activeFormDelete, setActiveFormDelete] = useState(false);
  
  const [selectedIdHor, setSelectedIdHor] = useState();
  
  /*Funciones */
  const handleCreate = () => {
    navigate('/horarios/create');
  }
  const handleEdit = (idHorario) => {
    navigate(`/horarios/${idHorario}/edit`);
  };
  const handleDelete = (idHorario) => {
    setSelectedIdHor(idHorario);
    setActiveFormDelete(!activeFormDelete);
  };
  
  const loadHorarios = async () => {
    try {
      const res = await getAllHorarios();
      setHorarios(res);
      console.log(res)
    } catch (error) {
      toast.error(`Error al cargar los horarios: ${error.message}`);
    }
  };

  useEffect(() => {
    loadHorarios();
  }, []);


  return (
    <>   
    <div className='contenedor-componente'>
      <div className='contenedor-titulo'>
        <h2>Horarios</h2>
        <div className='btn-agregar' onClick={handleCreate}>
          <BsFillPlusCircleFill
            color='green'
            className="icon-add"
          />
          <h3>Agregar</h3>
        </div>
      </div>
      {/* Tabla de Horarios */}
      <Table
        columns={horarioColumns()}
        data={horarios}
        nombre={'horarios'}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onEditName={'horcod'}
        clickableRows={true}
      />         
    </div>

    <ToastContainer />
    
    {/* <Modal toggle={handleEdit}>
    </Modal>

    <Modal active={activeFormDelete} toggle={handleDelete}>
      <FormDeleteHorario toggle={handleDelete} horarioId={selectedIdHor} loadHorarios={loadHorarios} /> 
    </Modal>*/}
    </>
  )
}

export default Horarios