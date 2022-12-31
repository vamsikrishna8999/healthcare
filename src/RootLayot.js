import React from 'react'
import Navigationbar from './components/Navigationbar/Navigationbar'
import { Outlet } from 'react-router-dom'
import './RootLayot.css'

function RootLayot() {
  return (
    <div className='root'>
        <Navigationbar />
        {/*Dynamic content*/}
        <Outlet />


    </div>
  )
}

export default RootLayot