import React from 'react'
import { Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import AuthHeader from '../../../Shared/components/AuthHeader/AuthHeader';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../../services/validation';
import axios from 'axios';
import { USER_URLS, baseURL } from '../../../../services/api/apiURLs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    
 const colProps = { md: 8, lg: 6, xl: 5 };

 const[showPassword, setShowPassword] = useState(false);

 const{register, formState:{errors}, handleSubmit}= useForm();
 let navigate = useNavigate();

 const onSubmit=async(data)=>{

  try {
    let response= await axios.post(`${baseURL}${USER_URLS.LOGIN}`,data);
    localStorage.setItem("token",response?.data?.token);
    console.log(response);
    toast.success('Welcome to PMS!',
    {
      autoClose: 3000,
    })
    navigate('/dashboard');

    
  } catch (error) {
    toast.error('failed to login');
    
  }
 }

  return (
    <>
     <Col {...colProps} className=" p-3 rounded-3 formBg text-white">


     <AuthHeader subtitle={'welcome to PMS'} title={'Login'}/>  

     <Form onSubmit={handleSubmit(onSubmit)} className='m-5'>
      <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='textHeader'>E-mail</Form.Label>
        <Form.Control type="email" placeholder="Enter your E-mail" 
        {...register('email',EMAIL_VALIDATION)} />
        {errors.email && <small className='text-danger d-block mt-1'>{errors.email.message}</small>}
      </Form.Group>

      <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className='textHeader'>Password</Form.Label>

        <div className='password-wrapper'>
        <Form.Control  type={showPassword ? 'text':'password'} placeholder="Enter your password"
        {...register('password',PASSWORD_VALIDATION)} />
        <span className='eye-icon' onClick={()=> setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash/> : <FaEye/>}
        </span>
        </div>
        {errors.password && <small className='text-danger d-block mt-1'>{errors.password.message}</small>}
      </Form.Group>

      <div className="links d-flex justify-content-between my-3">
        <Link className='text-decoration-none text-white' to="/register">Register Now?</Link>
        <Link className='text-decoration-none text-white' to="/forget-pass">Forget Password?</Link>
      </div>

      <Button type='submit' className='w-100 mt-4 Auth-btn'>Login</Button>
    </Form>
           
    </Col>
    </>
  )
}

