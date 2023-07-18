import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from './ItemList'
import Loader from './Loader'
import { getProducts } from '../utils/consultasApiBackend'

const ItemListContainer = () => {

  const [listProducts, setListProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {category} = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts(category);
      setListProducts(products);
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="container">
      {
        loading ?
        <Loader />:
        <ItemList listProducts={listProducts}/>
      }  
    </div>
  )
}

export default ItemListContainer