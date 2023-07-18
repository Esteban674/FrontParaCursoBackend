import React, {createContext, useState} from 'react'
import { addCart, addCartItem, getCart, updateCartItem } from '../../utils/consultasApiBackend';

export const CartContext = createContext();

const newCart = {
  products: [
  ]
};

const CartContextProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState('');

  // const isInCart = (id) => {
  //   return cart.some(product => product._id === id);
  // }

  // const addItem = (product, quantity) => {
  //   if (isInCart(product._id)) {
  //     let position = cart.findIndex(prod => prod.id === product._id);
  //     cart[position].quantity += quantity;
  //     setCart([...cart]);
  //     addCart({product: product._id, quantity: quantity});

  //   }else{
  //     setCart([...cart, {...product, quantity:quantity}]);
  //     newCart.products.push({product: product._id, quantity:quantity});
  //     // addCart(newCart);
  //     console.log(newCart);
  //   }
  // }
  const addItem = async (productId, quantity) => {
    try {
      if(cartId === '') {
        // Si el usuario no tiene un carrito, crear uno nuevo
        newCart.products.push({product: productId, quantity:quantity});
        const cartData = await addCart(newCart);
        const cartId = cartData._id;
        setCartId(cartId);
      }else{
        //obtener el cart
      const cartData = await getCart(cartId);  

      // Verificar si el producto ya existe en el carrito
      const existingProduct = cartData.products.find(item => item.product === productId);
  
      if (existingProduct) {
        // Si el producto ya existe, hacer un PUT para actualizar la cantidad
        await updateCartItem(cartId, productId, existingProduct.quantity + quantity);
      } else {
        // Si el producto no existe, hacer un POST para agregarlo al carrito
        await addCartItem(cartId, productId, quantity);
      }
    }
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  }
  

  const removeItem = (id) => {
    const products = cart.filter(prod => prod._id !== id);
    setCart([...products]);
  }

  const clear = () => {
    setCart([]);
  }

  const cartTotal = () => {
    return cart.reduce((acc, item) => acc += item.quantity, 0);
  }

  const precioTotal = () => {
    return cart.reduce((acc, item) => acc += item.quantity * item.price, 0);
  }

  return(
    <CartContext.Provider value={{cart, cartId, addItem, removeItem, clear, cartTotal, precioTotal}}>
      {children}
    </CartContext.Provider>
  )
};

export default CartContextProvider;