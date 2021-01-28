import React, { useState } from 'react';
import authApi from "../../../api/authApi";
import styles from "../login/login.module.scss";
import { Form, Input, Button, Card, Divider, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  useHistory
} from "react-router-dom";
import logo from "../../../assets/image/logoMain.png";

const Login = () => {

  const [isLogin, setLogin] = useState(true);

  let history = useHistory();

  const onFinish = (values: any) => {
    authApi.login(values.username, values.password,)
      .then(function (response) {
        if (response === undefined) {
          console.log("error");
          setLogin(false);
        }
        else {
          const checkAuth = () => {
            if (localStorage.getItem('roles') !== null) {
              let roles = localStorage.getItem('roles');
              if (roles === "ADMIN")
                return 1;
              else if (roles === "DELIVERY")
                return 2;
              else if (roles === "RESTAURANT")
                return 3;
              else
                return 4;
            } else {
              return false;
            }
          }

          localStorage.setItem("email", values.username);
            history.push("/dashboard");
        }
      })
      .catch(error => {
        console.log("email or password error" + error)
      });
  }

  return (
    <div className={styles.imageBackground}>
      <div id={styles.wrapper} >
        <Card id={styles.dialog}>
          <Form
            style={{ width: 400, marginBottom: 8 }}
            name="normal_login"
            className={styles.loginform}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item style={{ marginBottom: 0 }}>
              <img className={styles.image} alt="" src={logo} />
            </Form.Item>
            <Form.Item style={{ marginBottom: 3 }}>

              <Divider style={{ marginBottom: 5, fontSize: 19 }} orientation="center">Food Good management</Divider>
            </Form.Item>
            <Form.Item style={{ marginBottom: 16 }}>
              <p className={styles.text}> Đăng nhập để vào hệ thống quản lý</p>
            </Form.Item>
            <>
              {isLogin === false ?
                <Form.Item style={{ marginBottom: 16 }}>
                  <Alert
                    message="Tài khoản hoặc mật khẩu sai"
                    type="error"
                    showIcon
                  />

                </Form.Item>
                : ""}
            </>
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
              style={{ marginBottom: 8 }}
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
            <Form.Item style={{ marginBottom: 15 }}>
              <a href="/main-register" className={styles.loginformforgot}>
                Đăng Kí
            </a>
            </Form.Item>

            <Form.Item style={{ marginBottom: 18 }}>
              <Button className={styles.loginformbutton} type="primary" htmlType="submit"  >
                Đăng nhập
          </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;



