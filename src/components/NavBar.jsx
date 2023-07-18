import React from 'react'
import { NavLink } from 'react-router-dom'
import CartWidget from './CartWidget'
import LoginBoton from './LoginBoton'

const NavBar = () => {
  return (
    <div className="mb-4 nav-bar">
      <div className="row m-0">
        <div className="col-md-8">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/"><img className="logo-Nav-Bar" src="/images/shopLogo.png" alt="Logo-E-Commerce" /></NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                  <NavLink className="nav-link" to="/category/Smartphone">Smartphones</NavLink>
                  <NavLink className="nav-link" to="/category/Tablet">Tablets</NavLink>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="col-md-3 d-flex align-items-center justify-content-end">
          <LoginBoton />
        </div>
        <div className="col-md-1 d-flex align-items-center justify-content-end pe-5">
          <CartWidget />
        </div>
      </div>
    </div>

  )
}

export default NavBar

