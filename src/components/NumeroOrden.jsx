import React from 'react'
import { Link } from 'react-router-dom'

const NumeroOrden = ({ orderId }) => {
  return (
    <div className="row my-4 justify-content-center animate__animated animate__fadeIn">
          <div className="col-md-12 align-middle text-center m-3">
            <h2>Gracias por tu compra!</h2>
            {orderId && <div className="alert alert-success" role="alert">Orden generada: <b>{orderId}</b></div>}
          </div>
          <Link to="/" className="col-md-2 btn btn-primary align-self-center text-center m-3 mb-2">Go Home</Link>
      </div>
  )
}

export default NumeroOrden