
const APIURL = 'https://backend-proyectofinal-production.up.railway.app';
// const APIURL = 'http://localhost:8080';

//--------Products--------//
export const getProducts = async (category) => { 
  if(category){
    const url = `${APIURL}/api/products?category=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    const products = data.payload;
    return products;
  } else {
  const url = `${APIURL}/api/products`;
  const response = await fetch(url);

  const data = await response.json();
  const products = data.payload;
  return products;
  }
};

export const getProductById = async (id) => {
  const url = `${APIURL}/api/products/${id}`;
  const response = await fetch(url);
  const product = await response.json();
  return product;
};


//---------Carts---------//

//Obtener un carrito
export const getCart = async (cartId) => {
  const url = `/api/carts/${cartId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Crear un carrito
export const addCart = async (cart) => {
  const url = `${APIURL}/api/carts`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(cart),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}

//Actualizar cantidad en el carrito
export const updateCartItem = async (cartId, productId, quantity) => {
  try {
    await fetch(`${APIURL}/api/carts/${cartId}/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    });

    console.log('Producto actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
}

//Agregar un producto al carrito
export const addCartItem = async (cartId, productId, quantity) => {
  try {
    await fetch(`${APIURL}/api/carts/${cartId}/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    });

    console.log('Producto agregado correctamente');
  } catch (error) {
    console.error('Error al agregar el producto:', error);
  }
}

//Eliminar un producto del carrito
export const deleteCartItem = async (cartId, productId) => {
  try {
    await fetch(`${APIURL}/api/carts/${cartId}/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Producto eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
}

//Eliminar el carrito
export const deleteCart = async (cartId) => {
  try {
    await fetch(`${APIURL}/api/carts/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Carrito eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el carrito:', error);
  }
}

//Comprar carrito
export const purchaseCart = async (cartId) => { 
  try {
    const response = await fetch(`${APIURL}/api/carts/${cartId}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log('Carrito comprado correctamente');
    return data;
  } catch (error) {
    console.error('Error al comprar el carrito:', error);
  }
}



