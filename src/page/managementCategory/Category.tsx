import React, { useState, useEffect } from "react";
import styles from "../customer/customer.module.scss";
import adminApi from "../../api/adminApi";
import { DatePicker, Input, Popconfirm } from 'antd';
import { Card, Table, Space, Select, Tag, PageHeader, Switch, notification, Row, Modal, Col, Spin, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axiosClient from "../../api/axiosClient";

const { TextArea } = Input;
const { Option } = Select;
const { Search } = Input;

const Caterogy = () => {

    const [customer, setCustomer] = useState<any>([]);
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
            title: 'Tên Danh Mục',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Mô Tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '',
            dataIndex: 'description',
            key: 'id',
            render: (id: any, description: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEdit(description)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có muốn thực hiện không?"
                        onConfirm={() => handleDelete(description)}
                        okText="Yes"
                        cancelText="No"
                    >

                        <Button type="primary" danger >Xóa</Button>
                    </Popconfirm>

                </Space>
            ),
        }
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const [loading, setLoading] = useState(true);

    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    //get toàn bộ data khách hàng
    const fetchCategory = async (page: any, size: any) => {
        try {
            const response = await adminApi.getAllCategory();
            setCustomer(response.data);
            console.log(response.data);
        } catch (error) {
            throw error;
        }
    }

    const onCreate = async (values: any) => {
        console.log(values)
        try {
            const formatData = {
                "name": values.name,
                "description": values.description,
                "isDelete": "false",
            }
            await axiosClient.post("http://localhost:8085/admins/categories/add", formatData)
                .then(response => {
                    if (response === undefined) {
                        notification["error"]({
                            message: "Thông báo",
                            description: "Tạo danh mục không thành công",

                        });
                    }
                    else {
                        notification["success"]({
                            message: "Thông báo",
                            description: "Tạo danh mục thành công",

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
            fetchCategory(1, 1000);
        }, 1000);
    }

    const handleEdit = async (values: any) => {
        try {
            form1.setFieldsValue(values);
            setLoading(false);
            setIsModalVisibleEdit(true);
        } catch (error) {
            throw error;
        }
    }

    const handleDelete = async (description: any) => {
        console.log(description.id);
        try {
            await axiosClient.put("http://localhost:8085/admins/categories/delete/" + description.id)
                .then(response => {
                    if (response === undefined) {
                        notification["error"]({
                            message: "Thông báo",
                            description: "Xóa không thành công",

                        });
                    }
                    else {
                        notification["success"]({
                            message: "Thông báo",
                            description: "Xóa thành công",

                        });
                    }
                }
                );
            fetchCategory(1, 1000);
        } catch (error) {
            throw error;
        }
    }

    const onUpdate = async (values: any) => {
        console.log(values)
        try {
            const formatData = {
                "name": values.name,
                "description": values.description,
            }
            await axiosClient.put("http://localhost:8085/admins/categories/edit/" + values.id, formatData)
                .then(response => {
                    if (response === undefined) {
                        notification["error"]({
                            message: "Thông báo",
                            description: "Cập nhật danh mục không thành công",

                        });
                    }
                    else {
                        notification["success"]({
                            message: "Thông báo",
                            description: "Cập nhật danh mục thành công",

                        });
                    }
                }
                );
        } catch (error) {
            throw error;
        }
        setTimeout(function () {
            setLoading(false);
            setIsModalVisibleEdit(false);
            fetchCategory(1, 1000);
        }, 1000);
    }

    const onSearchByName = async (value: string) => {
        console.log("input" + value);
        if (value === '') {
            fetchCategory(1, 1000);
        } else {
            try {
                const response = await adminApi.getAllCategoryByName(value);
                setCustomer(response.data);
                console.log(response.data);
            } catch (error) {
                throw error;
            }
            console.log(value);
        }
    }

    const showModal = () => {
        setIsModalVisible(true);
        setLoading(false);
    };

    const onCancel = () => {
        setIsModalVisible(false);
        setLoading(false);
    };

    const onCancelEdit = () => {
        setIsModalVisibleEdit(false);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategory(1, 1000);
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
                        <Modal title="Tạo Danh Mục" visible={isModalVisible}
                            onCancel={onCancel}
                            onOk={() => {
                                form
                                    .validateFields()
                                    .then((values) => {
                                        form.resetFields();
                                        onCreate(values)


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
                                        label="Tên danh mục"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên danh mục!',
                                            },
                                            {
                                                max: 255,
                                                message: "Vui lòng nhập dưới 255 ký tự",
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input placeholder="Danh mục" />
                                    </Form.Item>

                                    <Form.Item
                                        name="description"
                                        label="Mô tả ngắn"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mô tả ngắn!',
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <TextArea
                                            placeholder="Mô tả ngắn"
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                        />
                                    </Form.Item>

                                </Form>
                            </Spin>
                        </Modal>
                        <Modal title="Sửa Danh Mục" visible={isModalVisibleEdit}
                            onCancel={onCancelEdit}
                            onOk={() => {
                                form1
                                    .validateFields()
                                    .then((values) => {
                                        form.resetFields();
                                        onUpdate(values)
                                    })
                                    .catch((info) => {
                                        console.log('Validate Failed:', info);
                                    });
                            }}
                        >
                            <Spin spinning={loading}>
                                <Form
                                    form={form1}
                                    name="createRecruitment"
                                    layout="vertical"
                                    initialValues={{
                                        modifier: 'public',
                                    }}
                                    scrollToFirstError
                                >
                                    <Form.Item
                                        name="id"
                                        label="ID"
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input placeholder="ID" disabled={true} />
                                    </Form.Item>

                                    <Form.Item
                                        name="name"
                                        label="Tên danh mục"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên danh mục!',
                                            },
                                            {
                                                max: 255,
                                                message: "Vui lòng nhập dưới 255 ký tự",
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input placeholder="Danh mục" />
                                    </Form.Item>

                                    <Form.Item
                                        name="description"
                                        label="Mô tả ngắn"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mô tả ngắn!',
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <TextArea
                                            placeholder="Mô tả ngắn"
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                        />
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
                            style={{ width: 400, marginBottom: 10, marginTop: 20 }}
                        />
                    </Row>

                </PageHeader>
            </div>
            <div id={styles.container}>
                <Card title="Quản Lý Danh Mục" bordered={false} >
                    <Table columns={columns} dataSource={customer} pagination={{
                        onChange(current) {
                            setPage(current);
                        }
                    }} />
                </Card>
            </div>
        </div>
    )
}

export default Caterogy;