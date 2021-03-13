import React from "react";
import { useDispatch } from "react-redux";

const GroupBy = (props) => {
  const dispatch = useDispatch();

  
  const setGroupBy = (groupBy) => {
    dispatch({
      type: "SET_GROUP_BY",
      payload: groupBy,
    });
  };

  return (
    <div >
      <label className="form-label" >Group By</label>

      <select
        onChange={(event) => setGroupBy(event.target.value)}
        className="form-select"
        id="inputGroupSelect01"
        defaultValue="None"
      >
        <option value="none">None</option>
        <option value="createdAt">Created On</option>
        <option value="currentState">Pending On</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupBy;
