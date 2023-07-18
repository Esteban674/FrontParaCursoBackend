import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';
import { NavLink } from 'react-router-dom'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8080/api/session/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      

      if (response.ok) {
        console.log('Login successful');
        setEmail('');
        setPassword('');
        const data = await response.json();
        const {user} = data.payload;
        login(user);
        // Guardar el usuario en sessionStorage
        sessionStorage.setItem('user', JSON.stringify(user));
        // window.location.replace('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2 className="my-4 mx-5">Login</h2>
      <form className="mx-5" onSubmit={handleSubmit}>
        <div className="form-group col-md-6">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="form-group col-md-6 my-3">
          <button type="submit" className="btn btn-primary me-2"><NavLink className="nav-link" to="/">Login</NavLink></button>
          <a href="http://localhost:8080/mail" className="btn btn-danger me-2">Restablecer contraseña</a>
          <a href="http://localhost:8080/session/github" className="btn btn-secondary"><i className="bi bi-github me-1"></i>Login with Github</a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
