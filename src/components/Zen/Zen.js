import React from 'react'
import videobg from '../images/videobg.mp4'

function Zen() {
  return (
    <div className="main">
        <video autoPlay loop muted>
            <source src={videobg} type="video/mp4" />
        </video>
    </div>
  )
}

export default Zen