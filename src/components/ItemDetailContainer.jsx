import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import Loader from './Loader';
import { getProductById } from '../utils/consultasApiBackend';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(id);
      setProduct(product);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="container">
      {
        loading ?
        <Loader />:
        <ItemDetail product={product}/>
      }  
    </div>
  )
}

export default ItemDetailContainer