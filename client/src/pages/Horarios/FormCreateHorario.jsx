import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createHorario, getAllHorarios } from '../../api/Horario.api';
import { getAllColaboradores} from '../../api/Colaborador.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function FormCreateContrato() {

    /*Datos de regiones*/ 
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
        navigate('/horarios');
    };
    
    // Función llamada al enviar el formulario
    const onSubmit = handleSubmit(async data => {
        try {
            const res = await createHorario(data);
            navigate('/horarios');
            toast.success('Horario creado con éxito');
        } catch (error) {
            toast.error(`Error al crear el horario: ${error.message}`);
        }
    });

    const loadHorarios = async () => {
        try {
            const res = await getAllHorarios();
            setHorarios(res);
        } catch (error) {
            toast.error(`Error al cargar los contratos: ${error.message}`);
        }
    };
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
        loadHorarios();
        loadColaboradores();
      }, []
    );

    // Renderizar
    return (
        <>
        <h2>Registrar nuevo Horario</h2>
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
            <button className='btn-cancelar' type='button' onClick={toggle}>Cancelar</button>
            <button className='btn-registrar' type='submit'>Registrar</button>
          </div>
        </form>
        </>
      )
    }

export { FormCreateColaborador };