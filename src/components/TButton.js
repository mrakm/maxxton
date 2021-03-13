import React from 'react';

function TButton(props) {
    return (
        <button
        onClick={(event) => props.clickHandler}
        className={props.clsname}
      >
        {props.eText}
      </button>
    );
}

export default TButton;