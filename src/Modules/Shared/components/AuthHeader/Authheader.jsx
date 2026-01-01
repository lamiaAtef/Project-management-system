import React from 'react'

export default function Authheader({subtitle,title}) {
  return (
    <>
       <div className='auth-header my-4 '>
        <h6>{subtitle}</h6>
        <h3 className='textHeader fw-bold'>{title}</h3>
    </div>
    </>
  )
}
