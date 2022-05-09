import React from 'react'

const Modal = ({toggleModal, modalSubmit,children}) =>{

    return(
    <div className="modal-visible fixed-top" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content" style={{backgroundColor:"rgb(34,34,34)"}} >
        <div className="modal-header">
          <h5 className="modal-title">Tytuł modala</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={toggleModal} aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={modalSubmit}>Save changes</button>
            <button type="button" className="btn btn-secondary" onClick={toggleModal} data-bs-dismiss="modal">Close</button>          
        </div>
      </div>
    </div>
  </div>
    )
}

export default Modal