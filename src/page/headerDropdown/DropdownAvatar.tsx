import React, { useState, useEffect } from 'react';
import { Avatar, Dropdown, Row } from 'antd';
import { Menu } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import {
  useHistory
} from "react-router-dom";
import styles from '../headerDropdown/DropdownAvatar.module.scss';
import adminApi from "../../api/adminApi";

function DropdownAvatar() {

  let history = useHistory();

  const [userData, setUserData] = useState<any>([]);

  const Logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("email");
    history.push("/");
  }

  const handleRouter = (link: string) => {
    history.push(link);
  }

  useEffect(() => {
    let roles = localStorage.getItem("roles");
    let email = localStorage.getItem("email");
    if (roles === "ADMIN") {
      const getDataUser = async () => {
        const dataUser = await adminApi.getProfileAdmin(email);
        console.log(dataUser);
        setUserData(dataUser.data);
      }
      getDataUser();
    }
    else if (roles === "DELIVERY") {
      const getDataUser = async () => {
        const dataUser = await adminApi.getProfileDelivery(email);
        console.log(dataUser);
        setUserData(dataUser.data);
      }
      getDataUser();
    }
    else {
      const getDataUser = async () => {
        const dataUser = await adminApi.getProfileRestaurant(email);
        console.log(dataUser);
        setUserData(dataUser.data);
      }
      getDataUser();
    }


  }, [])

  const avatar = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} >
        <a target="_blank" rel="noopener noreferrer" onClick={() => handleRouter("/profile")}>
          Thông Tin Cá Nhân
        </a>
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />} >
        <a target="_blank" rel="noopener noreferrer" >
          Cài Đặt
        </a>
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={Logout}  >
        <a target="_blank" rel="noopener noreferrer" >
          Thoát
        </a>
      </Menu.Item>
    </Menu>
  );


  return (
    <Dropdown key="avatar" placement="bottomCenter" overlay={avatar} arrow>
      <Row
        style={{
          paddingLeft: 5, paddingRight: 5, cursor: 'pointer'
        }}
        className={styles.container}
      >
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }} className={styles.fixLine}>
          <div style={{ paddingRight: 10 }}>
            <Avatar
              style={{
                outline: 'none',
              }}
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            />
          </div>
          <p style={{ padding: 0, margin: 0, textTransform: 'capitalize' }} className={styles.fixLine} >
            {userData.name}
          </p>
        </div>
      </Row>
    </Dropdown>
  );
};

export default DropdownAvatar;