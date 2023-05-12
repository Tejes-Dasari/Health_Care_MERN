import React from 'react'
import { NavLink } from "react-router-dom";

function RootLayout() {
  return (
    <div className="root-layout">
    <header>
      <nav>
        <NavLink to="records">Records</NavLink>
        <NavLink to="stock">Stock Update</NavLink>
        <NavLink to="icepack_record">Icepack Record</NavLink>
        <NavLink to="Profile">Profile</NavLink>
      </nav>
    </header>
  </div>
  )
}

export default RootLayout