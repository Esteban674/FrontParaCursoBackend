import React, { useContext, useEffect, useState } from 'react'
import ItemCount from './ItemCount'
import { CartContext } from './context/CartContext';
import ItemSpecs from './ItemSpecs';

const ItemDetail = ({product}) => {
  const {addItem} = useContext(CartContext);
  const [productStock, setProductStock] = useState(0);

  const onAdd = (quantity) => {
    setProductStock(productStock - quantity);
    addItem(product._id, quantity);
  }

  useEffect(() => {
    setProductStock(product.stock)
  }, [product])
  
  return (
    <div className="text-center animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-5 align-self-center p-3 animate__animated animate__fadeIn">
        <img src={product.thumbnail} alt={product.title} className="img-fluid img-principal"/>
        </div>
        <div className="col-md-1 align-self-center">
      
        </div>
        <div className="col-md-3 offset-md-1 align-self-center">
          <h2>{product.title}</h2>
          <h5>${product.price}</h5>
          <ItemCount initial={1} stock={product.stock} onAdd={onAdd}/>
        </div>
      </div>
      <div className="row">
        <ItemSpecs product={product}/>
      </div>
    </div>
  )
}
export default ItemDetail