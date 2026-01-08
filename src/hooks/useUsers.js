import React, {  useState } from 'react'
import { TASKS_URLS, USERS_URLS } from '../services/api/apiURLs';
import axiosInstance from '../services/api';
const useUsers = () => {
    console.log("useUsers Hook Initialized");
    const [users,setUsers] = useState([]);    
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);        
    const fetchUsers = async () => {
        console.log("fetchUsers Called");
        setLoading(true);   
        try {
            const response = await axiosInstance.get(USERS_URLS.GET_ALL_USERS);
            console.log(response?.data?.data);
            setUsers(response?.data?.data);            
        }   catch (err) { 
            setError(err);
        }       finally {
            setLoading(false);
        }   
    }
   return {users,loading,error,fetchUsers};
} 
export default useUsers;     