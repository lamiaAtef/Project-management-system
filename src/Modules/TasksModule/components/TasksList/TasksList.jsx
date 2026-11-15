import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { LuChevronsUpDown } from "react-icons/lu";
import { FaEdit, FaEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { DndContext } from "@dnd-kit/core";

import useTasks from '../../../../hooks/useTasks';
import DropdownButton from '../../../../components/DropdownButton/DropdownButton';
import Confirmation from '../../../../components/Confirmation/Confirmation';
import Search from '../../../../components/Search/Search';
import DataTable from 'react-data-table-component';
<<<<<<< HEAD
import { AuthContext } from '../../../../context/AuthContext';
import styles from "./TasksList.module.css"


=======
import { BeatLoader } from 'react-spinners';
>>>>>>> ec32be5dec7d428dced58410401c1d76b5826570

import { AuthContext } from '../../../../context/AuthContext';
import TaskColumn from "../TaskColumn/TaskColumn";
import styles from "./TasksList.module.css";

export default function TasksList() {
  const navigate = useNavigate();
  const { tasks,changeStatus, loading, page, setPage, total, pageSize, setPageSize, fetchTasks, fetchUserTasks, deleteTask, updateTask } = useTasks();
  const { userData } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [showView, setShowView] = useState(false);
  const [viewTask, setViewTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [boardTasks, setBoardTasks] = useState([]);

  const column = [
    
        { name: <>Title<LuChevronsUpDown /></>, selector: row => row.title, sortable: true },
        {
        name: <>Status <LuChevronsUpDown /></>,
        cell: row => (
        <span
        className={`badge ${
          row.status === "ToDo"
            ? "bg-notActive"
            : row.status === "InProgress"
            ? "bg-progress"
            : "bg-active"
        } text-white px-3 py-2 fsize`}
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
        { name: <>User<LuChevronsUpDown /></>, selector: row => row.employee.userName, sortable: true },
        { name: <>Project<LuChevronsUpDown /></>, selector: row => row.project.title, sortable: true },
        { name: <>Date<LuChevronsUpDown /></>, selector: row => row.creationDate ? new Date(row.creationDate).toLocaleDateString() : '-', sortable: true },
        {
          name: 'Action',
          cell: row => (
            <DropdownButton
              actions={{
                view: { label: "View", icon: <FaEye color="#009247" />, onClick: () => handleView(row) },
                edit: { label: "Edit", icon: <FaEdit color="#009247" />, onClick: () => navigate(`/dashboard/tasks-data/${row.id}`) },
                delete: { label: "Delete", icon: <RiDeleteBin6Line color="red" />, onClick: () => openConfirmationModal(row.id, row.title), class: "text-danger" }
              }}
            />
          ),
        }
      ]


  const STATUS_ORDER = ["ToDo", "InProgress", "Done"];
  const role = userData?.userGroup;

  useEffect(() => {
    const loadTasks = async()=>{
         if (!role) return;
          if (role === "Manager")await fetchTasks();
          else await fetchUserTasks();
    }
   loadTasks()
  }, [role, page, pageSize]);

 
    useEffect(() => {
      if (role !=="Manager") setBoardTasks(tasks);

    }, [tasks]);

  const openConfirmationModal = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
    setShowModal(true);
  };
  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedId(null);
<<<<<<< HEAD
    setSelectedName(null)
  }
 const handleView = (task) => {
  console.log(task);
  setViewTask(task);
  setShowView(true);
};

=======
    setSelectedName(null);
  };
>>>>>>> ec32be5dec7d428dced58410401c1d76b5826570

  const handleView = (task) => {
    setViewTask(task);
    setShowView(true);
  };
  const handleCloseView = () => setShowView(false);
 const groupedTasks = boardTasks.reduce((acc, task) => {
    const status = task.status;
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {});
 const handleDragEnd = async (event) => {
  const { active, over } = event;
  if (!over) return;

  const taskId = active.id;
  const newStatus = over.id;

  // Optimistic UI
  setBoardTasks(prev =>
    prev.map(task =>
      task.id === taskId
        ? { ...task, status: newStatus }
        : task
    )
  );

  try {
    await changeStatus(taskId, { status: newStatus });
  } catch (err) {
    console.error(err);
  }
<<<<<<< HEAD
}, [role]);

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
=======
};
//search 
>>>>>>> ec32be5dec7d428dced58410401c1d76b5826570
const filteredTasks = searchTerm
  ? tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
     
    )
  : tasks;

<<<<<<< HEAD


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
=======
  if (loading) return <div className='d-flex align-items-center justify-content-center vh-100'><BeatLoader size={30} color='#288131' margin={10} /></div>;
>>>>>>> ec32be5dec7d428dced58410401c1d76b5826570

  return (
    <>
      <header className='bgOverlayDark container-fluid m-0 px-2 py-3'>
        <div className="container d-flex justify-content-between align-items-center">
          {role === "Manager" ?
            <>
              <h1 className='title'>Tasks</h1>
              <button className='Auth-btn' onClick={() => navigate("/dashboard/tasks-data")}>+ Add New Task</button>
            </> :
            <h1 className='title'>Tasks Board</h1>
          }
<<<<<<< HEAD

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
=======
        </div>
      </header>
>>>>>>> ec32be5dec7d428dced58410401c1d76b5826570

      {role === "Manager" ? (
        <>
          <Search placeholder='search task' onSearch={setSearchTerm} />
          <DataTable
            columns={column}
            data={filteredTasks}
            pagination
<<<<<<< HEAD
            paginationPerPage={8}
            responsive
            striped
           bordered
          />
          </>:
              <Container>
               <Row className='g-5 my-2'>
                {STATUS_ORDER.map((status) => (
                  <Col sm={12} md={6} lg={4} key={status}>
                    <h3 className={styles.boxHeader}>{status}</h3>
=======
            paginationServer
            paginationTotalRows={total}
            paginationDefaultPage={page}
            paginationPerPage={pageSize}
            onChangePage={setPage}
            onChangeRowsPerPage={(size) => { setPageSize(size); setPage(page); }}
            progressPending={loading}
          />
        </>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <Container>
            <Row className='g-5 my-2'>
              {STATUS_ORDER.map(status => (
                <TaskColumn key={status} status={status} tasks={groupedTasks[status] || []} />
              ))}
            </Row>
          </Container>
        </DndContext>
      )}
>>>>>>> ec32be5dec7d428dced58410401c1d76b5826570

      <Confirmation
        show={showModal}
        deletedElement=""
        onClose={() => setShowModal(false)}
        onConfirm={() => { deleteTask(selectedId); closeDeleteModal(); }}
        task={selectedName}
      />

<<<<<<< HEAD

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
=======
      <Modal show={showView} onHide={handleCloseView} className='view_modal'>
>>>>>>> ec32be5dec7d428dced58410401c1d76b5826570
        <Modal.Header closeButton>
          <Modal.Title className='model_style'>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className='p-2'>Task title: {viewTask?.title}</h6>
          <h6> Task Status: 
            <span  className={`p-2 d-inline-block rounded-pill mx-2 ${
                viewTask?.status === "ToDo"
                  ? "bg-notActive"
                  : viewTask?.status === "InProgress"
                  ? "bg-progress"
                  : "bg-active"
              }`}>
                  {viewTask?.status}
            </span>
             
          </h6>


          <h6 className='p-2'>Task User: {viewTask?.employee.userName}</h6>
          <h6 className='p-2'>Task Project: {viewTask?.project.title}</h6>
        </Modal.Body>
      </Modal>
<<<<<<< HEAD
=======
     
>>>>>>> ec32be5dec7d428dced58410401c1d76b5826570

    </>
  );
}
