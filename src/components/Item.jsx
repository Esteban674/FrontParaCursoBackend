import React from 'react'
import { Link } from 'react-router-dom';

const Item = ({product}) => {

  const {thumbnail, description, price, code} = product;

  return (
    <div className="card d-flex justify-content-center m-2 animate__animated animate__fadeIn" style={{width: '18rem'}}>
      <Link to={"/item/" + product._id} className="text-center">
        <img src={thumbnail} className="card-img-top p-4 align-self-center" style={{width: '13rem'}} alt={code}/>
      </Link> 
      <div className="card-body">
        <h5 className="card-title text-center">{description}</h5>
        <p className="card-text text-center">${price}</p>
      </div>
      <Link to={"/item/" + product._id} className="text-center">
        <button className="btn btn-primary m-2">Ver Detalle</button>
      </Link> 
    </div>
  )
}

export default Item