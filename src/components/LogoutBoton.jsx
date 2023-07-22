import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/UserContext';


const LogoutBoton = () => {

  const {logout, user} = useContext(UserContext);
  const navigate = useNavigate();

  const salir = () => {
    logout();
    navigate('/');
  }

  if(!user) {
    return null;
  }else{
    return (
      <>
      <button onClick={salir} className="btn btn-danger position-relative">Salir</button>
      </>
  )
  }
}

export default LogoutBoton