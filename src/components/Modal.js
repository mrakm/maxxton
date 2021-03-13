import React from "react";


const Modal = (props) => {
  return (
    
      
      


      <div className="modal  fade show" style={props.isshow?{display:'block'}:{}} tabIndex={-1} role="dialog" >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">{props.title}</h3>
            <span  className="close" style={{cursor:'pointer'}} onClick={() => props.handleModal()} >
              <span >×</span>
            </span>
          </div>
          <div className="modal-body">
          {props.content}
          </div>
          
        </div>
      </div>
   </div>

  );
};

export default Modal;
