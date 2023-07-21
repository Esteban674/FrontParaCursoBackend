import React from 'react'
import { useContext, useState } from 'react'
import { CartContext } from './context/CartContext'
import { useForm } from "react-hook-form";
import { doc, addDoc, collection, getFirestore, getDoc, updateDoc} from 'firebase/firestore';
import NumeroOrden from './NumeroOrden';


const Checkout = () => {
  const {cart, clear, precioTotal} = useContext(CartContext);
  
  const [orderId, setOrderId] = useState("");

  const {register, handleSubmit, formState: { errors }} = useForm({mode: "onBlur" });

  const onSubmit = (data) => {
    if(data){
    const {name , lastName , email , phone} = data;
    const fecha = new Date();
    const order = {
      buyer: {name: name, lastName: lastName, phone: phone, email: email},
      items: cart.map(item => ({id: item._id, title: item.title, price: item.price})),
      total: precioTotal(),
      orderDate: `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}"  "${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    }

    const db = getFirestore();
    const orderCollection = collection(db, "orders");
    addDoc(orderCollection, order).then(({id}) => {
      setOrderId(id);
    });

    cart.forEach(product => {
      let registro = doc(db, 'products', product._id)
      getDoc(registro).then((reg) => {
        if(reg.exists()){
          updateDoc(registro, {stock: (reg.data().stock - product.quantity) })
        }
      })
    })
    clear();
    }
  };

  return (
    <div className="container checkout animate__animated animate__fadeIn">
      { !orderId? 
      <div className="row my-5">
        <div className="col-md-6 my-2 pe-5 ps-5 inputs">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" id="name" placeholder="Ingrese su nombre"
              {...register("name", {required: true, minLength: 3, maxLength: 20, pattern: /^[A-Za-z]+$/i })}/>
              {errors?.name?.type === "required" && <p className="text-danger">El nombre es requerido</p> }
              {errors?.name?.type === "minLength" && ( <p className="text-danger">El nombre debe tener más de 2 caracteres</p> )}
              {errors?.name?.type === "maxLength" && ( <p className="text-danger">El nombre no debe exceder los 20 caracteres</p> )}
              {errors?.name?.type === "pattern" && ( <p className="text-danger">Solo caracteres alfabéticos</p> )}
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input type="text" className="form-control" id="lastName" placeholder="Ingrese su apellido"
              {...register("lastName", {required: true, minLength: 3, maxLength: 20, pattern: /^[A-Za-z]+$/i })}/>
              {errors?.lastName?.type === "required" && <p className="text-danger">El apellido es requerido</p> }
              {errors?.lastName?.type === "minLength" && ( <p className="text-danger">El apellido debe tener más de 2 caracteres</p> )}
              {errors?.lastName?.type === "maxLength" && ( <p className="text-danger">El apellido no debe exceder los 20 caracteres</p> )}
              {errors?.lastName?.type === "pattern" && ( <p className="text-danger">Solo caracteres alfabéticos</p> )}
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input type="text" className="form-control" id="phone" placeholder="Ingrese su número de teléfono"
              {...register("phone", { required: true, maxLength: 18,})} />
              {errors?.phone?.type === "required" && <p className="text-danger">El teléfono es requerido</p>}
              {errors?.phone?.type === "maxLength" && ( <p className="text-danger">El teléfono no debe exceder los 18 caracteres</p> )}
            </div>
            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input type="email" className="form-control" id="email" placeholder="Ingrese su e-mail"
              {...register("email", {required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}/>
              {errors?.email?.type === "required" && <p className="text-danger">El e-mail es requerido</p>}
              {errors?.email?.type === "pattern" && (<p className="text-danger">Formato de e-mail no valido</p> )}
            </div>
            <button type="submit" className="btn btn-primary">Generar Orden</button>
          </form>
        </div>
        <div className="col-md-6">
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
      </div>
      : <NumeroOrden orderId= {orderId} />
      }
    </div>
  )
}

export default Checkout