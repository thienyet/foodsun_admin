import React, { useState, useEffect } from "react";
import styles from "../customer/customer.module.scss";
import adminApi from "../../api/adminApi";
import { DatePicker, Input, notification, Popconfirm } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Switch } from 'antd';

const { Search } = Input;

const Customer = () => {

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



    //get toàn bộ data khách hàng
    const fetchCustomer = async (page: any, size: any) => {
        try {
            const pageformat = {
                page: page,
                size: size
            }
            await adminApi.getAllCustomer(pageformat).then((temp) => {
                let a = temp.data.content;
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
            const response = await adminApi.ChangeStatusCustomer(id);
            fetchCustomer(1, 1000);
        } catch (error) {
            throw error;
        }
    }

    const handleUnApprove = async (id: string) => {
        try {
            const response = await adminApi.ChangeStatusCustomer(id).then(response => {
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
            fetchCustomer(1, 1000);
        } catch (error) {
            throw error;
        }
    }

    const onSearchByAddress = async (value: string) => {
        console.log("input" + value);
        if (value === '') {
            fetchCustomer(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllCustomerByAddress(value, pageformat).then((temp) => {
                    let a = temp.data.content;
                    setCustomer(a.filter(function (res: any) {
                        return res.isActive === true;
                    }))});
            } catch (error) {
                throw error;
            }
            console.log(value);
        }
    }

    const onSearchByName = async (value: string) => {
        console.log("input" + value);
        if (value === '') {
            fetchCustomer(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllCustomerByName(value, pageformat).then((temp) => {
                    let a = temp.data.content;
                    setCustomer(a.filter(function (res: any) {
                        return res.isActive === true;
                    }))});
            } catch (error) {
                throw error;
            }
            console.log(value);
        }
    }

    const onChangeDate = async (date: any, dateString: any) => {
        if (dateString === '') {
            fetchCustomer(1, 1000);
        } else {
            try {
                const pageformat = {
                    page: 1,
                    size: 1000
                }
                const response = await adminApi.getAllCustomerByCreateDate(dateString, pageformat).then((temp) => {
                    let a = temp.data.content;
                    setCustomer(a.filter(function (res: any) {
                        return res.isActive === true;
                    }))});
            } catch (error) {
                throw error;
            }
        }
    }

    useEffect(() => {
        fetchCustomer(1, 1000);
    }, [])

    return (
        <div>
            <div id={styles.dialog}>
                <PageHeader
                    title=""
                    subTitle=""

                >
                    <Search
                        placeholder="Tìm kiếm theo tên"
                        allowClear
                        onSearch={onSearchByName}
                        style={{ width: 400, marginBottom: 10 }}
                    />

                    <Search
                        placeholder="Tìm kiếm theo địa chỉ"
                        allowClear
                        onSearch={onSearchByAddress}
                        style={{ width: 400, marginBottom: 10, marginLeft: 20 }}
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
                <Card title="Quản Lý Khách Hàng" bordered={false} >
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

export default Customer;