import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getContrato, deleteContrato } from '../../api/Contrato.api';
import { toast } from 'react-toastify';

function FormDeleteContrato({ toggle, contratoId, loadContratos }) {

    /*Datos del colaborador seleccionado*/ 
    const [contrato, setContrato] = useState([]);

    /*Estado de los registros de mi formulario*/
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await deleteContrato(contrato.contrcod);
            toggle();
            loadContratos();
            toast.success("Contrato eliminado");
        } catch (error) {
            toast.error(`Error al eliminar el contrato: ${error.message}`);
        }
    });

    useEffect(() => {
        async function loadContrato() {
            try {
                const res = await getContrato(contratoId);
                setContrato(res.data);    
            } catch (error) {
                toast.error(`Error al cargar los contratos: ${error.message}`);
            }
        }
        loadContrato();
    }, [contratoId]
    );

    return (
        <>
        <h3>¿Está seguro que quiere eliminar el contrato 
        <br />
            "{contrato?.contrfecini+" "+contrato?.contrfecfin}"?</h3>
        <form onSubmit={onSubmit}>
            <div className='contenedor-btn'>
                <button className='btn-cancelar' type='button' onClick={toggle}>Cancelar</button>
                <button className='btn-eliminar' type='submit'>Eliminar</button>
            </div>
        </form>
        </>
    );
}

export { FormDeleteColaborador };