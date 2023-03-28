import React from 'react'

function Dashboard() {
  let name = localStorage.getItem('id')
  return (
    <div>{name}</div>
  )
}

export default Dashboard