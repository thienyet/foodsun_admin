import React, { useState, useEffect } from "react";
import styles from "../foodManagement/restaurants.module.scss";
import adminApi from "../../../api/adminApi";
import { AudioOutlined } from '@ant-design/icons';
import { DatePicker, Input, notification } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Switch, Popconfirm } from 'antd';

const { Search } = Input;

const RestauranstManagement = () => {

    const [restaurants, setRestaurants] = useState<any>([]);
    const [data, setData] = useState<any>([]);
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

    //get toàn bộ data nhà hàng
    const fetchRestaurants = async (page: any, size: any) => {
        const call = async () => {
            try {
                const pageformat = {
                    page: page,
                    size: size
                }
                await adminApi.getAllRestaurant(pageformat).then((temp) => {
                    let a = temp.data.content;
                    setRestaurants(a.filter(function (res: any) {
                        return res.isActive === true;
                    }));
                });
            } catch (error) {
                throw error;
            }
        }
        call();
        setRestaurants(data);
    }

    const handleApprove = async (id: string) => {
        try {
            const response = await adminApi.ChangeStatus(id);
            fetchRestaurants(1, 1000);
            console.log(response);
        } catch (error) {
            throw error;
        }
    }

    const handleUnApprove = async (id: string) => {
        try {
            const response = await adminApi.ChangeStatus(id).then(response => {
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
            fetchRestaurants(1, 1000);
            console.log(response);
        } catch (error) {
            throw error;
        }
    }

    const onSearchByName = async (value: string) => {
        console.log("input" + value);
        if (value === '') {
            fetchRestaurants(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllRestaurantByName(value, pageformat).then((temp) => {
                    let a = temp.data.content;
                    setRestaurants(a.filter(function (res: any) {
                        return res.isActive === true;
                    }));
                });
            } catch (error) {
                throw error;
            }
            console.log(value);
        }
    }

    const onSearchByAddress = async (value: string) => {
        console.log("input" + value);
        if (value === '') {
            fetchRestaurants(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllRestaurantByAddress(value, pageformat).then((temp) => {
                    let a = temp.data.content;
                    setRestaurants(a.filter(function (res: any) {
                        return res.isActive === true;
                    }));
                });
            } catch (error) {
                throw error;
            }
            console.log(value);
        }
    }

    const onChangeDate = async (date: any, dateString: any) => {
        if (dateString === '') {
            fetchRestaurants(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllRestaurantByCreateDate(dateString, pageformat).then((temp) => {
                    let a = temp.data.content;
                    setRestaurants(a.filter(function (res: any) {
                        return res.isActive === true;
                    }));
                });
            } catch (error) {
                throw error;
            }
        }
    }

    useEffect(() => {
        fetchRestaurants(1, 1000);
    }, [])

    return (
        <div>
            <div id={styles.dialog}>
                <PageHeader
                    title=""
                    subTitle=""

                >
                    <Search
                        placeholder="Nhập tên nhà hàng"
                        allowClear
                        onSearch={onSearchByName}
                        style={{ width: 400, marginBottom: 10, marginRight: 20 }}
                    />

                    <Search
                        placeholder="Nhập địa chỉ để tìm kiếm"
                        allowClear
                        onSearch={onSearchByAddress}
                        style={{ width: 400, marginBottom: 10 }}
                    />

                    <DatePicker
                        placeholder="Chọn ngày tạo"
                        allowClear
                        onChange={onChangeDate}
                        style={{ width: 400, marginBottom: 10, marginLeft: 20 }}
                    />

                </PageHeader>
            </div>
            <div id={styles.container}>
                <Card title="Quản Lý Nhà Hàng" bordered={false} >
                    <Table
                        style={{ color: "#FFFFFF" }}
                        columns={columns}
                        dataSource={restaurants}
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

export default RestauranstManagement;