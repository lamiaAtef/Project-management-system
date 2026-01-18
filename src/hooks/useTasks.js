import React, {  useContext, useState } from 'react'
import axiosInstance from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TASKS_URLS } from '../services/api/apiURLs';


const useTasks = () => {
    console.log("useTasks Hook Initialized");
    const [tasks,setTasks] = useState([]);
    // const [organicTasks,setOrganicTasks] = useState([]);

    const[singleTask,setSingleTask]=useState()
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const[taskById,setTaskById]=useState(null)
       //  start server pagination 
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    //  end server pagination 
   
    let navigate = useNavigate()
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(TASKS_URLS.GET_ALL_MY_TASKS_FOR_MANAGER,
            {params:{
                pageSize:pageSize,
                pageNumber:page,
            }});
            console.log(response?.data?.data);
            setTasks(response?.data?.data);
            setTotal(response?.data?.totalNumberOfRecords)
        } catch (err) {
            setError(err);
            getErrorMessage(err,"sorry! can't  loaded tasks now")
        } finally {
            setLoading(false);
        }
    }
    const fetchUserTasks = async () => {
        setLoading(true);
        try {
            console.log("hena el moshkela")
            const response = await axiosInstance.get(TASKS_URLS.GET_ALL_MY_ASIGGNED_TASK);
           console.log("hena el moshkela")
            console.log(response?.data?.data);
            setTasks(response?.data?.data);
            // setOrganicTasks(response?.data?.data)
        } catch (err) {
            setError(err);
            getErrorMessage(err,"sorry! can't  loaded tasks now")
        } finally {
            setLoading(false);
        }
    }
     const fetchOneTaskById = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(TASKS_URLS.GET_TASK_BY_ID(id));
            console.log(response?.data);
            setSingleTask(response?.data);
            
        } catch (err) {
            setError(err);
            getErrorMessage(err,"sorry! can't get this task")
        } finally {
            setLoading(false);
        }
    }
     const deleteTask = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`${TASKS_URLS.DELETE_TASK(id)}`);
            console.log("task deleted");
            setTasks(tasks.filter(task => task.id !== id));
            setTotal(total-1)
        
        } catch (err) {
            setError(err);
            getErrorMessage(err,"sorry! can't delete this task")
        } finally {
            setLoading(false);
        }
    }
    const getErrorMessage = (err, fallback) =>
   toast.error(err?.response?.data?.message || fallback);

     const addTask = async (data) => {
        setLoading(true);
        try {
            //const response = await axiosInstance.post(`${TASKS_URLS.CREATE_TASK}`,data);
            const response =  await axiosInstance.post(`${TASKS_URLS.CREATE_TASK}`,data)
            console.log("task added",response.data);
            setTasks(prevTasks => [...prevTasks, response.data]);
            console.log("tasks length" , tasks.length)
            toast.success("Task added successfully");
            navigate("/dashboard/tasks")
        } catch (err) {
            setError(err);
            console.log(err);
            // toast.error("Task can't added ");
            getErrorMessage(err,"sorry! can't add this task")

        } finally {
            setLoading(false);
        }
    }
     const updateTasks = async (id,data) => {
        setLoading(true);
        console.log(data,"update test")
        try {
            const response = await axiosInstance.put(`${TASKS_URLS.UPDATE_TASK(id)}`,data);
            console.log("task updated");
            // console.log(response.data.data)
            setTasks(prevTasks =>[...prevTasks,response.data])
            navigate("/dashboard/tasks")
            toast.success("Task updated successfully");

        } catch (err) {
            setError(err);
            getErrorMessage(err,"sorry! can't update this task")

        } finally {
            setLoading(false);
        }
    }
   
   

  
   return {tasks,total,setTotal,page,setPage,pageSize,setPageSize,loading,error,fetchTasks,deleteTask,addTask,taskById,fetchOneTaskById,singleTask,updateTasks,fetchUserTasks};
}
export default useTasks;
