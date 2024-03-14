import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getContrato, updateContrato } from '../../api/Contrato.api';
import { getAllColaboradores} from '../../api/Colaborador.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function FormEditContrato() {

  /*Datos del area seleccionada*/ 
  const params = useParams();
  const [contratos, setContratos] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);

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
    navigate('/contratos/'+contratos.contrcod);
    };


  const onSubmit = handleSubmit(async data => {
    try {
      const res = await updateContrato(contratos.contrcod, data);
      toast.success(`Contrato editado con éxito`);
    } catch (error) {
      toast.error(`Error al editar el Contrato`);
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

  useEffect(() => {
    async function loadContrato() {
      try {
        const res = await getContrato(params.id);
        setContratos(res.data);
        setValue('contrfecini', res.data.contrfecini);
        setValue('contrfecfin', res.data.contrfecfin);
        setValue('contreps', res.data.contreps);
        setValue('contrseg', res.data.contrseg);
        setValue('contrcolcod', res.data.contrseg);

      } catch (error) {
        toast.error(`Error al cargar los contratos: ${error.message}`);
      }
    }
    loadContrato();
    loadColaboradores();
    }, [params.id]
  );

  return (
    <>
    <h2>Editar contrato "{contratos?.contrcolcod}" </h2>
    <form onSubmit={onSubmit}>
    <label>
              Fecha de Inicio
              <input
                  className='input-text'
                  type="date"
                  {...register('contrfecini', { required: true })}
              />
              {errors.contrfecini?.type === 'required' && <p className='text-error'>*El campo Fecha de Inicio es requerido</p>}
            </label>

            <label>
              Fecha de Fin
              <input
                  className='input-text'
                  type="date"
                  {...register('contrfecfin', { required: true })}
              />
              {errors.contrfecfin?.type === 'required' && <p className='text-error'>*El campo Fecha de Fin es requerido</p>}
            </label>
          <label>
            EPS
            <input
              className='input-text'
              type="text"
              placeholder='EPS'
              {...register('contreps', { required: true,
                validate: (value) => validateMaxSize(value),
              })}
            />
            {errors.contreps?.type === 'required' && <p className='text-error'>*El campo EPS es requerido</p>}
            {errors.contreps?.type === 'validate' && <p className='text-error'>*El campo EPS no debe superar los 40 caracteres</p>}    
          </label>

          <label>
            Seguro
            <input
              className='input-text'
              type="text"
              placeholder='Seguro'
              {...register('contrseg', { required: true,
                validate: (value) => validateMaxSize(value),
              })}
            />
            {errors.contrseg?.type === 'required' && <p className='text-error'>*El campo seguro es requerido</p>}
            {errors.contrseg?.type === 'validate' && <p className='text-error'>*El campo seguro no debe superar los 40 caracteres</p>}    
          </label>
          <label>
                Colaborador
                <select className='input-select'
                    name="colaboradores"
                    {...register('contrcolcod', { required: true })}
                    >
                    <option value='' >Seleccionar Colaborador</option>
                    {colaboradores && colaboradores.map(colaborador =>(
                        <option value={colaborador.colcod} key={colaborador.colcod}>{colaborador.openom+" "+colaborador.opeape}</option>
                    ))}
                </select>
                {errors.pagopeopecod?.type === 'required' && <p className='text-error'>*El campo Colaborador es requerido</p>}  
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

export { FormEditContrato };
