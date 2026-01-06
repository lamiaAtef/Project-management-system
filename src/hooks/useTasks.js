import React, {  useState } from 'react'
import { TASKS_URLS } from '../services/api/apiURLs';
import axiosInstance from '../services/api';

const useTasks = () => {
    const [tasks,setTasks] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    console.log("useTasks Hook Called");
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(TASKS_URLS.GET_All_TASKS);
            console.log(response.data);
            setTasks(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }
     const deleteTask = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`${TASKS_URLS.DELETE_TASK}/${id}`);
            console.log("task deleted");
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }
    //  const updateTasks = async (id) => {
    //     setLoading(true);
    //     try {
    //         const response = await axiosInstance.put(`${TASKS_URLS.UPDATE_TASK}/${id}`);
    //         console.log("task updated");
    //         setTasks(tasks.filter(task => task.id !== id));
    //     } catch (err) {
    //         setError(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

  
   return {tasks,loading,error,fetchTasks,deleteTask};
}
export default useTasks;
