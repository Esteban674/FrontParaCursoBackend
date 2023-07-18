import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div className="container error404 animate__animated animate__fadeIn">
      <div className="d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Página no encontrada.</p>
                <p className="lead">
                    La página que esta buscando no existe.
                  </p>
                <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
        </div>
    </div>
  )
}

export default Error404