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
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Search from '../../../../components/Search/Search';
import DataTable from 'react-data-table-component';


export default function UsersList() {
  const [usersList, setUsersList] = useState([])
  const { userData } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);
const [showUser, setShowUser] = useState(false);
const [blockedUIUsers, setBlockedUIUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState('');



  const getAllUsers = async () => {
    try {
       let response = await axiosInstance.get(`${USER_URLS.GET_USERS_BY_MANAGER}`)
      console.log(response.data.data.length);
      setUsersList(response.data.data);
      console.log("hi",response.data.data )





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
const viewUser = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `${USER_URLS.GET_USER_BYID(userId)}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

   
    setSelectedUser(response.data);
    setShowUser(true);
  } catch (error) {
    toast.error("Failed to load user data");
  }
};


const toggleBlockUI = (id) => {
  setBlockedUIUsers(prev =>
    prev.includes(id)
      ? prev.filter(userId => userId !== id)
      : [...prev, id]
  );

  toast.info("Bloced successfully");
};

 useEffect(() => {
  // if (userData?.userGroup!="Manager") {
 
  getAllUsers();
  // }
}, []);


  const columns = [
    {
      name: 'User Name',
      selector: row => row.userName,
      sortable: true,
    },
    {
    name: 'Status',
    selector: row => row.status,   // للـ sorting
    cell: (row) => (
     <button
  className={`status ${
    blockedUIUsers.includes(row.id)
      ? "inactive"
      : row.isActivated
      ? "active"
      : "inactive"
  }`}
    disabled={blockedUIUsers.includes(row.id)}
    onClick={() => {
    if (!blockedUIUsers.includes(row.id)) {
      toggleUserStatus(row.id); 
    }
  }}
  
>
   {blockedUIUsers.includes(row.id)
    ? "Blocked"
    : row.isActivated
    ? "Active"
    : "Not Active"}
</button>
    ),
    sortable: true,
  },
  
    {
      name: 'Phone Number',
      selector: row => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
      {
      name: 'Date Created',
      
      selector: row => row.task[0].creationDate,
      sortable: true,
    },
    {
    name: 'Action',
    cell: (row) => (
     <Dropdown align="end">
  <Dropdown.Toggle
    variant="light"
    className="border-0 shadow-none p-0"
    style={{ background: "transparent" }}
  >
    <HiOutlineDotsVertical size={22} />
  </Dropdown.Toggle>

  <Dropdown.Menu className="py-1">
  <Dropdown.Item
  className="d-flex align-items-center"
  onClick={() => toggleBlockUI(row.id)}
>
  {blockedUIUsers.includes(row.id) ? "Unblock" : "Block"}
</Dropdown.Item>

    <Dropdown.Item className="d-flex align-items-center"  onClick={() => viewUser(row.id)}>
       <FiEye className="me-2" />
  View
    </Dropdown.Item>
  </Dropdown.Menu>
          </Dropdown>
     
    ),
  
  }
  
  ];
  const filteredUsers = searchTerm
  ? usersList.filter(user =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
     
    )
  : usersList;
  
  return (
    <div>
     <Search placeholder='search user name' onSearch={setSearchTerm}/>
      
      {/* <table className="table">
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
  {filteredUsers.length > 0 ? (
    filteredUsers.length.map(user => (
      <tr key={user.id}>
        <td>{user.userName}</td>

        <td>
         
 <button
  className={`status ${
    blockedUIUsers.includes(user.id)
      ? "inactive"
      : user.isActivated
      ? "active"
      : "inactive"
  }`}
  disabled={blockedUIUsers.includes(user.id)}
  onClick={() => {
    if (!blockedUIUsers.includes(user.id)) {
      toggleUserStatus(user.id); 
    }
  }}
>
  {blockedUIUsers.includes(user.id)
    ? "Blocked"
    : user.isActivated
    ? "Active"
    : "Not Active"}
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
  <Dropdown.Item
  className="d-flex align-items-center"
  onClick={() => toggleBlockUI(user.id)}
>
  {blockedUIUsers.includes(user.id) ? "Unblock" : "Block"}
</Dropdown.Item>

    <Dropdown.Item className="d-flex align-items-center"  onClick={() => viewUser(user.id)}>
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
      
       <td colSpan="6" className="text-end">
    <NoData />
  </td>
      
    </tr>
  )}
</tbody>

      </table> */}
   <DataTable
			columns={columns}
			data={filteredUsers}
      pagination
      paginationPerPage={5}
      responsive striped bordered 
		/>   
<Modal
  show={showUser}
  onHide={() => setShowUser(false)}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>User Details</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {selectedUser && (
      <>
        <p><b>Name:</b> {selectedUser.userName}</p>
        <p><b>Email:</b> {selectedUser.email}</p>
        <p><b>Phone:</b> {selectedUser.phoneNumber}</p>
        <p><b>Country:</b> {selectedUser.country}</p>
        <p>
          <b>Status:</b>{" "}
          <span
            className={
              selectedUser.isActivated
                ? "text-success fw-bold"
                : "text-danger fw-bold"
            }
          >
            {selectedUser.isActivated ? "Active" : "Not Active"}
          </span>
        </p>
        <p><b>Group:</b> {selectedUser.group?.name}</p>
      </>
    )}
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowUser(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  )
}

