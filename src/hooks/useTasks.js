import React, {  useState } from 'react'
import axiosInstance from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TASKS_URLS } from '../services/api/apiURLs';


const useTasks = () => {
    console.log("useTasks Hook Initialized");
    const [tasks,setTasks] = useState([]);
    const [organicTasks,setOrganicTasks] = useState([]);

    const[singleTask,setSingleTask]=useState()
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    let navigate = useNavigate()
    const fetchTasks = async () => {
        console.log("fetchTasks Called");
        setLoading(true);
        try {
            const response = await axiosInstance.get(TASKS_URLS.GET_ALL_MY_TASKS_FOR_MANAGER);
            console.log(response?.data?.data);
            setTasks(response?.data?.data);
            setOrganicTasks(response?.data?.data)
        } catch (err) {
            setError(err);
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
            // toast.success("task updated")
            // navigate("/dashboard/tasks")
        } catch (err) {
            setError(err);
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
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }
     const addTask = async (data) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(`${TASKS_URLS.CREATE_TASK}`, data);
            console.log("task added");
            setTasks([...tasks, response.data.data]);
            toast.success("Task added successfully");
            navigate("/dashboard/tasks")
        } catch (err) {
            setError(err);
            console.log(err);
            toast.error("Task can't added ");

        } finally {
            setLoading(false);
        }
    }
     const updateTasks = async (id,data) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put(`${TASKS_URLS.UPDATE_TASK(id)}`,data);
            console.log("task updated");
            setTasks([...tasks,response.data])
            navigate("/dashboard/tasks")
            toast.success("Task updated successfully");

        } catch (err) {
            setError(err);
            toast.error("Task  can't updated");

        } finally {
            setLoading(false);
        }
    }
   

  
   return {tasks,organicTasks,loading,error,fetchTasks,deleteTask,addTask,fetchOneTaskById,singleTask,updateTasks};
}
export default useTasks;
