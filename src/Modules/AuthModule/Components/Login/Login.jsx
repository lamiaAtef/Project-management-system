import React from 'react'
import { Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom'

export default function Login() {
    
 const colProps = { md: 8, lg: 6, xl: 5 };

  return (
    <>
     <Col {...colProps} className=" p-3 rounded-3 formBg text-white">
       <h2>Loginnnnn</h2> 
           
    </Col>
    </>
  )
}

