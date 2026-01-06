import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import useTasks from '../../../../hooks/useTasks';


export default function TasksList() {
  let navigate = useNavigate();
  let {tasks,loading,error,fetchTasks,deleteTask}= useTasks()
  useEffect(() => {
    fetchTasks();

  }, []);
   useEffect(() => {
   console.log(tasks);

  }, [tasks]);

  return (
    <>
      <header className='header '>
        <h1 className='title'>Tasks</h1>
        <button className='Auth-btn' onClick={()=>navigate("/dashboard/tasks-data")}>  + Add New Task</button>
      </header>
      
      {/* TODO TABLE */}
      <div className="table_container">
        {loading && <p>Loading...</p>}
        {error && <p>Error happened</p>}

 <table className=''>
      <thead>
        <tr>
          <th>Title</th>
          <th>Statues</th>
          <th>User</th>
          <th>Project</th>
          <th>Date Created</th>
          <th>Action</th>          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
         
        </tr>
        <tr>
          <td>2</td>
          
        </tr>
     
      </tbody>
    </table>
    </div>
      
      
       
    </>
  )
}
