import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from './context/CartContext'

const CartWidget = () => {
  const {cartTotal} = useContext(CartContext);

  return (
      <Link to={"/cart"} className="btn btn-info position-relative">
        <img src="/images/cart3.svg" alt="icono carrito" width="24px"/>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartTotal()}
        </span>
      </Link>
  )
}

export default CartWidget