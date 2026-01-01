import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { USER_URLS } from '../../../../services/api/apiURLs.js';
import axiosInstance from '../../../../services/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Col ,Form} from 'react-bootstrap';
import { EMAIL_VALIDATION} from '../../../../services/validation';
import AuthHeader from '../../../Shared/components/AuthHeader/AuthHeader';





export default function ForgetPassword() {
   const colProps = { md: 8, lg: 6, xl: 5 };

 const{register, formState:{errors}, handleSubmit}= useForm();
 let navigate = useNavigate();

 const onSubmit=async(data)=>{

  try {
    let response= await axiosInstance.post(`${USER_URLS.RESET_REQUEST}`,data);
    console.log(response);
    toast.success('Welcome to PMS!',
    {
      autoClose: 3000,
    })
    navigate('/reset-password');

    
  } catch (error) {
    toast.error('failed to send reset email',
    {
      autoClose: 3000,
    });
    
  }
 }
  return (
    <>
    <Col {...colProps} className=" p-3 rounded-3 formBg text-white">
        <AuthHeader subtitle={'welcome to PMS'} title={'Forget Password'}/> 
          <Form onSubmit={handleSubmit(onSubmit)} className='m-5'>
      <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='textHeader'>E-mail</Form.Label>
        <Form.Control type="email" placeholder="Enter your E-mail" 
        {...register('email',EMAIL_VALIDATION)} />
        {errors.email && <small className='text-danger d-block mt-1'>{errors.email.message}</small>}
      </Form.Group>
      <Button type='submit' className='w-100 mt-4 Auth-btn'>Verify</Button>
    </Form>
     </Col>
      
    </>
  )
}
