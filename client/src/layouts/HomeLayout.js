import { Layout, Menu } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';

const { Content } = Layout;

function HomeLayout() {
  return (
    <Layout style={{marginTop:"40px"}} className="home-layout">
        <Menu mode="horizontal" defaultSelectedKeys={['']}>
          <Menu.Item key="1">
            <NavLink to="add_record">Add Record</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="all_records">All Records</NavLink>
          </Menu.Item>
        </Menu>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default HomeLayout;