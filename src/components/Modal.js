import React from 'react'

const Modal = ({toggleModal, modalSubmit,children, title}) =>{

    return(
    <div className="modal-visible fixed-top" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content" style={{backgroundColor:"rgb(34,34,34)"}} >
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={toggleModal} aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  </div>
    )
}

export default Modal