import React from 'react'

export default function AuthHeader({title, subtitle}) {
  return (
    <>
    <div className='auth-header mx-5 my-3'>
        <h6>{subtitle}</h6>
        <h3 className='textHeader fw-bold'>{title}</h3>
    </div>
      
    </>
  )
}

