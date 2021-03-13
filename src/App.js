import React,{useState} from "react";
import Tabs from "./components/Tabs";
import GroupBy from "./components/GroupBy";
import Serach from "./components/Search";
import AddTaskButton from "./components/AddTaskButton";
import Modal from "./components/Modal";
import Form from "./components/Form";
import './assets/css/bootstrap.min.css'


const App = () => {
  const [isOpenModal, setIsOpenModal] = useState(false); 
  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  return (
    <div className="container" style={{maxWidth:"1000px"}}>
        

        <nav className="navbar navbar-light bg-white">
        <div className="container fs-1" style={{padding: '0px'}}>
          <a className="navbar-brand"><h1>ToDo App</h1></a>
          <div className="d-flex">
          <AddTaskButton handleModal={()=>handleModal()}/>
          </div>
        </div>
      </nav>



      <div className="row">
        <div className='col-2'>
        <GroupBy></GroupBy>
        </div>
        <div className='col-10'>
        <Serach></Serach>
        </div>
      </div>
      <Tabs></Tabs>
     
    <Modal
     isshow={isOpenModal} 
     handleModal={() => handleModal()}
      content={<Form  handleModal={()=> handleModal()}></Form>}
      
      title={"Add Todo"}
      
    />
  
    </div>
  );
};

export default App;
