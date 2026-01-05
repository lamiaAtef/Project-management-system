import React from 'react'
import { Outlet} from 'react-router-dom'


export default function MasterLayout() {

  return (
    <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
      
      <Outlet/>
    </div>
  )
}
