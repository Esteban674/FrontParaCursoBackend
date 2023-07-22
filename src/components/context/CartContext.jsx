import React, { createContext, useContext, useEffect, useState } from 'react'
import { addCart, addCartItem, deleteCartItem, getCart, purchaseCart, updateCartItem } from '../../utils/consultasApiBackend';
import { UserContext } from './UserContext';

export const CartContext = createContext();

const newCart = {
  products: [
  ]
};


const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState('');
  const { user } = useContext(UserContext);
  const [ticket, setTicket] = useState('');


  useEffect(() => {
    if (user) {
      const idCart = user.user.id_cart;
      setCartId(idCart);
      const getCartData = async () => {
        const cartData = await getCart(idCart);
        setCart(cartData);
      }
      getCartData();
    } else {
      setCartId('');
      setCart([]);
    }
  }, [user])


  const addItem = async (productId, quantity) => {
    setTicket('');
    try {
      if (cartId === '') {
        // Si el usuario no tiene un carrito, crear uno nuevo
        newCart.products.push({ product: productId, quantity: quantity });
        const cartData = await addCart(newCart);
        const cartId = cartData._id;
        setCartId(cartId);
        const newCart2 = await getCart(cartId);
        setCart(newCart2)
  
      } else {
        //obtener el cart
        const cartData = await getCart(cartId);

        // Verificar si el producto ya existe en el carrito
        const existingProduct = cartData.products.find(item => item.product._id === productId);

        if (existingProduct) {
          // Si el producto ya existe, hacer un PUT para actualizar la cantidad
          await updateCartItem(cartId, productId, existingProduct.quantity + quantity);
          //volvear a actualizar el cart
          const cartDataUpdated = await getCart(cartId);
          setCart(cartDataUpdated);

        } else {
          // Si el producto no existe, hacer un POST para agregarlo al carrito
          await addCartItem(cartId, productId, quantity);
          //volvear a actualizar el cart
          const cartDataUpdated = await getCart(cartId);
          setCart(cartDataUpdated);

        }
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  }


  const removeItem = async (productId) => {

    try {
      //obtener el cart
      const cartData = await getCart(cartId);

      // Verificar si el producto ya existe en el carrito
      const existingProduct = cartData.products.find(item => item.product._id === productId);

      if (existingProduct) {
        // Si el producto existe, hacer un Delete para borrar ese producto
        await deleteCartItem(cartId, productId);
        const cartDataUpdated = await getCart(cartId);
        setCart(cartDataUpdated);
      } else {
        const cartDataUpdated = await getCart(cartId);
        setCart(cartDataUpdated);
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  }

  const clear = () => {
    setCart([]);
  }

  const cartTotal = () => {
    if (cart && cart.products) {
      return cart.products.reduce((acc, item) => acc + item.quantity, 0);
    } else {
      return 0;
    }
  };

  const precioTotal = () => {
    if (cart && cart.products) {
      return cart.products.reduce((acc, item) => acc += item.quantity * item.product.price, 0);
    } else {
      return 0;
    }
  }

  const purchase = async () => {
    if (cart) {
      const ticket = await purchaseCart(cartId);
      setTicket(ticket);
      setCartId('');
      setCart([]);
    } else {
      return null;
    }
  }

  return (
    <CartContext.Provider value={{ cart, cartId, ticket, addItem, removeItem, clear, cartTotal, precioTotal, purchase }}>
      {children}
    </CartContext.Provider>
  )
};

export default CartContextProvider;