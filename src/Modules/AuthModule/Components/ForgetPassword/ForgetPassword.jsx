import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AuthHeader from '../../../Shared/components/AuthHeader/AuthHeader';
import Form from 'react-bootstrap/Form';
import { EMAIL_VALIDATION } from '../../../../services/validation';


export default function ForgetPassword() {
   const colProps = { md: 8, lg: 6, xl: 5 };
   const{register, formState:{errors}, handleSubmit}= useForm();
   let navigate = useNavigate();
    const onSubmit=(data)=>{
      console.log(data);
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
          <Button type='submit' className='w-100 mt-4 Auth-btn'>Login</Button>
          
         </Form>
      </Col>
    </>
  )
}
