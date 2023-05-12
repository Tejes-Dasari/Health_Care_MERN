import { Outlet, NavLink } from "react-router-dom"
import React from 'react'

function HomeLayout() {
  return (
    <div className="home-layout">

      <nav>
        <NavLink to="add_record">Add Record</NavLink>
        <NavLink to="all_records">All Records</NavLink>
      </nav>

      <Outlet />

    </div>
  )
}

export default HomeLayout