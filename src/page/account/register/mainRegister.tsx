import React, { useState, useEffect } from "react";
import styles from "../register/mainRegister.module.scss";
import { DatePicker, Input } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Divider, Form, Button, notification, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, AimOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import delivery from "../../../assets/image/delivery.png";
import restaurant from "../../../assets/image/restaurant.jpg";

const { Search } = Input;

const MainRegister = () => {

    let history = useHistory();

    const handleRestaurant = async (values: any) => {
        history.push("/register-restaurant")
    }
    const handleDelivery = async (values: any) => {
        history.push("/register-delivery")
    }
    return (
        <div>
            <div className={styles.imageBackground}>
                <div id={styles.wrapper} >
                    <Card id={styles.dialog} bordered={false} >
                        <Divider style={{ marginBottom: 5, fontSize: 19 }} orientation="center">Food Good management</Divider>
                        <p className={styles.text}>Vui lòng lựa chọn tài khoản đăng kí</p>
                        <Row>
                            <Col span={12} onClick={handleRestaurant} style={{cursor: "pointer"}}>
                                <img src={restaurant} style={{width: 200, height: 200}}></img>
                                <p className={styles.text}>Tài khoản nhà hàng</p>
                            </Col>
                            <Col span={12} onClick={handleDelivery} style={{cursor: "pointer"}}>
                                <img src={delivery} style={{width: 200, height: 200}}></img>
                                <p className={styles.text}>Tài khoản giao hàng</p>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default MainRegister;