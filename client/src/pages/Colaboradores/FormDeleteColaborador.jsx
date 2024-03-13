import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getColaborador, deleteColaborador } from '../../api/Colaborador.api';
import { toast } from 'react-toastify';

function FormDeleteColaborador({ toggle, colaboradorId, loadColaboradores }) {

    /*Datos del colaborador seleccionado*/ 
    const [colaborador, setColaborador] = useState([]);

    /*Estado de los registros de mi formulario*/
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await deleteColaborador(colaborador.colcod);
            toggle();
            loadColaboradores();
            toast.success("Colaborador eliminado");
        } catch (error) {
            toast.error(`Error al eliminar el colaborador: ${error.message}`);
        }
    });

    useEffect(() => {
        async function loadColaborador() {
            try {
                const res = await getColaborador(colaboradorId);
                setColaborador(res.data);    
            } catch (error) {
                toast.error(`Error al cargar los colaboradores: ${error.message}`);
            }
        }
        loadColaborador();
    }, [colaboradorId]
    );

    return (
        <>
        <h3>¿Está seguro que quiere eliminar el operador 
        <br />
            "{colaborador?.colnom+" "+colaborador?.colape}"?</h3>
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