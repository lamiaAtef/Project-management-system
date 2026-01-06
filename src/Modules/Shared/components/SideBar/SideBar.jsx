import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ImUsers } from "react-icons/im";
import { RiQrCodeFill } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function SideBar() {
  const{logoutUser}=useContext(AuthContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed]= useState(false);

  // add active to sidebar links
  const {pathname}=useLocation();

  // function to logout
  const handleLogout =()=>{
    logoutUser();
    navigate('/login');
   }

  return (
    <>
     <div className={`sidebar-container ${collapsed ? 'collapsed' : 'expanded'}`}>
       
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
        <Sidebar collapsed={collapsed}>
          <Menu>
            <MenuItem component={<Link to="/dashboard"/>} icon={<MdHome size={20}/>} className={`${pathname==='/dashboard'? 'active':null}`}>Home</MenuItem>
            <MenuItem component={<Link to="/dashboard/users"/>} icon={<ImUsers size={20}/>}  className={`${pathname==='/dashboard/users'? 'active':null}`}>Users</MenuItem>
            <MenuItem component={<Link to="/dashboard/projects"/>} icon={<RiQrCodeFill size={20}/>}  className={`${pathname==='/dashboard/projects'? 'active':null}`}>Projects</MenuItem>
            <MenuItem component={<Link to="/dashboard/tasks"/>} icon={<FaListCheck size={20}/>}  className={`${pathname==='/dashboard/tasks'? 'active':null}`}>Tasks</MenuItem>
            <MenuItem onClick={handleLogout}  icon={<IoLogOut size={20}/>} >LogOut</MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  )
}

