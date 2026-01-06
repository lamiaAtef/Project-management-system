import React from 'react'
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from 'react-router-dom';
export default function TasksData() {
  let {register,handleSubmit,formState:{errors,isSubmitting}} = useForm();
  let onSubmit = (data) => {
    console.log(data);
  }
  return (
    <>
      <header className='bg-white container-fluid m-0 p-3'>
        <div className="container">
          <Link to="/dashboard/tasks" className='headerLink'>
            <MdKeyboardArrowLeft />
            View All Tasks
          </Link>
          <h1 className='title my-3'>Add a New Task</h1>
        </div>
        
      </header>
      <div className='formContainer'>
        <form onSubmit={handleSubmit(onSubmit)} className='form-admin' >
        <div className="form-group mb-4">
          <label htmlFor="title">Title</label>
          <input placeholder="Name" type="text" id="title" className='form-control' {...register("title",{required:"Title is required"})} />   
          {errors.title && <small className='text-danger d-block mt-1'>{errors.title.message}</small>}
        </div>
        <div className="form-group mb-4">  
          <label htmlFor="description">Description</label>
          <textarea placeholder="Description" id="description" className='form-control' {...register("description",{required:"Description is required"})} ></textarea>  
          {errors.description && <small className='text-danger d-block mt-1'>{errors.description.message}</small>}    
        </div>
        <div className="d-flex justify-content-between">
          <div className="form-group mb-4">
            <label htmlFor="employeeId">User</label>
            <select id="employeeId" className='form-control ' {...register("employeeId",{required:"User is required"})} >
              <option value="">Select user</option> 
              {/* TODO options from api */}
            </select>
            {errors.employeeId && <small className='text-danger d-block mt-1'>{errors.employeeId.message}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="projectId">Project</label>
            <select id="projectId" className='form-control' {...register("projectId",{required:"Project is required"})} >
              <option value="">Select project</option> 
              {/* TODO options from api */}
            </select>
            {errors.projectId && <small className='text-danger d-block mt-1'>{errors.projectId.message}</small>}
          </div>
        </div>
        <div className='d-flex justify-content-between my-4'>
          <Button type="button" className=' cancelBtn w-25 mt-4 '>cancel</Button>
           <Button disabled={isSubmitting} type='submit' className='w-25 mt-4 Auth-btn'>
            {isSubmitting ?(
                <>
                Save
                <span className='spinner-border spinner-border-sm ms-2' role='status' aria-hidden='true'/>
                </>
              ):('Save')}
        </Button>
        </div>
      </form>
      </div>
      
    </>
  )
}

