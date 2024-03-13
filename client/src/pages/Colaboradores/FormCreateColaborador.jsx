import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createColaborador, getAllColaboradores } from '../../api/Colaborador.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function FormCreateColaborador() {

    /*Datos de regiones*/ 
    const [colaboradores, setColaboradores] = useState([]);

    /*Estado de los registros de mi formulario*/
    const {
        register,
        handleSubmit,  
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const validateMaxSize = (value) => {
        return value.length <= 40;
    };

    const handleCancelar = () => {
        navigate('/colaboradores');
    };
    
    // Función llamada al enviar el formulario
    const onSubmit = handleSubmit(async data => {
        try {
            const res = await createColaborador(data);
            navigate('/colaboradores');
            toast.success('Colaborador creado con éxito');
        } catch (error) {
            toast.error(`Error al crear el colaborador: ${error.message}`);
        }
    });

    const loadColaboradores = async () => {
        try {
            const res = await getAllColaboradores();
            setColaboradores(res);
        } catch (error) {
            toast.error(`Error al cargar los colaboradores: ${error.message}`);
        }
    };

    // Cargar las regiones
    useEffect(() => {
        loadColaboradores();
      }, []
    );

    // Renderizar
    return (
        <>
        <h2>Registrar nuevo Colaborador</h2>
        <form onSubmit={onSubmit}>
          <label>
            Nombre
            <input
              className='input-text'
              type="text"
              placeholder='Nombre del Colaborador'
              {...register('colnom', { required: true,
                validate: (value) => validateMaxSize(value),
              })}
            />
            {errors.colnom?.type === 'required' && <p className='text-error'>*El campo nombre es requerido</p>}
            {errors.colnom?.type === 'validate' && <p className='text-error'>*El campo nombre no debe superar los 40 caracteres</p>}    
          </label>

          <label>
            Apellidos
            <input
              className='input-text'
              type="text"
              placeholder='Apellidos del Colaborador'
              {...register('colape', { required: true,
                validate: (value) => validateMaxSize(value),
              })}
            />
            {errors.colape?.type === 'required' && <p className='text-error'>*El campo apellido es requerido</p>}
            {errors.colape?.type === 'validate' && <p className='text-error'>*El campo apellido no debe superar los 40 caracteres</p>}    
          </label>
          <label>
              Fecha de Nacimiento
              <input
                  className='input-text'
                  type="date"
                  {...register('colfecnac', { required: true })}
              />
              {errors.colfecnac?.type === 'required' && <p className='text-error'>*El campo Fecha de Naciemiento es requerido</p>}
            </label>
          <label>
            Posicion
            <input
              className='input-text'
              type="text"
              placeholder='Posicion del Colaborador'
              {...register('colpos', { required: true,
                validate: (value) => validateMaxSize(value),
              })}
            />
            {errors.colpos?.type === 'required' && <p className='text-error'>*El campo posicion es requerido</p>}
            {errors.colpos?.type === 'validate' && <p className='text-error'>*El campo posicion no debe superar los 40 caracteres</p>}    
          </label>

          <div className='contenedor-btn'>
            <button className='btn-cancelar' type='button' onClick={toggle}>Cancelar</button>
            <button className='btn-registrar' type='submit'>Registrar</button>
          </div>
        </form>
        </>
      )
    }

export { FormCreateColaborador };