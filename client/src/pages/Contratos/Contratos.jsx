import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { getAllContratos } from '../../api/Contrato.api';
import contratoColumns from '../../Utils/ComponentesUtils/contratoColumns';
import  Modal  from '../../components/Modal';
import { Table } from '../../components/Tabla/TableStyle';
//import { FormEditResponsable } from './FormEditResponsable';
import { FormDeleteContrato } from './FormDeleteColaborador';
import '../../styles/ContenedorComp.css';

//import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function Colaboradores() {

  const navigate = useNavigate();

  /*Datos de proyectos para la tabla*/    
  const [contratos, setContratos] = useState([]);   

  /*Estado del formulario para create, edit y delete*/
  const [activeFormDelete, setActiveFormDelete] = useState(false);
  
  const [selectedIdCon, setSelectedIdCon] = useState();
  
  /*Funciones */
  const handleCreate = () => {
    navigate('/contratos/create');
  }
  const handleEdit = (idContrato) => {
    navigate(`/contratos/${idContrato}/edit`);
  };
  const handleDelete = (idContrato) => {
    setSelectedIdCon(idContrato);
    setActiveFormDelete(!activeFormDelete);
  };
  
  const loadContratos = async () => {
    try {
      const res = await getAllContratos();
      setContratos(res);
      console.log(res)
    } catch (error) {
      toast.error(`Error al cargar los contactos: ${error.message}`);
    }
  };

  useEffect(() => {
    loadContratos();
  }, []);


  return (
    <>   
    <div className='contenedor-componente'>
      <div className='contenedor-titulo'>
        <h2>Contratos</h2>
        <div className='btn-agregar' onClick={handleCreate}>
          <BsFillPlusCircleFill
            color='green'
            className="icon-add"
          />
          <h3>Agregar</h3>
        </div>
      </div>
      {/* Tabla de Contratos */}
      <Table
        columns={contratoColumns()}
        data={contratos}
        nombre={'contratos'}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onEditName={'contrcod'}
        clickableRows={true}
      />         
    </div>

    <ToastContainer />
    
    <Modal toggle={handleEdit}>
    </Modal>

    <Modal active={activeFormDelete} toggle={handleDelete}>
      <FormDeleteContrato toggle={handleDelete} contratoId={selectedIdCon} loadContratos={loadContratos} /> 
    </Modal>
    </>
  )
}

export default Colaboradores