// import { Outlet, NavLink } from "react-router-dom"
// import React from 'react'

// function StockLayout() {
//   return (
//     <div className="home-layout">

//       <nav>
//         <NavLink to="add_stock">Add Stock</NavLink>
//         <NavLink to="all_stocks">All Stocks</NavLink>
//       </nav>

//       <Outlet />

//     </div>
//   )
// }

// export default StockLayout

import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import React from "react";

const { Content } = Layout;

function StockLayout() {
  return (
    <Layout style={{marginTop:"40px"}} className="home-layout">
        <Menu mode="horizontal" defaultSelectedKeys={[""]}>
          <Menu.Item key="add_stock">
            <NavLink to="add_stock">Add Stock</NavLink>
          </Menu.Item>
          <Menu.Item key="all_stocks">
            <NavLink to="all_stocks">All Stocks</NavLink>
          </Menu.Item>
        </Menu>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default StockLayout;
