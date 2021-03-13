import React from 'react';
import shortion from '../assets/icons/shorticon.svg';

function Taskbtn(props) {
    return (
        <div className="d-flex justify-content-between" >
                <span  >{props.title}</span>
                <span
                  onClick={() => props.sortList()}
                  className="btn btn-primary"
                  style={{paddingTop:"3px",paddingBottom:"3px"}}
                >
                  <img src={shortion}  style={{height:"10px"}}/>

                </span>
      </div>
    );
}

export default Taskbtn;