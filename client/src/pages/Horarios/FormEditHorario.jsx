import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getHorario, updateHorario } from '../../api/Horario.api';
import { getAllColaboradores} from '../../api/Colaborador.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function FormEditHorario() {

  /*Datos del area seleccionada*/ 
  const params = useParams();
  const [horarios, setHorarios] = useState([]);
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
    navigate('/horarios/'+horarios.horcod);
    };


  const onSubmit = handleSubmit(async data => {
    try {
      const res = await updateHorario(horarios.horcod, data);
      toast.success(`Horario editado con éxito`);
    } catch (error) {
      toast.error(`Error al editar el Horario`);
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
    async function loadHorario() {
      try {
        const res = await getHorario(params.id);
        setHorarios(res.data);
        setValue('hordia', res.data.contrfecini);
        setValue('horini', res.data.contrfecfin);
        setValue('horfin', res.data.contreps);
        setValue('horcolcod', res.data.contrseg);

      } catch (error) {
        toast.error(`Error al cargar los horarios: ${error.message}`);
      }
    }
    loadHorario();
    loadColaboradores();
    }, [params.id]
  );

  return (
    <>
    <h2>Editar Horario "{horarios?.horcod}" </h2>
    <form onSubmit={onSubmit}>
    <label>
            Dia
            <input
              className='input-text'
              type="text"
              placeholder='Dia'
              {...register('hordia', { required: true,
                validate: (value) => validateMaxSize(value),
              })}
            />
            {errors.hordia?.type === 'required' && <p className='text-error'>*El campo Dia es requerido</p>}
            {errors.hordia?.type === 'validate' && <p className='text-error'>*El campo Dia no debe superar los 40 caracteres</p>}    
          </label>
        <label>
              Hora de Inicio
              <input
                  className='input-text'
                  type="time"
                  {...register('horini', { required: true })}
              />
              {errors.horini?.type === 'required' && <p className='text-error'>*El campo Hora de Inicio es requerido</p>}
            </label>
            <label>
              Hora de Fin
              <input
                  className='input-text'
                  type="time"
                  {...register('horfin', { required: true })}
              />
              {errors.horfin?.type === 'required' && <p className='text-error'>*El campo Hora de Fin es requerido</p>}
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
      <div className='contenedor-btn'>
        <button className='btn-cancelar' type='button' onClick={ toggle }>Cancelar</button>
        <button className='btn-guardar' type='submit'>Guardar</button>
      </div>
    </form>
    </>
  );
}

export { FormEditContrato };
