import React, { useState, useEffect } from "react";
import styles from "../registerRestaurant/registerRestaurant.module.scss";
import { DatePicker, Input } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Divider, Form, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, AimOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axiosClient from "../../../../api/axiosClient";

const { Search } = Input;

const RegisterDelivery = () => {

    const [delivery, setDelivery] = useState<any>([]);
    let history = useHistory();

    const onFinish = async (values: any) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var date = yyyy + "-" + mm + "-" + dd;

        console.log(values)
        try {
            const formatData = {
                "email": values.email,
                "name": values.username,
                "password": values.password,
                "phoneNo": values.phoneNo,
                "address": values.address,
                "createDate": date,
                "isBusy": false,
                "isActive": true,
            }
            await axiosClient.post("http://localhost:8085/foodsun/signup/deliveryguys", formatData)
                .then(response => {
                    if (response === undefined) {
                        notification["error"]({
                            message: "Thông báo",
                            description: "Đăng kí không thành công",

                        });
                    }
                    else {
                        notification["success"]({
                            message: "Thông báo",
                            description: "Đăng kí thành công",
                        });
                        setTimeout(function () {
                            history.push("/");
                        }, 1000);
                    }
                }
                );
        } catch (error) {
            throw error;
        }
    }
    return (
        <div>
            <div className={styles.imageBackground}>
                <div id={styles.wrapper} >
                    <Card id={styles.dialog} bordered={false} >
                        <Form
                            style={{ width: 400, marginBottom: 8 }}
                            name="normal_login"
                            className={styles.loginform}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item style={{ marginBottom: 3 }}>

                                <Divider style={{ marginBottom: 5, fontSize: 19 }} orientation="center">Food Good management</Divider>
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 16 }}>
                                <p className={styles.text}>Đăng Kí Tài Khoản Giao Hàng</p>
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tài khoản!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className={styles.siteformitemicon} />} placeholder="Tài khoản" />
                            </Form.Item >

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className={styles.siteformitemicon} />}
                                    type="password"
                                    placeholder="Mật khẩu"
                                />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập e-mail!',
                                    },
                                ]}
                            >
                                <Input prefix={<MailOutlined className={styles.siteformitemicon} />} placeholder="e-mail!" />
                            </Form.Item >

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="phoneNo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                ]}
                            >
                                <Input prefix={<PhoneOutlined className={styles.siteformitemicon} />} placeholder="Số điện thoại" />
                            </Form.Item >

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ!',
                                    },
                                ]}
                            >
                                <Input prefix={<AimOutlined className={styles.siteformitemicon} />} placeholder="Địa chỉ" />
                            </Form.Item >

                            <Form.Item style={{ marginBottom: 18 }}>
                                <Button className={styles.loginformbutton} type="primary" htmlType="submit"  >
                                    Đăng Kí
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default RegisterDelivery;