import React from 'react'
import logo from '../../../../assets/images/Navbar/logoNavbar.png';
import { FaBell } from "react-icons/fa";
import logoNavbar from '../../../../assets/images/Navbar/imgNavbar.png';
import { useContext } from 'react';
import {AuthContext} from '../../../../context/AuthContext';

export default function NavBar() {
  const {userData}= useContext(AuthContext);
  return (
    <div className='d-flex justify-content-between p-2'>
      <div>
        <img src={logo} alt="img"/>
      </div>

      <div className='d-flex align-items-center ps-3'>
        <FaBell className='textHeader me-3' size={20}/>
        <span className='header-divider ps-3'>
          <img src={logoNavbar} alt="logoNav" className='me-2'/>
          <span className='text-muted me-2'>{userData?.userEmail}</span>
        </span>
       </div>
      
    </div>
  )
}
