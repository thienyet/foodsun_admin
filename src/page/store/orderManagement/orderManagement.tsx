import React, { useState, useEffect } from "react";
import styles from "../orderManagement/orderManagement.module.scss";
import adminApi from "../../../api/adminApi";
import { AudioOutlined } from '@ant-design/icons';
import { DatePicker, Input } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Switch, Popconfirm, notification } from 'antd';
import axiosClient from "../../../api/axiosClient";
import axios from "axios";

const { Search } = Input;

const OrderManagement = () => {
    const [restauranst, setRestaurants] = useState<any>([]);
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
            title: 'Thời Gian',
            dataIndex: 'timestamp',
            key: 'timestamp'
        },
        {
            title: 'Phương Thức Thanh Toán',
            dataIndex: 'paymentMode',
            key: 'paymentMode',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (value: any, item: any, index: any) => (
                <p>{value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
            ),
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'deliveryAddress',
            key: 'deliveryAddress',
        },
        {
            title: '',
            dataIndex: 'orderStatus',
            key: 'id',
            render: (text: any, record: any) => (
                <Space size="middle">
                    {
                        record.orderStatus === "approved" ? <div>
                            <Popconfirm
                                title="Bạn có muốn thực hiện không?"
                                onConfirm={() => handleApprove(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >

                                <p style={{ marginTop: 10, cursor: "pointer", color: "#00BFFF" }}
                                >Preparing</p>
                            </Popconfirm>
                            <Popconfirm
                                title="Bạn có muốn thực hiện không?"
                                onConfirm={() => handleUnApprove(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >

                                <p style={{ marginTop: 10, cursor: "pointer", color: "#00BFFF" }}
                                >Cancelled</p>
                            </Popconfirm>
                        </div> : ""
                    }

                </Space>
            ),
        },
    ];

    //get toàn bộ data nhà hàng
    const fetchRestauranst = async (page: any, size: any) => {
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileRestaurant(email);
        console.log(dataUser.data.id);

        try {
            const pageformat = {
                page: page,
                size: size
            }
            const response = await adminApi.getOrdersByRestaurantId(dataUser.data.id, pageformat);
            console.log(response.data.content);
            setRestaurants(response.data.content);
            console.log(response);
        } catch (error) {
            throw error;
        }
    }

    const handleApprove = async (id: any) => {
        console.log("data" + id);
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileRestaurant(email);
        console.log(dataUser.data.id);
        try {
            const token = localStorage.getItem('token');
            axios.request({
                method: 'PUT',
                url: "http://localhost:8085/restaurants/" + dataUser.data.id + '/orders/' + id,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    orderStatus: "preparing",
                },

            }).then(response => {
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
                    fetchRestauranst(1, 1000);
                }
            }
            );
            fetchRestauranst(1, 1000);
        } catch (error) {
            throw error;
        }
    }

    const handleUnApprove = async (id: any) => {
        console.log("data" + id);
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileRestaurant(email);
        console.log(dataUser.data.id);
        try {
            // const params = {
            //     "orderStatus": "preparing",
            // }
            // await axiosClient.post("http://localhost:8085/restaurants/" + id + '/orders/' + orderId , formData,{
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            const token = localStorage.getItem('token');
            axios.request({
                method: 'PUT',
                url: "http://localhost:8085/restaurants/" + dataUser.data.id + '/orders/' + id,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    orderStatus: "cancelled",
                },

            }).then(response => {
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
                    fetchRestauranst(1, 1000);
                }
            }
            );
            fetchRestauranst(1, 1000);
        } catch (error) {
            throw error;
        }
    }

    const onChangeDate = async (date: any, dateString: any) => {
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileRestaurant(email);
        console.log(dataUser.data.id);

        if (dateString === '') {
            fetchRestauranst(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getOrdersByRestaurantIdAndDate(dataUser.data.id, dateString, pageformat);
                setRestaurants(response.data.content);
                console.log(response);
            } catch (error) {
                throw error;
            }
        }
    }

    useEffect(() => {
        fetchRestauranst(1, 1000);
    }, [])

    return (
        <div>
            <div id={styles.dialog}>
                <PageHeader
                    title=""
                    subTitle=""

                >
                    <DatePicker
                        placeholder="Chọn ngày tạo"
                        allowClear
                        onChange={onChangeDate}
                        style={{ width: 400, marginBottom: 10, marginLeft: 20 }}
                    />

                </PageHeader>
            </div>
            <div id={styles.container}>
                <Card title="Quản Lý Đặt Hàng" bordered={false} >
                    <Table columns={columns} dataSource={restauranst} pagination={{
                        onChange(current) {
                          setPage(current);
                        }
                      }}/>
                </Card>
            </div>
        </div>
    )
}

export default OrderManagement;