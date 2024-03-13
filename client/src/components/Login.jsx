import React, { useState, useEffect } from 'react'

import { Image, Button, Form } from 'react-bootstrap';

import { GrMail } from 'react-icons/gr'
import { BiSolidShow, BiSolidHide } from 'react-icons/bi'

import { useNavigate } from 'react-router-dom';
import getToken from '../api/Login.api';
import '../styles/Login.css'
//import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/General.css'

const Login = ({ onLogin }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [emailTouched, setEmailTouched] = useState(false);
    const [passTouched, setPassTouched] = useState(false);

    const [emailIsError, setEmailIsError] = useState(false);
    const [passwordIsError, setPasswordIsError] = useState(false);

    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();

    const emailHandleBlur = () => {
        setEmailTouched(true);
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            setEmailIsError(true);
        } else {
            setEmailIsError(false);
        }
    };

    const passwordHandleBlur = () => {
        setPassTouched(true);
        if (password.length < 4) {
            setPasswordIsError(true);
        } else {
            setPasswordIsError(false);
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        } else {
        if (email === 'admin@gmail.com' && password === 'admin') {
            console.log('Autenticación exitosa');
            onLogin();
            navigate('/');
        } else {
            console.log('Credenciales incorrectas');
        }
        }
    
        setValidated(true);
    };

    return (

        <div className='login-contenedor'>
            <div className='login-contenedor-form'>
                <div className='login-contenedor-form-title'>
                    <h3>Gestión Administrativa<br/> Drews Rent</h3>
                </div>
                
                <div className='login-contenedor-form-content'>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="formGroupEmail">
                            <Form.Label className='fw-bold label-login-form'>Correo</Form.Label>
                            <div className='d-flex border rounded align-items-center pe-2'>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Correo"
                                    className='border-0 shadow-none'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={emailHandleBlur}
                                    style={{ backgroundImage: 'none' }}
                                    autoComplete="on"
                                />
                                <span>
                                    <GrMail size={30} color={emailIsError ? 'red' : 'rgba(85, 85, 85, 1)'} />
                                </span>
                            </div>
                            {emailTouched && emailIsError && <h2 className='emailfeedback'>Formato de correo inválido</h2>}
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formGroupPassword">
                            <Form.Label className='fw-bold label-login-form'>Contraseña</Form.Label>
                            <div className='d-flex border rounded align-items-center pe-2'>
                                <Form.Control
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Contraseña"
                                    className='border-0 shadow-none'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={passwordHandleBlur}
                                    style={{ backgroundImage: 'none' }}
                                    autoComplete="on"
                                />
                                <span onClick={handleShowPassword}>
                                    {showPassword ?
                                        <BiSolidShow size={30} color={passwordIsError ? 'red' : 'rgba(85, 85, 85, 1)'} /> :
                                        <BiSolidHide size={30} color={passwordIsError ? 'red' : 'rgba(85, 85, 85, 1)'} />
                                    }
                                </span>
                            </div>
                            {passTouched && passwordIsError && <h2 className='emailfeedback'>contraseña invalido</h2>}
                        </Form.Group>

                        <Button className='w-100 px-0 my-2 border-0 shadow-none btn btn-custom' type="submit">
                            Iniciar Sesión
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default Login; 