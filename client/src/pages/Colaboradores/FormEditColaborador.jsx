import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getColaborador, updateColaborador } from '../../api/Colaborador.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function FormEditColaborador() {

  /*Datos del area seleccionada*/ 
  const params = useParams();
  const [colaborador, setColaborador] = useState([]);

  /*Estado de los registros de mi formulario*/
  const {
    register,
    handleSubmit,   
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const validateMaxSize = (value) => {
    return value.length <= 40;
  };

  const handleCancelar = () => {
    navigate('/colaboradores/'+colaborador.colcod);
    };


  const onSubmit = handleSubmit(async data => {
    try {
      const res = await updateColaborador(colaborador.colcod, data);
      toast.success(`Colaborador editado con éxito`);
    } catch (error) {
      toast.error(`Error al editar el colaborador`);
    }
  });

  useEffect(() => {
    async function loadColaborador() {
      try {
        const res = await getColaborador(params.id);
        setColaborador(res.data);
        setValue('colnom', res.data.colnom);
        setValue('colape', res.data.colape);
        setValue('colfecnac', res.data.colfecnac);
        setValue('colpos', res.data.colpos);

      } catch (error) {
        toast.error(`Error al cargar los colaboradores: ${error.message}`);
      }
    }
    loadColaborador();
    }, [params.id]
  );

  return (
    <>
    <h2>Editar Colaborador "{colaborador?.colnom}" </h2>
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
      {/* Botones de cancelar/guardar */}
      <div className='contenedor-btn'>
        <button className='btn-cancelar' type='button' onClick={ toggle }>Cancelar</button>
        <button className='btn-guardar' type='submit'>Guardar</button>
      </div>
    </form>
    </>
  );
}

export { FormEditArea };
