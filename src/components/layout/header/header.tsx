import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Dropdown, Menu, Badge, Row, Col } from 'antd';
import { TranslationOutlined, BellOutlined } from '@ant-design/icons';
import logo from "../../../assets/image/logo.jpg";
import styles from "../header/header.module.scss";
import DropdownAvatar from "../../../page/headerDropdown/DropdownAvatar";
import adminApi from "../../../api/adminApi";

const { Header } = Layout;
function Topbar() {

  return (
    <Header
      className={styles.header}
      style={{ background: "#FFFFF" }}
    > <div >
        <Row className={styles.header} style={{ background: "#FFFFFF", position: 'fixed', top: 0, left: 0, display: 'flex', width: '100%', padding: 0, zIndex: 2 }}>
          <Col span={10}>
            <div style={{ position: 'relative', display: 'flex', alignItems: "center", marginLeft: 8 }}>
              <Row
                justify="center"
              >
                <Col style={{ paddingLeft: 20 }}>
                  <a href="#">
                    <img alt="" className={styles.image} src={logo} />
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6} offset={8}>
            <div style={{ position: 'relative', display: 'flex', float: 'right', alignItems: "center", marginRight: 48 }}>
              <Row>
                {/* <span className={styles.container} style={{ marginRight: 15 }} >
                  <Badge count={15} style={{}}>
                    <Avatar style={{ backgroundColor: "#FFFFFF", marginLeft: 5, marginRight: 5, cursor: "pointer" }} icon={<BellOutlined style={{ fontSize: '18px', color: '#000000' }} />} />
                  </Badge>
                </span> */}
              </Row>
              <Row>
                <DropdownAvatar key="avatar" />
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Header >
  );
}

export default Topbar;