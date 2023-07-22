import React from 'react'
import { useContext } from 'react'
import { CartContext } from './context/CartContext'
import NumeroOrden from './NumeroOrden';

const Checkout = () => {
  const {cart, precioTotal, purchase} = useContext(CartContext);
  
  const {ticket} = useContext(CartContext);

  const comprar =  () => {
  purchase();
  }


  return (
    <div className="container checkout animate__animated animate__fadeIn">
      { !ticket? 
      <div className="row my-5">
        <div className="col-md-9">
          <table className="table">
            <thead>
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
                  <tr key={item.product._id}>
                    <td className="align-middle text-center"><img src={item.product.thumbnail} alt={item.product.title} className="img-fluid" style={{ maxHeight: "100px" }}/></td>
                    <td className="align-middle">{item.product.title}</td>
                    <td className="align-middle text-center">{item.quantity}</td>
                    <td className="align-middle text-center">$ {item.quantity * item.product.price}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td className="text-end"><b>Total a Pagar</b></td>
                  <td className="text-center"><b>$ {precioTotal()}</b></td>
                </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-3 my-2 pe-5 ps-5 inputs align-content-end">
            <button className="btn btn-primary" onClick={comprar}>Generar Orden</button>
        </div>
      </div>
      : <NumeroOrden ticket= {ticket} />
      }
    </div>
  )
}

export default Checkout