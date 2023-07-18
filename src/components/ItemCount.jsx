import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItemCount = ({initial, stock, onAdd}) => {

  const [count, setCount] = useState(initial);
  const [productStock, setProductStock] = useState(stock);
  const [agregado, setAgregado] = useState(false);

  const increase = () => count < productStock && setCount(count + 1);
  const decrease = () => count > initial && setCount(count - 1);

  const addToCart = (quantity) => {
    if (count <= productStock){
      setCount(initial);
      setProductStock(productStock - quantity);
      setAgregado(true);
      onAdd(quantity);
    } 
  }

  useEffect(() => {
    setProductStock(stock);
    if(productStock === 0){
      setCount(0);
    }
  },[stock, productStock]);

  return (
      <div className="row mb-2">
        <div className="col mb-2 text-center">
          <div className="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-danger mt-1" onClick={decrease}><b>-</b></button>
            <button type="button" className="btn btn-outline-primary mt-1">{ count }</button>
            <button type="button" className="btn btn-success mt-1" onClick={increase}><b>+</b></button>
          </div>
        </div>
        <div>
          {productStock ? "" : <div className="alert alert-danger" role="alert">No hay stock de este producto</div>}
        </div>
        <div className="col-12 text-center">
          {agregado ? <Link to={"/cart"} className="btn btn-warning mt-2">Terminar Compra</Link>: productStock ? <button type="button" className="btn btn-primary mt-2"onClick={() => addToCart(count)}>Agregar al carrito</button> : ""
          }
        </div>
      </div>
  )
}

export default ItemCount