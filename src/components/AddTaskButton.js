import React, { useState } from "react";



const AddTaskButton = (props) => {

  return  (
    <div
    className="btn btn-primary rounded-circle"
       onClick={() => props.handleModal()}
      data-toggle="modal"
      data-target="#exampleModal"
    >
      +
    </div>
  );
};

export default AddTaskButton;
