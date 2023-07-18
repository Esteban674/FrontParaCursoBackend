import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/NavBar';
import ItemDetailContainer from './components/ItemDetailContainer';
import Error404 from './components/Error404';
import CartContextProvider from './components/context/CartContext';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import LoginForm from './components/LoginForm';
import UserContextProvider from './components/context/UserContext';

const App = () => {
  return (
      <UserContextProvider>
      <CartContextProvider>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path={"/"} element={<ItemListContainer/>}/>
        <Route path={"/category/:category"} element={<ItemListContainer/>}/>
        <Route path={"/item/:id"} element={<ItemDetailContainer/>}/>
        <Route path={"/cart"} element={<Cart/>}/>
        <Route path={"/checkout"} element={<Checkout/>}/>
        <Route path={"/login"} element={<LoginForm/>}/>
        <Route path={"*"} element={<Error404/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      </CartContextProvider>
      </UserContextProvider>
  )
}

export default App;
