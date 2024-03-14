import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Colaboradores from './pages/Colaboradores/Colaboradores';
import Contratos from './pages/Contratos/Contratos';
import Horarios from './pages/Horarios/Horarios'
import HorarioDetalle from './pages/Horarios/HorarioDetalle'
import FormCreateHorario from './pages/Horarios/FormCreateHorario';
import Login from './components/Login';
import SideBarMenu from './components/SideBarMenu';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route path='/*' element={ isLoggedIn ? (
            <div className='app'>              
              <SideBarMenu>
                <Header />
                <Routes>
                  <Route path='/' element={<Colaboradores />} />
                  <Route path='/colaboradores' element={<Colaboradores />} />
                  <Route path='/contratos' element={<Contratos />} />
                  <Route path='/horarios' element={<Horarios />} />
                  <Route path='/horarios/:id' element={<HorarioDetalle />} />
                  <Route path='/horarios/create' element={<FormCreateHorario />} />
                </Routes>
                <ToastContainer />
              </SideBarMenu>
            </div>
            ) : (
              <Navigate to='/login' />
            )
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App