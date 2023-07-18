import React from 'react'

const Loader = () => {
  return (
    <div className="row justify-content-center animate__animated animate__fadeIn">
      <div className="col-4 m-5">
          <div className="d-flex align-items-center">
          <strong>Loading...</strong>
          <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
          </div>
      </div>
    </div>
  )
}

export default Loader