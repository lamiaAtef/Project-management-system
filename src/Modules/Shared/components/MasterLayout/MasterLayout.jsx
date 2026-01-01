import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <div>
      <h2>MasterLayout</h2>
      <Outlet/>
    </div>
  )
}
