import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Form = (props) => {
  const todoListLength = useSelector((state) => state.todoList.length); 
  const [summary, setSummary] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [dueDate, setDueDate] = useState(""); 
  const [priority, setPriority] = useState(""); 
  useEffect(() => {
    setSummary(props?.selectedTodo?.title || "");
    setDescription(props?.selectedTodo?.description || "");
    setDueDate(props?.selectedTodo?.dueDate || "");
    setPriority(props?.selectedTodo?.priority || "1");
  }, [props]);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    switch (event.target.id) {
      case "summary": {
        setSummary(event.target.value);
        break;
      }
      case "description": {
        setDescription(event.target.value);
        break;
      }
      case "dueDate": {
        setDueDate(event.target.value);
        break;
      }
      case "priority": {
        setPriority(event.target.value);
        break;
      }
      default:
        return;
    }
  };

 
  const saveTodo = (event) => {
    event.preventDefault();
    let today = new Date();
    let todo = {
      id: props?.selectedTodo?.id || todoListLength + 1,
      title: summary,
      description: description,
      createdAt: props?.selectedTodo?.createdAt || `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`, 
      dueDate: dueDate,
      priority: priority,
      currentState: props?.selectedTodo?.currentState || false, 
    };
    props.selectedTodo
      ? dispatch({
          type: "UPDATE_TODO",
          payload: todo,
        })
      : dispatch({
          type: "ADD_TODO",
          payload: todo,
        });    
    props.handleModal(); 
  };

  return (
    <div className="container">
      <form onSubmit={(event) => saveTodo(event)}>
        <label htmlFor="summary">Summary</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="summary"
            aria-describedby="summary"
            placeholder="summary"
            onChange={handleChange}
            value={summary}
            required
            readOnly={props.isReadOnly}
            maxLength="140"
            minLength="10"
          />
        </div>
        <label htmlFor="Description">Description</label>
        <textarea
          className="form-control"
          aria-label="With textarea"
          placeholder="Description"
          id="description"
          onChange={handleChange}
          value={description}
          required
          readOnly={props.isReadOnly}
          maxLength="500"
          minLength="10"
        ></textarea>
        <div className="row">
          <div className='col-4'>
                <div className="form-label">
                          <label >Due Date</label>
                          <div className="input-group mb-3">
                            <input
                              type="date"
                              className="form-control"
                              id="dueDate"
                              aria-describedby="Date"
                              placeholder="Date"
                              onChange={handleChange}
                              value={dueDate}
                              readOnly={props.isReadOnly}
                            />
                          </div>
                        </div>

          </div>
                  
        <div className="col-8">
              <div className="form-label">
                  <label >Priority</label>
                  <select
                    className="form-select"
                    id="priority"
                    onChange={handleChange}
                    value={priority}
                    disabled={props.isReadOnly}
                  >
                    <option value="1">None</option>
                    <option value="2">Low</option>
                    <option value="3">Medium</option>
                    <option value="4">High</option>
                  </select>
                </div>
        </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            data-dismiss="modal"
            className="btn btn-secondary"
            onClick={() => props.handleModal()}
          >
            Cancel
          </button>
          {!props.isReadOnly ? (
            <button type="submit" className="btn btn-success">
              Save
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Form;
