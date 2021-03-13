import React from "react";
import { useDispatch } from "react-redux";

const DeleteConfirmation = (props) => {
  const dispatch = useDispatch();
  const deleteTodo = () => {
    dispatch({
      type: "DELETE_TODO",
      payload: props.todo,
    });
    props.handleModal(); 
  };

  return (
    <div>
      <div className="l">
        <span className="form-label">Summary:fdfdfdf</span>
        <span className="form-control">{props?.todo?.title}</span>
      </div>
      <div >
        <span className="form-label">Description:</span>
        <span className="form-control">{props?.todo?.description}</span>
      </div>
      <div >
        <span className="form-label">Due Date:</span>
        <span className="form-control">{props?.todo?.dueDate}</span>
      </div>
      <div >
        <span className="form-label">Created On :</span>
        <span className="form-control">{props?.todo?.createdAt}</span>
      </div>
      <div >
        <span className="form-label">Priority:</span>
        <span className="form-control">{props?.todo?.priority}</span>
      </div>
      <div >
        <span className="form-label">State:</span>
        <span className="form-control">{props?.todo?.priority === true ? "Pending" : "Completed"}</span>
      </div>
      <hr />
      <div className="modal-footer">
        <span>Do you want to delete this task?</span>
        <button className="btn btn-danger" onClick={() => props.handleModal()}>
          No
        </button>
        <button className="btn btn-success" onClick={() => deleteTodo()}>
          Yes{" "}
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
