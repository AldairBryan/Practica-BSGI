import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getHorario, deleteHorario } from '../../api/Horario.api';
import { toast } from 'react-toastify';

function FormDeleteHorario({ toggle, horarioId, loadHorarios }) {

    /*Datos del colaborador seleccionado*/ 
    const [horario, setHorario] = useState([]);

    /*Estado de los registros de mi formulario*/
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await deleteHorario(horario.horcod);
            toggle();
            loadHorarios();
            toast.success("Horario eliminado");
        } catch (error) {
            toast.error(`Error al eliminar el horario: ${error.message}`);
        }
    });

    useEffect(() => {
        async function loadHorario() {
            try {
                const res = await getHorario(horarioId);
                setHorario(res.data);    
            } catch (error) {
                toast.error(`Error al cargar los horarios: ${error.message}`);
            }
        }
        loadHorario();
    }, [horarioId]
    );

    return (
        <>
        <h3>¿Está seguro que quiere eliminar el horario 
        <br />
            "{horario?.hordia}"?</h3>
        <form onSubmit={onSubmit}>
            <div className='contenedor-btn'>
                <button className='btn-cancelar' type='button' onClick={toggle}>Cancelar</button>
                <button className='btn-eliminar' type='submit'>Eliminar</button>
            </div>
        </form>
        </>
    );
}

export { FormDeleteHorario };