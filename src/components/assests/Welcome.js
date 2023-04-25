import React from 'react'
import SideBar from '../Sidebar/SideBar'
import logo from "./logo.png"
const Welcome = () => {
  return (
    <div>
      <SideBar />
     < div id="header">
          <img className="logo" src={logo} alt="" />
          <h5
            className="fs-3 fw-normal text-muted"
          >
            We love creative Business Ideas
          </h5>
        </div>
    </div>
  )
}

export default Welcome
