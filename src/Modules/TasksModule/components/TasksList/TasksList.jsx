import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import useTasks from '../../../../hooks/useTasks';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { LuChevronsUpDown } from "react-icons/lu";
import DropdownButton from '../../../../components/DropdownButton/DropdownButton';
import { FaEdit, FaEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Confirmation from '../../../../components/Confirmation/Confirmation';
import { BeatLoader } from 'react-spinners';
import Search from '../../../../components/Search/Search';
import DataTable from 'react-data-table-component';
import { AuthContext } from '../../../../context/AuthContext';
import styles from "./TasksList.module.css"
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core"

import {Draggable} from './Draggable';
import {Droppable} from './Droppable';


export default function TasksList() {
  let navigate = useNavigate();
  let {tasks,loading,error,page,setPage ,total,pageSize,setPageSize,fetchTasks,deleteTask,fetchUserTasks}= useTasks()
  let [showModal, setShowModal] = useState(false);
  let [selectedId, setSelectedId] = useState(null);
  let [selectedName, setSelectedName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const STATUS_ORDER = ["ToDo", "InProgress", "Done"];

   // view modal
    const [showView, setShowView] = useState(false);
    const [viewTask, setViewTask] = useState(null);
    const handleCloseView = () => setShowView(false);

     const {userData} = useContext(AuthContext)

     let role =  userData?.userGroup;
     console.log(role,"role")

 

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
 const handleView = (task) => {
  console.log(task); 
  setViewTask(task);
  setShowView(true); 
};
  


useEffect(() => {
  if (!role) return;

  if (role === "Manager") {
    fetchTasks();
  } else {
    fetchUserTasks();

  }
}, [role,page,pageSize]);

// Group tasks
// TODO why i should use useMemo
 let groupedTasks = tasks.reduce((acc,task)=>{
  let status = task.status;
  if (!acc[status]) acc[status] = []
  acc[status].push(task)
  return acc
 },{})


// end group tasks 
  if(loading) return <div className='d-flex  align-items-center justify-content-center vh-100'> <BeatLoader size={30} color='#288131' margin={10}  /></div> 
  // filter tasks
const filteredTasks = searchTerm
  ? tasks.filter(task =>
      task?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task?.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task?.employee?.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task?.project?.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : tasks;


  
  const columns = [
	{
    name: (<>Title<LuChevronsUpDown /></>),

		selector: row => row.title,
    sortable: true,
	},
  {
  name: (<>Status<LuChevronsUpDown /></>),

  selector: row => row.status,  
  cell: (row) => (
    row.status === "ToDo" ? 
      <span className="bg-notActive status text-white px-3 py-1">
        ToDo
      </span>
    : row.status === "In Progress" ?
      <span className="bg-progress status text-white px-3 py-1">
        In Progress
      </span>
    :
      <span className="bg-active status text-white px-3 py-1">
        Done
      </span>
  ),
  sortable: true,
},

  {
    name: (<>User<LuChevronsUpDown /></>),

		selector: row => row.employee.userName,
    sortable: true,
	},
  {
    name: (<>Project<LuChevronsUpDown /></>),

		selector: row => row.project.title,
    sortable: true,
	},
    {
    name: (<>Date<LuChevronsUpDown /></>),

		selector: row => row.creationDate? new Date(row.creationDate).toLocaleDateString() : '-',
    sortable: true,
	},
  {
  name: 'Action',
  cell: (row) => (
    <DropdownButton
      actions={{
        view: {
          label: "View",
          icon: <FaEye color="rgba(0, 146, 71, 1)" />,
          onClick: () => handleView(row),
        },
        edit: {
          label: "Edit",
          icon: <FaEdit color="rgba(0, 146, 71, 1)" />,
          onClick: () => navigate(`/dashboard/tasks-data/${row.id}`),
        },
        delete: {
          label: "Delete",
          icon: <RiDeleteBin6Line color="rgba(255, 0, 0, 1)" />,
          onClick: () => openConfirmationModal(row.id, row.title),
          class: "text-danger",
        },
      }}
    />
  ),

}

];

  return (
    <>
      <header className='bgOverlayDark container-fluid m-0 px-2 py-3'>
        <div className="container d-flex justify-content-between align-items-center">
          {
              role==="Manager" ?
              <>
                 <h1 className='title'>Tasks</h1>
                  <button className='Auth-btn' onClick={()=>navigate("/dashboard/tasks-data")}>  + Add New Task</button>
              </>:
                 <h1 className='title'>Tasks Board</h1>

          }
           
        </div>
      
      </header>
      
      {/* TODO TABLE */}
      
    
    {/* <table  responsive striped bordered >
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
    </table> */}
    {/* <Search
        value={query}
        onChange={setQuery}
        placeholder="Search users..."
      /> */
      }
      {/* start admin  */}
      {role==="Manager"? <>
            <Search placeholder='search task' onSearch={setSearchTerm}/>
          <DataTable
            columns={columns}
            data={filteredTasks}
            pagination
          paginationServer

          paginationTotalRows={total}

          paginationDefaultPage={page}
          paginationPerPage={pageSize}

          onChangePage={(page) => setPage(page)}
          onChangeRowsPerPage={(size) => {
            setPageSize(size);
            setPage(page); 
  }}

  progressPending={loading}
          /> 
          </>:
              <Container>
               <Row className='g-5 my-2'>
                {STATUS_ORDER.map((status) => (
                  <Col sm={12} md={6} lg={4} key={status}>
                    <h3 className={styles.boxHeader}>{status}</h3>

                    <div className={styles.boxTasks}>
                      {(groupedTasks[status] || []).map(task => (
                        <div
                          className={styles.taskElement}
                          key={task.id}
                        >
                          {task.title}
                        </div>
                      ))}
                    </div>
                  </Col>
                ))}
              </Row>

      
    </Container>
          }
    
    {/* end admin */}
    {/* start user */}
  
    {/* end user */}

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
      
      <Modal show={showView} onHide={handleCloseView}>
        <Modal.Header closeButton>
          <Modal.Title >Task Details</Modal.Title>
        </Modal.Header>
          <h6 className='p-2'>Task title:{viewTask?.title}</h6>
          <h6 className='p-2'>Task Status:{viewTask?.status}</h6>
          <h6 className='p-2'>Task User :{viewTask?.employee.id}</h6>
          <h6 className='p-2'>Task project :{viewTask?.project.id}</h6>
        <Modal.Footer>


        </Modal.Footer>
      </Modal>
       
    </>
  )
}
