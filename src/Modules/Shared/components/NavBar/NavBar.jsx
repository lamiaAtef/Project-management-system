import React from 'react'
import logo from '../../../../assets/images/Navbar/logoNavbar.png';
import { FaBell } from "react-icons/fa";
import profileImg from '../../../../assets/images/Profile/profilePhoto.png';
import { useContext } from 'react';
import {AuthContext} from '../../../../context/AuthContext';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { RiProfileFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useLogout from '../../../../hooks/useLogout';
import styles from './NavBar.module.css';

export default function NavBar() {
  const {userData}= useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  // use logout hook to logout from your account
  const logout = useLogout();
  
  return (
    <div className={`${styles.navbarNormal} navbar-normal d-flex justify-content-between p-2`}>
      <div>
        <img src={logo} alt="img"/>
      </div>

      <div className='d-flex align-items-center ps-3'>
        <FaBell className='textHeader me-3' size={20}/>
        <div className= {`${styles.headerDivider} px-3`}>
          <button className={`${styles.userMenuBtn} btn d-flex align-items-center p-0 `} 
            data-bs-toggle="dropdown" aria-expanded="false" onClick={()=> setMenuOpen(!menuOpen)}>
            <img src={profileImg} style={{width:"50px"}} alt="profileimg" className='me-2'/>
            <div className='d-flex flex-column text-start'>
             <span className='fw-bold me-2'>{userData?.userName}</span>
             <span className='text-muted me-2'>{userData?.userEmail}</span>
            </div>
            
            {menuOpen ? <BsChevronUp /> : <BsChevronDown />}
          </button>
          <ul className="dropdown-menu dropdown-menu-end mt-2 p-2">
            <li>
              <Link className="dropdown-item" to="/dashboard/profile">
               <RiProfileFill  color='#ef9b28' size="23"/> Profile
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item" onClick={logout}>
              <BiLogOut  color='#ef9b28' size="23"/> Logout
              </button>
            </li>
          </ul>
        </div>
       </div>
      
    </div>
  )
}
