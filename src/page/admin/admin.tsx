import React, { useState, useEffect } from "react";
import styles from "../customer/customer.module.scss";
import adminApi from "../../api/adminApi";
import { DatePicker, Input, Popconfirm } from 'antd';
import {
    Card, Table, Space, Tag, Form, PageHeader, Switch,
    Select, Button, Modal, Spin, notification, Row, Col
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axiosClient from "../../api/axiosClient";

const { Option } = Select;
const { Search } = Input;

const Admin = () => {
    const [page, setPage] = useState<any>(1);

    
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'index',
            render: (value: any, item: any, index: any) => (
                (page - 1) * 10 + (index + 1)
            ),
        },
        {
            title: 'Họ Và Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNo',
            key: 'phoneNo',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createDate',
            key: 'createDate',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: any) => (
                <Space size="middle">
                    {
                        isActive === true ? <Tag color="geekblue" key={isActive}>
                            HOẠT ĐỘNG
                        </Tag> : <Tag color="green" key={isActive}>
                                KHÔNG HOẠT ĐỘNG
                        </Tag>
                    }

                </Space>
            ),
        },
        {
            title: '',
            dataIndex: 'isActive',
            key: 'id',
            render: (isActive: any, id: any) => (
                <Space size="middle">
                    {
                         isActive === true ?
                         <Popconfirm
                             title="Bạn có muốn thực hiện không?"
                             onConfirm={() => handleUnApprove(id.id)}
                             okText="Yes"
                             cancelText="No"
                         >

                             <a style={{ marginTop: 10, cursor: "pointer" }}
                             >Khóa</a>
                         </Popconfirm>
                         : ""
                    }

                </Space>
            ),
        },
    ];

    const [customer, setCustomer] = useState<any>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const [form] = Form.useForm();


    //get toàn bộ data khách hàng
    const fetchAdmin = async (page: any, size: any) => {
        try {
            const pageformat = {
                page: page,
                size: size
            }
            await adminApi.getAllAdmin(pageformat).then((temp) => {
                let a = temp.data;
                setCustomer(a.filter(function (res: any) {
                    return res.isActive === true;
                }));
            });
        } catch (error) {
            throw error;
        }
    }

    const handleApprove = async (id: string) => {
        try {
            await adminApi.ChangeStatusAdmin(id);
            fetchAdmin(1, 1000);
        } catch (error) {
            throw error;
        }
    }

    const handleUnApprove = async (id: string) => {
        try {
            await adminApi.ChangeStatusAdmin(id).then(response => {
                console.log(response)
                if (response === undefined) {
                    notification["error"]({
                        message: "Thông báo",
                        description: "Không thành công",

                    });
                }
                else {
                    notification["success"]({
                        message: "Thông báo",
                        description: "Thành công",
                    });
                }
            }
            );;
            fetchAdmin(1, 1000);
        } catch (error) {
            throw error;
        }
    }

    const onSearchByAddress = async (value: string) => {
        console.log("input" + value);
        if (value === '') {
            fetchAdmin(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllCustomerByAddress(value, pageformat);
                setCustomer(response.data.content);
                console.log(response);
            } catch (error) {
                throw error;
            }
            console.log(value);
        }
    }

    const onSearchByName = async (value: string) => {
        console.log("input" + value);
        if (value === '') {
            fetchAdmin(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllAdminByName(value, pageformat).then((temp) => {
                    let a = temp.data;
                    setCustomer(a.filter(function (res: any) {
                        return res.isActive === true;
                    }));
                });
            } catch (error) {
                throw error;
            }
            console.log(value);
        }
    }

    const onCreate = async (values: any) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var date = yyyy + "-" + mm + "-" + dd;
        console.log(date);
        console.log(values)
        try {
            const formatData = {
                "email": values.email,
                "name": values.name,
                "password": values.password,
                "phoneNo": values.phoneNo,
                "address": values.address,
                "isActive": values.isActive,
                "createDate": date,
            }
            await axiosClient.post("http://localhost:8085/admins/addnew", formatData)
                .then(response => {
                    if (response === undefined) {
                        notification["error"]({
                            message: "Thông báo",
                            description: "Tạo tài khoản không thành công",

                        });
                    }
                    else {
                        notification["success"]({
                            message: "Thông báo",
                            description: "Tạo tài khoản thành công",

                        });
                    }
                }
                );
        } catch (error) {
            throw error;
        }
        setTimeout(function () {
            setLoading(false);
            setIsModalVisible(false);
            fetchAdmin(1, 1000);
        }, 1000);
    }

    const showModal = () => {
        setIsModalVisible(true);
        setLoading(false);
    };

    const onCancel = () => {
        setIsModalVisible(false);
        setLoading(false);
    };

    useEffect(() => {
        fetchAdmin(1, 1000);
    }, [])

    return (
        <div>
            <div id={styles.dialog}>
                <PageHeader
                    title=""
                    subTitle=""

                >
                    <Row>
                        <Button icon={<PlusOutlined />} onClick={showModal} shape="round" size="middle" style={{ marginBottom: 5, backgroundColor: '#24a0ed', color: "#FFFFFF", marginRight: 20 }} >Thêm Mới</Button>
                        <Modal title="Tạo Tài Khoản Admin" visible={isModalVisible}
                            onCancel={onCancel}
                            onOk={() => {
                                form
                                    .validateFields()
                                    .then((values) => {
                                        form.resetFields();
                                        onCreate(values);
                                    })
                                    .catch((info) => {
                                        console.log('Validate Failed:', info);
                                    });
                            }}
                        >
                            <Spin spinning={loading}>
                                <Form
                                    form={form}
                                    name="createRecruitment"
                                    layout="vertical"
                                    initialValues={{
                                        modifier: 'public',
                                    }}
                                    scrollToFirstError
                                >
                                    <Form.Item
                                        name="name"
                                        label="Tên tài khoản"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên tài khoản!',
                                            },
                                            {
                                                max: 255,
                                                message: "Vui lòng nhập dưới 255 ký tự",
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input placeholder="Tài khoản" />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        label="Mật khẩu"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mật khẩu!',
                                            },
                                            {
                                                max: 255,
                                                message: "Vui lòng nhập dưới 255 ký tự",
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input.Password placeholder="Mật khẩu" />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        label="E-mail"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Dữ liệu vừa nhập không phải email!',
                                            },
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập email!!',
                                            },
                                            {
                                                max: 255,
                                                message: "Vui lòng nhập dưới 255 ký tự",
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>


                                    <Form.Item
                                        name="phoneNo"
                                        label="Số điện thoại"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số điện thoại!',
                                            },
                                            {
                                                max: 11,
                                                message: "Vui lòng nhập dưới 11 số",
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input placeholder="Số điện thoại" />
                                    </Form.Item>

                                    <Form.Item
                                        name="address"
                                        label="Địa chỉ"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập địa chỉ!',
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input placeholder="Địa chỉ" />
                                    </Form.Item>

                                    <Form.Item
                                        name="isActive"
                                        label="Trạng Thái"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập trạng thái!',
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Select placeholder="Trạng thái" style={{ width: '100%' }} >
                                            <Option value="true">Hoạt động</Option>
                                            <Option value="false">Không hoạt động</Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                            </Spin>
                        </Modal>
                    </Row>
                    <Row>
                        <Search
                            placeholder="Tìm kiếm theo tên"
                            allowClear
                            onSearch={onSearchByName}
                            style={{ width: 400, marginBottom: 10, marginTop: 15 }}
                        />
                    </Row>
                </PageHeader>
            </div>
            <div id={styles.container}>
                <Card title="Quản Lý Admin" bordered={false} >
                    <Table columns={columns} dataSource={customer} pagination={{
                        onChange(current) {
                          setPage(current);
                        }
                      }}/>
                </Card>
            </div>
        </div>
    )
}

export default Admin;