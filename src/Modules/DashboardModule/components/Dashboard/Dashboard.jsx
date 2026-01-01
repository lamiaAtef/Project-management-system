import React from 'react'
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

export default function Dashboard() {

  const{logoutUser,userData}=useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut=()=>{
    logoutUser();
    navigate('/login');

  }
  return (
    <>
    <h2 className='mb-3'> Welcome <span className="fw-bold">{userData?.userName}</span></h2>
    <Button type="submit" variant="success" onClick={handleLogOut}>Log Out</Button>
    </>
      
    
  )
}
