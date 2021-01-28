import { moveSyntheticComments } from "typescript";
import axiosClient from "./axiosClient";

const adminApi = {
    getAllRole: () => {
        const url = '/admins/allroles';
        return axiosClient.get(url);
    },

    //* Restaurant *//
    getAllRestaurant: (params: any) => {
        const url = '/admins/restaurants';
        return axiosClient.get(url, { params });
    },
    getAllRestaurantByCreateDate: (dateString: string, params: any) => {
        const url = '/admins/restaurants/createDate/' + dateString;
        console.log(url);
        return axiosClient.get(url, { params });
    },
    getAllRestaurantByAddress: (address: string, params: any) => {
        const url = "/admins/restaurants/address/" + address;
        console.log(url);
        return axiosClient.get(url, { params });
    },
    getAllRestaurantByName: (value: string, params: any) => {
        const url = "/admins/restaurants/name/" + value;
        console.log(url);
        return axiosClient.get(url, { params });
    },
    getAllRestaurantById: (id: string) => {
        const url = "/admins/restaurants/Id/" + id;
        console.log(url);
        return axiosClient.get(url);
    },
    ChangeStatus: (id: any) => {
        const url = '/admins/restaurants/changeStatus/' + id;
        return axiosClient.put(url);
    },
    getProfileRestaurant: (params: any) => {
        const url = '/restaurants/profile?email=' + params;
        return axiosClient.get(url);
    },
    getFoodItemsByRestaurantId: (id: string, params: any) => {
        const url = '/restaurants/' + id + '/fooditems';
        return axiosClient.get(url, { params });
    },
    getFoodItemsByName: (name: string, params: any, id: string) => {
        const url = '/restaurants/'+ id +'/fooditems/name/' + name;
        return axiosClient.get(url, { params });
    },
    getOrdersByRestaurantId: (restaurantId: string, params: any) => {
        const url = '/restaurants/' + restaurantId + '/orders';
        return axiosClient.get(url, { params });
    },
    getOrdersByRestaurantIdAndDate: (restaurantId: string, date: string, params: any) => {
        const url = '/restaurants/' + restaurantId + '/orders/date/' + date;
        return axiosClient.get(url, { params });
    },
    ChangeModifyOrderManagement: (id: any, orderId: any, params: any) => {
        const url = '/restaurants/' + id + '/orders/' + orderId;
        return axiosClient.put(url, { params });
    },

    //* Customer *//
    getAllCustomer: (params: any) => {
        const url = '/admins/customers';
        return axiosClient.get(url, { params });
    },
    getAllCustomerByCreateDate: (dateString: string, params: any) => {
        const url = '/admins/customers/createDate/' + dateString;
        return axiosClient.get(url, { params });
    },
    getAllCustomerByAddress: (address: any, params: any) => {
        const url = '/admins/customers/address/' + address;
        return axiosClient.get(url, { params });
    },
    getAllCustomerByName: (name: any, params: any) => {
        const url = '/admins/customers/name/' + name;
        return axiosClient.get(url, { params });
    },
    ChangeStatusCustomer: (id: any) => {
        const url = '/admins/customers/changeStatus/' + id;
        return axiosClient.put(url);
    },

    //* Delivery *//
    getAllDelivery: (params: any) => {
        const url = '/admins/deliveryguys';
        return axiosClient.get(url, { params });
    },
    GetDeliveryById: (id: any) => {
        const url = '/admins/deliveryguys/Id/' + id;
        return axiosClient.get(url);
    },
    getAllDeliveryByCreateDate: (dateString: string, params: any) => {
        const url = '/admins/deliveryguys/createDate/' + dateString;
        return axiosClient.get(url, { params });
    },
    getAllCostDelivery: (month: string, id: string) => {
        const url = '/deliveryguys/' + id + '/revenue/' + month;
        return axiosClient.get(url);
    },
    getAllDeliveryByAddress: (address: string, params: any) => {
        const url = '/admins/deliveryguys/address/' + address;
        return axiosClient.get(url, { params });
    },
    getAllDeliveryByName: (name: any, params: any) => {
        const url = '/admins/deliveryguys/name/' + name;
        return axiosClient.get(url, { params });
    },
    ChangeStatusDelivery: (id: any) => {
        const url = '/admins/deliveryguys/changeStatus/' + id;
        return axiosClient.put(url);
    },
    getProfileDelivery: (params: any) => {
        const url = '/deliveryguys/profile?email=' + params;
        return axiosClient.get(url);
    },
    getOrdersByDeliveryId: (id: any, params: any) => {
        const url = '/deliveryguys/' + id + '/orders';
        return axiosClient.get(url, {params});
    },
    getOrdersByDeliveryIdAndDate: (id: any, date: any) => {
        const url = '/deliveryguys/' + id + '/orders/date/' + date;
        return axiosClient.get(url);
    },
    getOrderById: (id: any, orderId: any) => {
        const url = '/deliveryguys/' + id + '/orders/' + orderId;
        return axiosClient.get(url);
    },
    getAllCostRestaurant: (month: string, id: string) => {
        const url = '/restaurants/' + id + '/revenue/' + month;
        return axiosClient.get(url);
    },
    ChangeModifyOrder: (id: any, orderId: any, params: any) => {
        const url = '/deliveryguys/' + id + '/orders/' + orderId;
        return axiosClient.put(url, { params });
    },

    //* Admin *//
    getAllAdmin: (params: any) => {
        const url = '/admins/admins';
        return axiosClient.get(url, { params });
    },
    getAdminById: (id: string, params: any) => {
        const url = '/admins/admins/id/' + id;
        return axiosClient.get(url, { params });
    },
    getAllCostAdmin: (month: string, id: string) => {
        const url = '/admins/revenue/' + month;
        return axiosClient.get(url);
    },
    getProfileAdmin: (params: any) => {
        const url = '/admins/profile?email=' + params;
        return axiosClient.get(url);
    },
    getAllAdminByName: (name: any, params: any) => {
        const url = '/admins/admins/name/' + name;
        return axiosClient.get(url, { params });
    },
    ChangeStatusAdmin: (id: any) => {
        const url = '/admins/admins/changeStatus/' + id;
        return axiosClient.put(url);
    },

    //* Category *//
    getAllCategory: () => {
        const url = '/categories';
        return axiosClient.get(url);
    },
    getCategoryById: (id: string, params: any) => {
        const url = '/admins/categories/Id/' + id;
        return axiosClient.get(url, { params });
    },
    getAllCategoryByName: (name: any) => {
        const url = '/admins/categories/name/' + name;
        return axiosClient.get(url);
    },
}

export default adminApi;