import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Search = (props) => {
  const dispatch = useDispatch();
  const searchedValue = useSelector((state) => state.searchedValue); 
  return (
    <div >
      <label className="form-label">Search</label>
      
        <input
          value={searchedValue}
          type="text"
          className="form-control"
          id="basic-search"
          aria-describedby="Search Task"
          placeholder="Search Task"
          onChange={(e) => {
          
            dispatch({
              type: "SEARCH",
              payload: e.target.value,
            });
          }}
        />
      
    </div>
  );
};

export default Search;
