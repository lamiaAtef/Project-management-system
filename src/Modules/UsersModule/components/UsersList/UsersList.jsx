import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';
import axiosInstance from '../../../../services/api';
import { AuthContext } from '../../../../context/AuthContext';
import { baseURL, USER_URLS } from '../../../../services/api/apiURLs';
import NoData from '../../../Shared/components/NoData/NoData';
import { LuChevronsUpDown  } from "react-icons/lu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
export default function UsersList() {
  const [usersList, setUsersList] = useState([])
  const { userData } = useContext(AuthContext);

  const getAllUsers = async () => {
    try {
      let response = await axiosInstance.get(`${USER_URLS.GET_ALLUSERS_Users}?pageSize=10&pageNumber=1`, { headers: {  Authorization:`Bearer ${localStorage.getItem('token')}` } })
      console.log(response.data.data);
      setUsersList(response.data.data);





    } catch (error) {
      toast.error(error.response?.data?.message);



    }

  }
  const toggleUserStatus = async (id) => {
  try {
    await axiosInstance.put(
      `${USER_URLS.TOGGLE_USER}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success("User status updated successfully");

    getAllUsers();

  } catch (error) {
    toast.error(error.response?.data?.message || "Error updating status");
  }
};

 useEffect(() => {
  if (userData?.userGroup!="Manager") {
 
  getAllUsers();
  }
}, []);


  return (
    <div>
      <table className="table">
        <thead >
          <tr >
        <th scope="col" className='text-white'>
  User Name
  <LuChevronsUpDown className='' />
</th>

            
            <th scope="col" className='text-white'>Status<LuChevronsUpDown /></th>
            <th scope="col"className='text-white' >Phone Number<LuChevronsUpDown /></th>
            <th scope="col"className='text-white'>Email<LuChevronsUpDown /></th>

            <th scope="col"className='text-white'>Date Created<LuChevronsUpDown /></th>


            <th scope="col"></th>

            <th></th>
          </tr>

        </thead>
       <tbody>
  {usersList.length > 0 ? (
    usersList.map(user => (
      <tr key={user.id}>
        <td>{user.userName}</td>

        <td>
         <button
    className={`status ${
      user.isActivated ? "active" : "inactive"
    }`}
    onClick={() => toggleUserStatus(user.id)}
  >
    {user.isActivated ? "Active" : "Not Active"}
  </button>
        </td>

        <td>{user.phoneNumber}</td>
        <td>{user.email}</td>
        <td>{user.creationDate}</td>

        <td>
          <Dropdown align="end">
  <Dropdown.Toggle
    variant="light"
    className="border-0 shadow-none p-0"
    style={{ background: "transparent" }}
  >
    <HiOutlineDotsVertical size={22} />
  </Dropdown.Toggle>

  <Dropdown.Menu className="py-1">
    <Dropdown.Item className="d-flex align-items-center">
      Block
    </Dropdown.Item>

    <Dropdown.Item className="d-flex align-items-center">
       <FiEye className="me-2" />
  View
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

        </td>
      </tr>
    ))
  ) : (
    <tr>
      
        <NoData />
      
    </tr>
  )}
</tbody>

      </table>
    </div>
  )
}

