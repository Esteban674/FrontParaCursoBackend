import React from 'react'
import Item from './Item'

const ItemList = ({listProducts}) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {listProducts.map(product => <Item key={product._id} product={product}/>)}
    </div>
  )
}

export default ItemList