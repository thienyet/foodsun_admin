import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined, SolutionOutlined, ProfileOutlined, DashboardOutlined,
  ProjectOutlined, HomeOutlined, IdcardOutlined, ReconciliationOutlined
} from '@ant-design/icons';

import styles from "../sidebar/sidebar.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import { parseJwt } from '../../../utils/common';

const { SubMenu } = Menu;
const { Sider } = Layout;

function Sidebar() {

  const history = useHistory();
  const location = useLocation();

  const [roles, setRoles] = useState<any>();

  const menuSidebarAdmin = [
    {
      key: "restaurant-management",
      title: "Quản Lý Nhà Hàng",
      link: "/restaurant-management",
      icon: <HomeOutlined />
    },
    {
      key: "customer",
      title: "Quản Lý Khách hàng",
      link: "/customer",
      icon: <SolutionOutlined />
    },
    {
      key: "delivery",
      title: "Quản Lý Vận chuyển",
      link: "/delivery",
      icon: <ProfileOutlined />
    },
    {
      key: "management-admin",
      title: "Quản Lý Admin",
      link: "/management-admin",
      icon: <UserOutlined />
    },
    {
      key: "management-category",
      title: "Quản Lý Danh Mục",
      link: "/management-category",
      icon: <IdcardOutlined />
    }
  ];

  const menuDeliveryGuys = [
    {
      key: "delivery-order",
      title: "Quản Lý Vận Chuyển",
      link: "/delivery-order",
      icon: <IdcardOutlined />
    }
  ];

  const menuRestaurant = [
    {
      key: "restaurant-order",
      title: "Quản Lý Đặt Hàng",
      link: "/restaurant-order",
      icon: <UserOutlined />
    },
    {
      key: "management-food",
      title: "Quản Lý Thực Đơn",
      link: "/management-food",
      icon: <IdcardOutlined />
    }
  ];


  const navigate = (link: string, key: string) => {
    history.push(link);
  }

  useEffect(() => {
    setRoles(localStorage.getItem("roles"));
  })

  return (
    <Sider
      className={'ant-layout-sider-trigger'}
      width={230}
      style={{
        position: "fixed",
        top: 60,
        height: '100%',
        left: 0,
        padding: 0,
        zIndex: 1,
        marginTop: 0,
        backgroundColor: "#FFFFFF",
        boxShadow: " 0 2px 4px 0 rgba(0,0,0,0.2)"
      }}
    >
      {roles === "ADMIN" ?
        <Menu mode="inline"
          selectedKeys={location.pathname.split("/")}
          defaultOpenKeys={['account']}
          style={{ height: '100%', borderRight: 0, backgroundColor: "#fafafa" }}>
          <Menu.Item
            icon={<DashboardOutlined />}
            key="dashboard"
            onClick={() => navigate("/dashboard", "dashboard")}>
            Bảng Điều Khiển
          </Menu.Item>
          <SubMenu key="sub1" icon={<HomeOutlined />} title="Quản Lý Nhà Hàng">
            <Menu.Item
              key="restaurant-management"
              onClick={() => navigate("/restaurant-management", "restaurant-management")}>
              Nhà Hàng Hoạt Động
            </Menu.Item>
            <Menu.Item
              key="restaurant-management-block"
              onClick={() => navigate("/restaurant-management-block", "restaurant-management-block")}>
              Nhà Hàng Không Hoạt Động
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<SolutionOutlined />} title="Quản Lý Khách hàng">
            <Menu.Item
              key="customer"
              onClick={() => navigate("/customer", "customer")}>
              Tài Khoản Hoạt Động
           </Menu.Item>
            <Menu.Item
              key="customer-block"
              onClick={() => navigate("/customer-block", "customer-block")}>
              Tài Khoản Không Hoạt Động
           </Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" icon={<UserOutlined />} title="Quản Lý Admin">
            <Menu.Item
              key="management-admin"
              onClick={() => navigate("/management-admin", "management-admin")}>
              Tài Khoản Hoạt Động
          </Menu.Item>
            <Menu.Item
              key="management-admin-block"
              onClick={() => navigate("/management-admin-block", "management-admin-block")}>
              Tài Khoản Không Hoạt Động
          </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<ReconciliationOutlined />} title="Quản Lý Vận chuyển">
            <Menu.Item
              key="delivery"
              onClick={() => navigate("/delivery", "delivery")}>
              Tài Khoản Hoạt Động
          </Menu.Item>
            <Menu.Item
              key="delivery-block"
              onClick={() => navigate("/delivery-block", "delivery-block")}>
              Tài Khoản Không Hoạt Động
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            icon={<IdcardOutlined />}
            key="management-category"
            onClick={() => navigate("/management-category", "management-category")}>
            Quản Lý Danh Mục
          </Menu.Item>
        </Menu>
        :

        roles === "RESTAURANT" ?
          <Menu mode="inline"
            selectedKeys={location.pathname.split("/")}
            defaultOpenKeys={['account']}
            style={{ height: '100%', borderRight: 0, backgroundColor: "#fafafa" }}>
            <Menu.Item
              icon={<DashboardOutlined />}
              key="dashboard"
              onClick={() => navigate("/dashboard", "dashboard")}>
              Bảng Điều Khiển
          </Menu.Item>
            <Menu.Item
              icon={<IdcardOutlined />}
              key="restaurant-order"
              onClick={() => navigate("/restaurant-order", "restaurant-order")}>
              Quản Lý Đặt Hàng
            </Menu.Item>
            <Menu.Item
              icon={<ProjectOutlined />}
              key="management-food"
              onClick={() => navigate("/management-food", "management-food")}>
              Quản Lý Thực Đơn
            </Menu.Item>
          </Menu>
          :
          <Menu mode="inline"
            selectedKeys={location.pathname.split("/")}
            defaultOpenKeys={['account']}
            style={{ height: '100%', borderRight: 0, backgroundColor: "#fafafa" }}>
            <Menu.Item
              icon={<DashboardOutlined />}
              key="dashboard"
              onClick={() => navigate("/dashboard", "dashboard")}>
              Bảng Điều Khiển
          </Menu.Item>
            <Menu.Item
              icon={<IdcardOutlined />}
              key="delivery-order"
              onClick={() => navigate("/delivery-order", "delivery-order")}>
              Quản Lý Vận Chuyển
            </Menu.Item>
          </Menu>
      }

    </Sider >
  );
}

export default Sidebar;