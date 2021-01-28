import React, { useState, useEffect } from "react";
import styles from "../statistic/statistic.module.scss";
import { Typography, Row, Col, Card, Statistic, Progress, Table, Space, Tag, Popconfirm, DatePicker } from 'antd';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart } from 'recharts';
import adminApi from "../../api/adminApi";
import axiosClient from "../../api/axiosClient";
import { DateTime } from "../../utils/dateTime";

const { Title } = Typography;


function StatisticManagement() {

    const [dataStatic, setDataStatic] = useState<any>([]);
    const [dataStaticAdmin, setDataStaticAdmin] = useState<any>([]);
    const [accountManagement, setAccountManagement] = useState<any>([]);
    const [accountDelivery, setAccountDelivery] = useState<any>([]);
    const [accountRestaurant, setAccountRestaurant] = useState<any>([]);
    const [foodItem, setFoodItem] = useState<any>([]);
    const [page, setPage] = useState<any>(1);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'index',
            render: (value: any, item: any, index: any) => (
                index + 1
            ),
        },
        {
            title: 'Tên Nhà Hàng',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNo',
            key: 'phoneNo',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const columns1 = [
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
        }
    ];

    //get toàn bộ data nhà hàng
    const fetchFoodItem = async (page: any, size: any) => {
        if (checkAuth() == 3) {
            let email = localStorage.getItem("email");
            const dataUser = await adminApi.getProfileRestaurant(email);
            console.log(dataUser.data.id);

            try {
                const pageformat = {
                    page: 1,
                    size: 3
                }
                const response = await adminApi.getFoodItemsByRestaurantId(dataUser.data.id, pageformat);
                console.log(response);
                setFoodItem(response.data.content);
                console.log(response);
            } catch (error) {
                throw error;
            }
        }
    }

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

    //get toàn bộ data nhà hàng
    const fetchRestaurants = async (page: any, size: any) => {

        if (checkAuth() == 1) {
            try {
                const pageformat = {
                    page: 1,
                    size: 5
                }
                await adminApi.getAllRestaurant(pageformat).then((temp) => {
                    console.log(temp)
                    let a = temp.data.content;
                    setDataStatic(a);
                });

                await adminApi.getAllRestaurant(pageformat).then((temp) => {
                    console.log(temp)
                    let a = temp.data.content;
                    setAccountRestaurant(temp.data.totalElements);
                });

                await adminApi.getAllAdmin(pageformat).then((temp) => {
                    console.log(temp)
                    let a = temp.data.content;
                    setAccountManagement(temp.data);
                });

                await adminApi.getAllDelivery(pageformat).then((temp) => {
                    console.log(temp)
                    let a = temp.data.content;
                    setAccountDelivery(temp.data.totalElements);
                });

            } catch (error) {
                throw error;
            }
        }
    }

    const onChangeDate = async (date: any, dateString: any) => {
        const DATE_TIME_FORMAT = "M";
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileAdmin(email);
        console.log(dataUser.data.id);
        if (dateString === '') {
            fetchRestaurants(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllCostAdmin(DateTime(dateString, DATE_TIME_FORMAT), dataUser.data.id);
                setDataStaticAdmin(response.data);
                console.log(response);
            } catch (error) {
                throw error;
            }
        }
    }

    const onChangeDateDelivery = async (date: any, dateString: any) => {
        const DATE_TIME_FORMAT = "M";
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileDelivery(email);
        console.log(dataUser.data.id);
        if (dateString === '') {
            fetchRestaurants(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllCostDelivery(DateTime(dateString, DATE_TIME_FORMAT), dataUser.data.id);
                setDataStaticAdmin(response.data);
                console.log(response);
            } catch (error) {
                throw error;
            }
        }
    }

    const onChangeDateRestaurant = async (date: any, dateString: any) => {
        const DATE_TIME_FORMAT = "M";
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileRestaurant(email);
        console.log(dataUser.data.id);
        if (dateString === '') {
            fetchRestaurants(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllCostRestaurant(DateTime(dateString, DATE_TIME_FORMAT), dataUser.data.id);
                setDataStaticAdmin(response.data);
                console.log(response);
            } catch (error) {
                throw error;
            }
        }
    }

    const data = [
        {
            name: 'The Sécond Coffee', tổng: 4000, pv: 2400, amt: 2400,
        },
        {
            name: 'Phở Bò Đức Luân', tổng: 3000, pv: 1398, amt: 2210,
        },
        {
            name: 'King Mushroom', tổng: 2000, pv: 9800, amt: 2290,
        },
        {
            name: 'HN Dimsum', tổng: 2780, pv: 3908, amt: 2000,
        },
        {
            name: 'Thịt Xiên Nướng', tổng: 1890, pv: 4800, amt: 2181,
        },
        {
            name: 'Xôi Xá Xíu', tổng: 2390, pv: 3800, amt: 2500,
        },
        {
            name: 'Bún Ốc & Bún Cá', tổng: 3490, pv: 4300, amt: 2100,
        },
    ];

    useEffect(() => {
        fetchRestaurants(1, 5);
        fetchFoodItem(1, 3);
    }, [])

    return (
        <div>
            <div className={styles.container}>
                {checkAuth() == 1 ?
                    <div className={styles.siteCardWrapper}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card title="TÀI KHOẢN QUẢN LÝ" bordered={false}>
                                    <Statistic value={accountManagement.length} />
                                    <Progress
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        showInfo={false}
                                        percent={accountManagement.length}
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="TÀI KHOẢN NHÀ HÀNG" bordered={false}>
                                    <Statistic value={accountRestaurant} />
                                    <Progress
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        showInfo={false}
                                        percent={accountRestaurant}
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="TÀI KHOẢN GIAO HÀNG" bordered={false}>
                                    <Statistic value={accountDelivery} />
                                    <Progress
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        showInfo={false}
                                        percent={accountDelivery}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div> : ""}
            </div>
            {checkAuth() == 1 ?
                <div className={styles.container}>
                    <Title level={5} id={styles.dialog} style={{ fontSize: 16, fontWeight: 500 }}>THỐNG KÊ</Title>
                    <Row>
                        <Col span={12} style={{ paddingTop: 30 }}>
                            <p style={{ fontSize: 16, fontWeight: 500, marginRight: 140 }}>Thống Kê Top Nhà Hàng Có Doanh Thu Cao Nhất </p>
                            <BarChart width={600} height={300} data={data}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="tổng" fill="#8884d8" background={{ fill: '#eee' }} />
                            </BarChart>
                        </Col>
                        <Col span={12}>
                            <Card title="Top Nhà Hàng Tốt Nhất" bordered={false} >
                                <Table
                                    columns={columns}
                                    dataSource={dataStatic}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div> : checkAuth() == 3 ? <div className={styles.container}>
                    <Title level={5} id={styles.dialog}>THỐNG KÊ</Title>
                    <Row>
                        <Col span={12} style={{ paddingTop: 30 }}>
                            <Title level={5} id={styles.dialog}>THỐNG KÊ DOANH THU</Title>
                            <DatePicker
                                placeholder="Chọn tháng"
                                onChange={onChangeDateRestaurant}
                                allowClear
                                picker="month"
                                style={{ width: 400, marginBottom: 10, marginRight: 20 }}
                            />
                            <Row justify="center">
                                <Card title="DOANH THU" bordered={true}>
                                    <Statistic value={dataStaticAdmin} />
                                    <Progress
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        showInfo={false}
                                        percent={dataStaticAdmin}
                                    />
                                </Card>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Card title="Top Món Ăn Bán Chạy" bordered={false} >
                                <Table
                                    style={{ color: "#FFFFFF" }}
                                    columns={columns1}
                                    dataSource={foodItem}
                                    pagination={{
                                        onChange(current) {
                                            setPage(current);
                                        }
                                    }} />
                            </Card>
                        </Col>
                    </Row>
                </div> : ""}
            {checkAuth() == 1 ?
                <div className={styles.container} style={{ textAlign: "center" }}>
                    <Title level={5} id={styles.dialog}>THỐNG KÊ DOANH THU</Title>
                    <DatePicker
                        placeholder="Chọn tháng"
                        onChange={onChangeDate}
                        allowClear
                        picker="month"
                        style={{ width: 400, marginBottom: 10, marginRight: 20 }}
                    />
                    <Row justify="center">
                        <Card title="DOANH THU" bordered={false}>
                            <Statistic value={dataStaticAdmin} />
                            <Progress
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                                showInfo={false}
                                percent={dataStaticAdmin}
                            />
                        </Card>
                    </Row>
                </div> : checkAuth() == 2 ? <div className={styles.container} style={{ textAlign: "center" }}>
                    <Title level={5} id={styles.dialog}>THỐNG KÊ DOANH THU</Title>
                    <DatePicker
                        placeholder="Chọn tháng"
                        onChange={onChangeDateDelivery}
                        allowClear
                        picker="month"
                        style={{ width: 400, marginBottom: 10, marginRight: 20 }}
                    />
                    <Row justify="center">
                        <Card title="DOANH THU" bordered={false}>
                            <Statistic value={dataStaticAdmin} />
                            <Progress
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                                showInfo={false}
                                percent={dataStaticAdmin}
                            />
                        </Card>
                    </Row>
                </div> : ""}
        </div>

    )
}

export default StatisticManagement;