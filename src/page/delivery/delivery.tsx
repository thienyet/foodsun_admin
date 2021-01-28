import React, { useState, useEffect } from "react";
import styles from "../customer/customer.module.scss";
import adminApi from "../../api/adminApi";
import { DatePicker, Input, notification, Popconfirm } from 'antd';
import { Card, Table, Space, Tag, PageHeader } from 'antd';
import axios from "axios";
import axiosClient from "../../api/axiosClient";

const { Search } = Input;



const Delivery = () => {

    const [delivery, setDelivery] = useState<any>([]);
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
            title: 'Tài Khoản',
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
            title: 'Trạng thái',
            dataIndex: 'isBusy',
            key: 'isBusy',
            render: (isBusy: any) => (
                <Space size="middle">
                    {
                        isBusy === true ? <Tag color="warning" key={isBusy}>
                            ĐANG BẬN
                    </Tag> : <Tag color="success" key={isBusy}>
                                KHÔNG BẬN
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
                    }

                </Space>
            ),
        },
    ];

    const handleUnApprove = async (id: string) => {
        console.log("data" + id);
        let email = localStorage.getItem("email");
        const dataUser = await adminApi.getProfileAdmin(email);
        console.log(dataUser.data.id);
        try {
            const token = localStorage.getItem('token');
            await axiosClient.put("http://localhost:8085/admins/deliveryguys/changeStatus/" + id).then(response => {
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
                    fetchRestauranst(1,1000);
                }
            }
            );
            fetchRestauranst(1, 1000);
        } catch (error) {
            throw error;
        }
    }


    //get toàn bộ data nhà hàng
    const fetchRestauranst = async (page: any, size: any) => {
        try {
            const pageformat = {
                page: page,
                size: size
            }
            await adminApi.getAllDelivery(pageformat).then((temp) => {
                console.log(temp);
                let a = temp.data.content;
                setDelivery(a.filter(function (res: any) {
                    return res.isActive === true;
                }));
            });;;
        } catch (error) {
            throw error;
        }
    }

    const onSearch = async (value: string) => {
        console.log("input" + value);
        if (value === '') {
            fetchRestauranst(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllCustomerByAddress(value, pageformat).then((temp) => {
                    console.log(temp);
                    let a = temp.data.content;
                    setDelivery(a.filter(function (res: any) {
                        return res.isActive === true;
                    }));
                });;;
            } catch (error) {
                throw error;
            }
            console.log(value);
        }
    }

    const onChangeDate = async (date: any, dateString: any) => {
        if (dateString === '') {
            fetchRestauranst(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllDeliveryByCreateDate(dateString, pageformat).then((temp) => {
                    console.log(temp);
                    let a = temp.data.content;
                    setDelivery(a.filter(function (res: any) {
                        return res.isActive === true;
                    }));
                });;;
            } catch (error) {
                throw error;
            }
        }
    }

    const onSearchByName = async (value: string) => {
        console.log("input" + value);
        if (value === '') {
            fetchRestauranst(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllDeliveryByName(value, pageformat).then((temp) => {
                    console.log(temp);
                    let a = temp.data.content;
                    setDelivery(a.filter(function (res: any) {
                        return res.isActive === true;
                    }));
                });;;
            } catch (error) {
                throw error;
            }
            console.log(value);
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
                    <Search
                        placeholder="Nhập tên người vận chuyển"
                        allowClear
                        onSearch={onSearchByName}
                        style={{ width: 400, marginBottom: 10, marginRight: 20 }}
                    />

                    <Search
                        placeholder="Nhập địa chỉ"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: 400, marginBottom: 10 }}
                    />

                    <DatePicker
                        placeholder="Chọn ngày tạo"
                        onChange={onChangeDate}
                        allowClear
                        style={{ width: 400, marginBottom: 10, marginLeft: 20 }}
                    />
                </PageHeader>
            </div>
            <div id={styles.container}>
                <Card title="Quản Lý Vận Chuyển" bordered={false} >
                    <Table columns={columns} dataSource={delivery} pagination={{
                        onChange(current) {
                            setPage(current);
                        }
                    }} />
                </Card>
            </div>
        </div>
    )
}

export default Delivery;