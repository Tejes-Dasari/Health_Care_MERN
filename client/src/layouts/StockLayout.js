import { Outlet, NavLink } from "react-router-dom"
import React from 'react'

function StockLayout() {
  return (
    <div className="home-layout">

      <nav>
        <NavLink to="add_stock">Add Stock</NavLink>
        <NavLink to="all_stocks">All Stocks</NavLink>
      </nav>

      <Outlet />

    </div>
  )
}

export default StockLayout