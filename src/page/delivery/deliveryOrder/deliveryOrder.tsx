import React, { useState, useEffect } from "react";
import styles from "../deliveryOrder/deliveryOrder.module.scss";
import adminApi from "../../../api/adminApi";
import { AudioOutlined } from '@ant-design/icons';
import { DatePicker, Input, notification } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Switch, Popconfirm } from 'antd';
import axios from "axios";

const { Search } = Input;

const Order = () => {

    const [deliveryOrderData, setDeliveryOrderData] = useState<any>([]);
    const [userData, setUserData] = useState<any>();
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
                        record.orderStatus === "preparing" ? <div>
                            <Popconfirm
                                title="Bạn có muốn thực hiện không?"
                                onConfirm={() => handleApprove(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >

                                <p style={{ marginTop: 10, cursor: "pointer", color: "#00BFFF" }}
                                >Picked up</p>
                            </Popconfirm>
                        </div> : record.orderStatus === "picked up" ?
                            <Popconfirm
                                title="Bạn có muốn thực hiện không?"
                                onConfirm={() => handleUnApprove(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >

                                <p style={{ marginTop: 10, cursor: "pointer", color: "#00BFFF" }}
                                >Delivered</p>
                            </Popconfirm> : ""
                    }

                </Space>
            ),
        },
    ];

    //get toàn bộ data nhà hàng
    const fetchDeliveryOrder = async (page: any, size: any) => {
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileDelivery(email);
        console.log(dataUser.data.id);
        setUserData(dataUser.data.id);

        try {
            const pageformat = {
                page: 1,
                size: 1000
            }
            const response = await adminApi.getOrdersByDeliveryId(dataUser.data.id, pageformat);
            console.log(response);
            setDeliveryOrderData(response.data.content);
            console.log(response);
        } catch (error) {
            throw error;
        }
    }

    const handleApprove = async (id: string) => {
        console.log("data" + id);
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileDelivery(email);
        console.log(dataUser.data.id);
        try {
            const token = localStorage.getItem('token');
            axios.request({
                method: 'PUT',
                url: "http://localhost:8085/deliveryguys/" + dataUser.data.id + '/orders/' + id,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    orderStatus: "picked up",
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
                    fetchDeliveryOrder(1, 1000);
                }
            }
            );
            fetchDeliveryOrder(1, 1000);
        } catch (error) {
            throw error;
        }
    }

    const handleUnApprove = async (id: string) => {
        console.log("data" + id);
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileDelivery(email);
        console.log(dataUser.data.id);
        try {
            const token = localStorage.getItem('token');
            axios.request({
                method: 'PUT',
                url: "http://localhost:8085/deliveryguys/" + dataUser.data.id + '/orders/' + id,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    orderStatus: "delivered",
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
                    fetchDeliveryOrder(1, 1000);
                }
            }
            );
            fetchDeliveryOrder(1, 1000);
        } catch (error) {
            throw error;
        }
    }

    const onSearchByAddress = async (value: string) => {
        console.log("input" + value);
        if (value === '') {
            fetchDeliveryOrder(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllRestaurantByAddress(value, pageformat);
                setDeliveryOrderData(response.data.content);
                console.log(response);
            } catch (error) {
                throw error;
            }
            console.log(value);
        }
    }

    const onChangeDate = async (date: any, dateString: any) => {
        let email = "leminh@gmail.com";
        const dataUser = await adminApi.getProfileDelivery(email);
        console.log(dataUser.data.id);
        setUserData(dataUser.data.id);

        if (dateString === '') {
            fetchDeliveryOrder(1, 1000);
        } else {
            try {
                const response = await adminApi.getOrdersByDeliveryIdAndDate(dataUser.data.id, dateString);
                setDeliveryOrderData(response.data.content);
                console.log(response);
            } catch (error) {
                throw error;
            }
        }
    }

    useEffect(() => {
        fetchDeliveryOrder(1, 1000);
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
                    <Table columns={columns} dataSource={deliveryOrderData} pagination={{
                        onChange(current) {
                          setPage(current);
                        }
                      }}/>
                </Card>
            </div>
        </div>
    )
}

export default Order;