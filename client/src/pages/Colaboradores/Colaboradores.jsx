import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { getAllColaboradores } from '../../api/Colaborador.api';
import colaboradorColumns from '../../Utils/ComponentesUtils/colaboradorColumns';
import  Modal  from '../../components/Modal';
import { Table } from '../../components/Tabla/TableStyle';
//import { FormEditResponsable } from './FormEditResponsable';
import { FormDeleteColaborador } from './FormDeleteColaborador';
import '../../styles/ContenedorComp.css';

//import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function Colaboradores() {

  const navigate = useNavigate();

  /*Datos de proyectos para la tabla*/    
  const [colaboradores, setColaboradores] = useState([]);   

  /*Estado del formulario para create, edit y delete*/
  const [activeFormDelete, setActiveFormDelete] = useState(false);
  
  /*Estado del idProyectoSeleccionado */
  const [selectedIdCol, setSelectedIdCol] = useState();
  
  /*Funciones */
  const handleCreate = () => {
    navigate('/colaboradores/create');
  }
  const handleEdit = (idColaborador) => {
    navigate(`/colaboradores/${idColaborador}/edit`);
  };
  const handleDelete = (idColaborador) => {
    setSelectedIdCol(idColaborador);
    setActiveFormDelete(!activeFormDelete);
  };
  
  const loadColaboradores = async () => {
    try {
      const res = await getAllColaboradores();
      setColaboradores(res);
      console.log(res)
    } catch (error) {
      toast.error(`Error al cargar los operadores: ${error.message}`);
    }
  };

  useEffect(() => {
    loadColaboradores();
  }, []);


  return (
    <>   
    <div className='contenedor-componente'>
      <div className='contenedor-titulo'>
        <h2>Colaboradores</h2>
        <div className='btn-agregar' onClick={handleCreate}>
          <BsFillPlusCircleFill
            color='green'
            className="icon-add"
          />
          <h3>Agregar</h3>
        </div>
      </div>
      {/* Tabla de proyectos */}
      <Table
        columns={colaboradorColumns()}
        data={colaboradores}
        nombre={'colaboradores'}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onEditName={'colcod'}
        clickableRows={true}
      />         
    </div>

    <ToastContainer />
    
    <Modal toggle={handleEdit}>
    </Modal>

    <Modal active={activeFormDelete} toggle={handleDelete}>
      <FormDeleteColaborador toggle={handleDelete} colaboradorId={selectedIdCol} loadColaboradores={loadColaboradores} /> 
    </Modal>
    </>
  )
}

export default Colaboradores