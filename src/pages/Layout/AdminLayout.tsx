import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  
  {icon:AppstoreOutlined,name:"Product",link:"/admin/products"},
  {icon:ShopOutlined,name:"Category",link:"/admin/categorys"},
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.name,
  link: item.link
}));


const AdminLayout = (props: any) => {
   const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}>
          <span style={{display:"block",paddingTop:5,color:"white"}}>Admin</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {items.map((item:any) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ width: 2000,marginLeft:200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{  overflow: 'initial' }}>
          <div style={{ padding: 24,textAlign: 'center', background: colorBgContainer }}>
              <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout