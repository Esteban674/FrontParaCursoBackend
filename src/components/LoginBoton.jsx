import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './context/UserContext';


const LoginBoton = () => {

  const {isLogedIn} = useContext(UserContext);


  return (
      <Link to={"/login"} className="btn btn-warning position-relative">
        <i className="bi bi-person text-black me-2"></i>
        <span className="">
          {isLogedIn()}
        </span>
      </Link>
  )
}

export default LoginBoton