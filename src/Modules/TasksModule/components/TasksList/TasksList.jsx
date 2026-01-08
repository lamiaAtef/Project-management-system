import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import useTasks from '../../../../hooks/useTasks';
import { Container } from 'react-bootstrap';
import { LuChevronsUpDown } from "react-icons/lu";
import DropdownButton from '../../../../components/DropdownButton/DropdownButton';
import { FaEdit, FaEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Confirmation from '../../../../components/Confirmation/Confirmation';
import { BeatLoader } from 'react-spinners';
import Search from '../../../../components/Search/Search';



export default function TasksList() {
  let navigate = useNavigate();
  let {tasks,loading,error,fetchTasks,deleteTask}= useTasks()
  let [showModal, setShowModal] = useState(false);
  let [selectedId, setSelectedId] = useState(null);
  let [selectedName, setSelectedName] = useState(null);
  const [query, setQuery] = useState("");

  

  const openConfirmationModal = (id,name) => {
    setSelectedId(id);
    setSelectedName(name)
    setShowModal(true);
  }
  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedId(null);
    setSelectedName(null)
  } 
  const handleView = (id) =>{
    
  }
  useEffect(() => {
    fetchTasks();
    console.log("TasksList Component Mounted");

  }, []);
   useEffect(() => {
   console.log(tasks);

  }, [tasks]);
  if(loading) return <div className='d-flex  align-items-center justify-content-center vh-100'> <BeatLoader size={30} color='#288131' margin={10}  /></div> 
  // filter tasks
  const filteredTasks = tasks.filter(
    (u) =>
      u.title.toLowerCase().includes(query.toLowerCase()) 
      // u.email.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <header className='bg-white container-fluid m-0 p-2'>
        <div className="container d-flex justify-content-between align-items-center">
            <h1 className='title'>Tasks</h1>
           <button className='Auth-btn' onClick={()=>navigate("/dashboard/tasks-data")}>  + Add New Task</button>
        </div>
      
      </header>
      
      {/* TODO TABLE */}
      
    
    <table  responsive striped bordered >
      <thead>
        <tr>
          <th>Title <LuChevronsUpDown /></th>
          <th>Statues <LuChevronsUpDown /></th>
          <th>User <LuChevronsUpDown /></th>
          <th>Project <LuChevronsUpDown /></th>
          <th>Date Created <LuChevronsUpDown /></th>
          <th>Action <LuChevronsUpDown /></th>          
        </tr>
      </thead>
      <tbody>
      {tasks.length > 0 ?
      tasks.map((task)=>(
        <tr key={task.id}>
          <td>{task.title}</td> 
          <td>
            {task.status === "ToDo" ? 
            <span className='bg-notActive status text-white px-3 py-1 '> ToDo </span>
            : task.status === "In Progress" ?
            <span className='bg-progress status text-white px-3 py-1'> In Progress </span>
            : <span className='bg-active status text-white px-3 py-1'> Done </span>
            
            }</td>
          <td>{task.employee.userName}</td>
          <td>{task.project.title}</td> 
          <td>{task.creationDate}</td>
          <td>
            <DropdownButton
               actions={{
                view: {
                  label: "View",
                  icon: <FaEye color='rgba(0, 146, 71, 1)'/>,
                  onClick: () => handleView(task.id),
                },
                edit: {
                  label: "Edit",
                  icon: <FaEdit color='rgba(0, 146, 71, 1)'/>,
                  onClick: () => navigate(`/dashboard/tasks-data/${task.id}`),
                },
                delete: {
                  label: "Delete",
                  icon: <RiDeleteBin6Line color='rgba(255, 0, 0, 1)' />,
                  onClick: () => openConfirmationModal(task.id,task.title),
                  class:"text-danger"
                },
              }}
            />
          </td>
        </tr>
      ))

      :<tr><td>No tasks available</td></tr>}
      </tbody>
    </table>
    <Confirmation
       show={showModal}
                  deletedElement=""
                  onClose={() => setShowModal(false)  }
                  onConfirm={() => {
                    deleteTask(selectedId);
                    closeDeleteModal();
                  }}
                  task={`${selectedName}`}
          
    />
      
      
       
    </>
  )
}
