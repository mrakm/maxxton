import React, { useState } from "react";
import Modal from "./Modal";
import Form from "./Form";
import DeleteConfirmation from "./DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import editIcon from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/delete.svg';
import Taskbtn from './Taskbtn';


const Tasks = (props) => {

  let todos = useSelector((state) => state.todoList); 
  const groupBy = useSelector((state) => state.groupBy); 
  const searchedValue = useSelector((state) => state.searchedValue); 
  let filteredList = useSelector((state) => state.filteredData); 

  const dispatch = useDispatch();


  const [sortBySummary, setSortBySummary] = useState(); 
  const [sortByPriotiy, setSortByPriority] = useState(); 
  const [sortByCreatedOn, setSortByCreatedOn] = useState(); 
  const [sortByDueDate, setSortByDueDate] = useState();
  const [isOpenFormModal, setIsOpenFormModal] = useState(false); 
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false); 
  const [selectedTodo, setSelectedTodo] = useState(false); 
  const [readOnly, setReadOnly] = useState(false); 

 
  if (props.selectedTab === "Pending") {
    searchedValue
      ? (filteredList = filteredList.filter(
          (todo) => todo.currentState === false
        ))
      : (todos = todos.filter((todo) => todo.currentState === false));
  } else if (props.selectedTab === "Completed") {
    searchedValue
      ? (filteredList = filteredList.filter(
          (todo) => todo.currentState === true
        ))
      : (todos = todos.filter((todo) => todo.currentState === true));
  }

 
  const renderPriority = (priotiy) => {
    switch (priotiy) {
      case "1": {
        return "None";
      }
      case "2": {
        return "Low";
      }
      case "3": {
        return "Medium";
      }
      case "4": {
        return "High";
      }
      default:
        return;
    }
  };

 
  const sortList = (type) => {
    switch (type) {
      case "SORT_BY_SUMMARY": {
        setSortBySummary(!sortBySummary);
        dispatch({
          type: type,
          payload: { isAsscending: sortBySummary },
        });
        break;
      }
      case "SORT_BY_PRIORITY": {
        setSortByPriority(!sortByPriotiy);
        dispatch({
          type: type,
          payload: { isAsscending: sortByPriotiy },
        });
        break;
      }
      case "SORT_BY_CREATEDAT": {
        setSortByCreatedOn(!sortByCreatedOn);
        dispatch({
          type: type,
          payload: { isAsscending: sortByCreatedOn },
        });
        break;
      }

      case "SORT_BY_DUE_DATE": {
        setSortByDueDate(!sortByDueDate);
        dispatch({
          type: type,
          payload: { isAsscending: sortByDueDate },
        });
        break;
      }
      default:
        return;
    }
  };

  
  const handleFormModal = () => {
    setIsOpenFormModal(!isOpenFormModal);
  };

  const handleDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  
  const getSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const handleReadOnly = (isReadOnly) => {
    setReadOnly(isReadOnly);
  };

 

  const changeTodoState = (todo, event) => {
    event.stopPropagation();
    dispatch({
      type: "CHANGE_TODO_STATE",
      payload: todo.id,
    });
  };
  const mystyle = {
    textDecoration: "lineThrough"
  };
  
  const createGroupBy = () => {
    let todoList = searchedValue ? filteredList : todos;
    let groupByTodo = todoList.reduce((total, current) => {
      total[current[groupBy]] = total[current[groupBy]] || [];
      total[current[groupBy]].push(current);
      return total;
    }, Object.create(null));

  
    if (groupBy === "priority") {
      Object.keys(groupByTodo).forEach((x) => {
        groupByTodo[renderPriority(x)] = groupByTodo[x];
        delete groupByTodo[x];
      });
    } 
    else if (groupBy === "currentState") {
      Object.keys(groupByTodo).forEach((x) => {
        let state = x !== "true" ? "Pending" : "Completed";
        groupByTodo[state] = groupByTodo[x];
        delete groupByTodo[x];
      });
    }
    return groupByTodo;
  };

 
  const renderGroupByList = () => {
    let groupedTodo = createGroupBy();
    return (
      <>
        {Object.keys(groupedTodo).map((groupName) => (
          <tbody key={groupName}>
            <tr>
              <td colSpan="5"  className="text-center">
                {" "}
               <u> {groupName}</u>
              </td>
            </tr>
            {groupedTodo[groupName].map((todo) => (
              <tr
                className={todo.currentState ? mystyle : null}
                key={todo.id}
                onClick={() => {
                  handleFormModal();
                  getSelectedTodo(todo);
                  handleReadOnly(true);
                }}
              >
                <td>{todo.title}</td>
                <td>{renderPriority(todo.priority)}</td>
                <td>{todo.createdAt}</td>
                <td>{todo.dueDate}</td>
                <td className="center">
                  <span
                    className="btn btn-primary"
                   
                    onClick={(event) => {
                      event.stopPropagation();
                      handleFormModal();
                      getSelectedTodo(todo);
                      handleReadOnly(false);
                    }}
                  >
                   <img src={editIcon}  style={{height:"10px"}}/>
                  </span>
                  {!todo.currentState ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(event) => changeTodoState(todo, event)}
                    >
                      Done
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={(event) => changeTodoState(todo, event)}
                    >
                      Re-Open
                    </button>
                  )}
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteModal();
                      getSelectedTodo(todo);
                    }}
                    className="btn btn-danger"
                    style={{ backgroundColor: "red" }}
                  >
                  <img src={deleteIcon}  style={{height:"10px"}}/>

                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </>
    );
  };

  const renderList = () => {
    const todoList = searchedValue ? filteredList : todos;
    return (
      <tbody>
        {todoList.map((todo) => (
          <tr
            className={todo.currentState ? mystyle : null}
            key={todo.id}
            onClick={() => {
              handleFormModal();
              getSelectedTodo(todo);
              handleReadOnly(true);
            }}
          >
            <td>{todo.title}</td>
            <td>{renderPriority(todo.priority)}</td>
            <td>{todo.createdAt}</td>
            <td>{todo.dueDate}</td>
            <td className="center">
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={(event) => {
                  event.stopPropagation();
                  handleFormModal();
                  getSelectedTodo(todo);
                  handleReadOnly(false);
                }}
              >
               <img src={editIcon}  style={{height:"10px"}}/>

              </button>
              {!todo.currentState ? (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(event) => changeTodoState(todo, event)}
                >
                  Done
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={(event) => changeTodoState(todo, event)}
                >
                  Re-Open
                </button>
              )}
              <button
                onClick={(event) => {
                  handleDeleteModal();
                  getSelectedTodo(todo);
                }}
                className="btn btn-danger"
              >
                <img src={deleteIcon}  style={{height:"10px"}}/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div style={{overflowX:'auto'}}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th >
              <Taskbtn title="Summary"  sortList={() => sortList("SORT_BY_SUMMARY")}/>
            </th>
            <th >
            <Taskbtn title="Priority"  sortList={() => sortList("SORT_BY_PRIORITY")}/>
            </th>
            <th >
            <Taskbtn title="Created On"  sortList={() => sortList("SORT_BY_CREATEDAT")}/>
            </th>
            <th >
            <Taskbtn title="Due By"  sortList={() => sortList("SORT_BY_DUE_DATE")}/>
            </th>
            <th >
              <div >
                <span >Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        {groupBy !== "none" ? renderGroupByList() : renderList()}
      </table>
      

      {isOpenFormModal && selectedTodo && !readOnly ? (
        <Modal
        
          content={
            <Form
              isReadOnly={readOnly}
              selectedTodo={selectedTodo}
              handleModal={handleFormModal}
            ></Form>
          }
          handleModal={handleFormModal}
          isshow={true}
          title={readOnly ? "Todo" : "Edit Todo"}
        />
      ) : null}

      {isOpenDeleteModal && selectedTodo ? (
        <Modal
        isshow={isOpenDeleteModal}
        
          content={
            <DeleteConfirmation
              todo={selectedTodo}
              handleModal={handleDeleteModal}
            ></DeleteConfirmation>
          }
          handleModal={handleDeleteModal}
          title={"Delete Todo"}
        />
      ) : null}
    </div>
  );
};

export default Tasks;
