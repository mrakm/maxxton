import React, {useState} from "react";
import Tasks from "./Task";

const Tabs = (props) => {
  const [tabnum, setTab] = useState("all");
  function tabChangeHandler(e){
    setTab(e);
  }

  return (
    <div className="mt-4">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className={tabnum=="all" ? 'nav-link active': "nav-link"}
            onClick={()=>{tabChangeHandler("all")}}
          >
            All
          </a>
          <a
            className={tabnum=="pending" ? 'nav-link active': "nav-link"}
            onClick={()=>{tabChangeHandler("pending")}}
          >
            Pending
          </a>
          <a
            className={tabnum=="completed" ? 'nav-link active': "nav-link"}
            onClick={()=>{tabChangeHandler("completed")}}
          >
            Completed
          </a>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className={tabnum=="all" ? 'tab-pane fade show active': "tab-pane fade d-none"}
        >
          <Tasks selectedTab="All"></Tasks>
        </div>
        <div
           className={tabnum=="pending" ? 'tab-pane fade show active': "tab-pane fade d-none"}
        >
          <Tasks selectedTab="Pending"></Tasks>
        </div>
        <div
           className={tabnum=="completed" ? 'tab-pane fade show active': "tab-pane fade d-none"}
        >
          <Tasks selectedTab="Completed"></Tasks>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
