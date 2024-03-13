import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createContrato, getAllContratos } from '../../api/Contrato.api';
import { getAllColaboradores} from '../../api/Colaborador.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function FormCreateContrato() {

    /*Datos de regiones*/ 
    const [contratos, setContratos] = useState([]);
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
        navigate('/contratos');
    };
    
    // Función llamada al enviar el formulario
    const onSubmit = handleSubmit(async data => {
        try {
            const res = await createContrato(data);
            navigate('/contratos');
            toast.success('Contrato creado con éxito');
        } catch (error) {
            toast.error(`Error al crear el contacto: ${error.message}`);
        }
    });

    const loadContratos = async () => {
        try {
            const res = await getAllContratos();
            setContratos(res);
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
        loadContratos();
        loadColaboradores();
      }, []
    );

    // Renderizar
    return (
        <>
        <h2>Registrar nuevo Contrato</h2>
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


          <div className='contenedor-btn'>
            <button className='btn-cancelar' type='button' onClick={toggle}>Cancelar</button>
            <button className='btn-registrar' type='submit'>Registrar</button>
          </div>
        </form>
        </>
      )
    }

export { FormCreateColaborador };