import React from 'react'
import './Navigationbar.css'
import { NavLink } from 'react-router-dom'
function Navigationbar() {

  const activeLink={
    color:"#ffffff",
    background:"#535353",
    fontSize:"1.1rem",
    
    
  }
  const inactiveLink={
    color:"#E5E4E2",
  }


  return (
    
    <div className=" bg-black box-shadow">
      <ul className="nav justify-content-center nav-pills p-1">
      <li className="nav-item">
        <NavLink className="nav-link " to="/" 
        style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }} >
          Today
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link " to="/Tasks" 
        style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }} >
          Tasks
        </NavLink>
      </li>

    </ul>

    </div>
  )
}

export default Navigationbar;