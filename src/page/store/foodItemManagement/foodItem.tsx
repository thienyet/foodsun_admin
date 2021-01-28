import React, { useState, useEffect } from "react";
import styles from "../foodItemManagement/foodItem.module.scss";
import adminApi from "../../../api/adminApi";
import { AudioOutlined } from '@ant-design/icons';
import { DatePicker, Input, Popconfirm } from 'antd';
import { Card, Table, Space, Tag, PageHeader, notification, Switch, Form, Row, Col, Spin, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axiosClient from "../../../api/axiosClient";

const { Search } = Input;
const { TextArea } = Input;

const FoodItem = () => {

    const [foodItem, setFoodItem] = useState<any>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const [isModalVisibleEditProduct, setIsModalVisibleEditProduct] = useState(false);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState<any>();

    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
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
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            width: '20%',
            render: (image: any) => <img style={{ width: 50, height: 40 }} src={image} />
        },
        {
            title: 'Tên Món',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (value: any, item: any, index: any) => (
                <p>{value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
            ),
        },
        {
            title: '',
            dataIndex: 'description',
            key: 'id',
            render: (id: any, description: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEdit(description)}>Sửa Ảnh</Button>
                    <Button type="primary" onClick={() => handleEditProduct(description)}>Sửa Sản Phẩm</Button>

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

    //get toàn bộ data nhà hàng
    const fetchFoodItem = async (page: any, size: any) => {
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileRestaurant(email);
        console.log(dataUser.data.id);

        try {
            const pageformat = {
                page: 1,
                size: 1000
            }
            const response = await adminApi.getFoodItemsByRestaurantId(dataUser.data.id, pageformat);
            console.log(response);
            setFoodItem(response.data.content);
            console.log(response);
        } catch (error) {
            throw error;
        }
    }

    const onSearchByName = async (value: string) => {
        console.log("input" + value);
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileRestaurant(email);
        console.log(dataUser.data.id);
        if (value === '') {
            fetchFoodItem(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getFoodItemsByName(value, pageformat, dataUser.data.id);
                setFoodItem(response.data.content);
                console.log(response);
            } catch (error) {
                throw error;
            }
            console.log(value);
        }
    }

    const onCreate = async (values: any) => {
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileRestaurant(email);
        console.log(dataUser.data.id);

        console.log(values)
        try {
            const jsonfy = {
                name: values.name,
                price: values.price,
                isDeleted: false
            }

            const formatData = {
                "file": values.image
            }
            var formData = new FormData();
            formData.append("file", image);
            formData.append("dto", JSON.stringify(jsonfy));
            await axiosClient.post("http://localhost:8085/restaurants/" + dataUser.data.id + "/fooditems/add", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: "Thông báo",
                        description: "Tạo món ăn không thành công",

                    });
                }
                else {
                    notification["success"]({
                        message: "Thông báo",
                        description: "Tạo món ăn thành công",

                    });
                }
            }
            );

            // await axiosClient.post("http://localhost:8085/upload", formatData)
            // .then(response => {
            //     if (response === undefined) {
            //         notification["error"]({
            //             message: "Thông báo",
            //             description: "Tạo món ăn không thành công",

            //         });
            //     }
            //     else {
            //         notification["success"]({
            //             message: "Thông báo",
            //             description: "Tạo món ăn thành công",

            //         });
            //     }
            // }
            // );
        } catch (error) {
            throw error;
        }
        setTimeout(function () {
            setLoading(false);
            setIsModalVisible(false);
            fetchFoodItem(1, 1000);
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

    const handleEditProduct = async (values: any) => {
        try {
            form2.setFieldsValue(values);
            setLoading(false);
            setIsModalVisibleEditProduct(true);
        } catch (error) {
            throw error;
        }
    }

    const handleDelete = async (description: any) => {
        console.log(description.id);
        try {
            await axiosClient.put("http://localhost:8085/restaurants/fooditems/delete/" + description.id)
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
            fetchFoodItem(1, 1000);
        } catch (error) {
            throw error;
        }
    }

    const handleChange = (event: any) => {
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    const onUpdateImage = async (values: any) => {
        console.log(values)
        try {
            const jsonfy = {
                name: values.name,
                price: values.price,
                isDeleted: false
            }
            var formData = new FormData();
            formData.append("file", image);
            //formData.append("dto", JSON.stringify(jsonfy));
            await axiosClient.put("http://localhost:8085/restaurants/fooditems/edit/image/" + values.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: "Thông báo",
                        description: "Cập nhật món ăn không thành công",

                    });
                }
                else {
                    notification["success"]({
                        message: "Thông báo",
                        description: "Cập nhật món ăn thành công",

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
            setIsModalVisibleEditProduct(false);
            fetchFoodItem(1, 1000);
        }, 1000);
    }

    const onUpdateData = async (values: any) => {
        console.log(values)
        try {
            const jsonfy = {
                name: values.name,
                price: values.price,
                isDeleted: false
            }
            await axiosClient.put("http://localhost:8085/restaurants/fooditems/edit/" + values.id, jsonfy,
            ).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: "Thông báo",
                        description: "Cập nhật món ăn không thành công",

                    });
                }
                else {
                    notification["success"]({
                        message: "Thông báo",
                        description: "Cập nhật món ăn thành công",

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
            setIsModalVisibleEditProduct(false);
            fetchFoodItem(1, 1000);
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

    const onCancelEdit = () => {
        setIsModalVisibleEdit(false);
        setIsModalVisibleEditProduct(false);
        setLoading(false);
    };

    useEffect(() => {
        fetchFoodItem(1, 1000);
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
                        <Modal title="Tạo Món Ăn" visible={isModalVisible}
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
                                        label="Tên Món Ăn"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên món ăn!',
                                            },
                                            {
                                                max: 255,
                                                message: "Vui lòng nhập dưới 255 ký tự",
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <TextArea
                                            placeholder="Tên Món Ăn"
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="price"
                                        label="Giá"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập giá!',
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input placeholder="Giá" />
                                    </Form.Item>

                                    <Form.Item
                                        name="image"
                                        label="Ảnh"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập ảnh!',
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <input type="file" onChange={handleChange}
                                            id="avatar" name="file"
                                            accept="image/png, image/jpeg" />
                                    </Form.Item>

                                </Form>
                            </Spin>
                        </Modal>
                        <Modal title="Sửa Món Ăn" visible={isModalVisibleEdit}
                            onCancel={onCancelEdit}
                            onOk={() => {
                                form1
                                    .validateFields()
                                    .then((values) => {
                                        form1.resetFields();
                                        onUpdateImage(values)
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

                                    {/* <Form.Item
                                        name="name"
                                        label="Tên Món Ăn"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên món ăn!',
                                            },
                                            {
                                                max: 255,
                                                message: "Vui lòng nhập dưới 255 ký tự",
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <TextArea
                                            placeholder="Tên Món Ăn"
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="price"
                                        label="Giá"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập giá!',
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input placeholder="Giá" />
                                    </Form.Item> */}

                                </Form>
                                <input type="file" onChange={handleChange}
                                    id="avatar" name="file"
                                    accept="image/png, image/jpeg" />
                            </Spin>
                        </Modal>
                        <Modal title="Sửa Món Ăn" visible={isModalVisibleEditProduct}
                            onCancel={onCancelEdit}
                            onOk={() => {
                                form2
                                    .validateFields()
                                    .then((values) => {
                                        form2.resetFields();
                                        onUpdateData(values)
                                    })
                                    .catch((info) => {
                                        console.log('Validate Failed:', info);
                                    });
                            }}
                        >
                            <Spin spinning={loading}>
                                <Form
                                    form={form2}
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
                                        label="Tên Món Ăn"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên món ăn!',
                                            },
                                            {
                                                max: 255,
                                                message: "Vui lòng nhập dưới 255 ký tự",
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <TextArea
                                            placeholder="Tên Món Ăn"
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="price"
                                        label="Giá"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập giá!',
                                            },
                                        ]}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <Input placeholder="Giá" />
                                    </Form.Item>

                                </Form>
                            </Spin>
                        </Modal>
                    </Row>
                    <Search
                        placeholder="Nhập tên món"
                        allowClear
                        onSearch={onSearchByName}
                        style={{ width: 400, marginBottom: 10, marginTop: 10 }}
                    />

                </PageHeader>
            </div>
            <div id={styles.container}>
                <Card title="Quản Lý Thực Đơn" bordered={false} >
                    <Table
                        style={{ color: "#FFFFFF" }}
                        columns={columns}
                        dataSource={foodItem}
                        pagination={{
                            onChange(current) {
                                setPage(current);
                            }
                        }} />
                </Card>
            </div>
        </div>
    )
}

export default FoodItem;