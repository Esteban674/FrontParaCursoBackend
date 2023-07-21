import React from 'react'
import { useContext } from 'react'
import { CartContext } from './context/CartContext'
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, cartTotal, removeItem, clear, precioTotal } = useContext(CartContext);
console.log(cart.products);
  if (cartTotal() === 0) {
    return (
      <div className="container carritoVacio">
        <div className="row my-4">
          <div className="col-md-12 text-center">
            <div className="alert alert-danger" role="alert">No se encontraron productos en el carrito</div>
            <Link to={"/"} className="btn btn-primary">Volver al Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container cartContainer animate__animated animate__fadeIn">
      <div className="row mt-5 justify-content-center">
        <div className="col-md-10">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" colSpan={5} className="text-end">
                  <Link onClick={clear} className="btn btn-warning">Vaciar Carrito</Link>
                </th>
              </tr>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">Producto</th>
                <th scope="col" className="text-center">Cantidad</th>
                <th scope="col" className="text-center">Precio</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {cart.products.map(item => (
                <tr key={item._id}>
                  <td className="align-middle text-center"> 
                  <div className="d-flex align-items-center justify-content-center">
                      <img src={item.product.thumbnail} alt={item.product.title} className="img-fluid" style={{ maxHeight: "100px" }}/>
                  </div>
                  </td>
                  <td className="align-middle">{item.product.title}</td>
                  <td className="align-middle text-center">{item.quantity}</td>
                  <td className="align-middle text-center">$ {item.quantity * item.product.price}</td>
                  <td className="align-middle text-end"><Link onClick={() => removeItem(item.product._id)} title="Eliminar Producto">
                    <i className="bi bi-trash3 cestoIcon"></i>
                  </Link></td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td className="text-end"><b>Total a Pagar</b></td>
                <td className="text-center"><b>$ {precioTotal()}</b></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td className="text-center py-3" colSpan="2"><Link to="/checkout" className="btn btn-primary">Finalizar Compra</Link></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Cart