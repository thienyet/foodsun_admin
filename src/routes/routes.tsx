import React from "react";
import Footer from '../components/layout/footer/footer';
import Header from '../components/layout/header/header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Sidebar from '../components/layout/sidebar/sidebar';
import Login from "../page/account/login/login";
import RestaurantsManagement from "../page/store/foodManagement/restaurants";

import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

import { withRouter } from "react-router";

import { Layout } from 'antd';
import Customer from "../page/customer/customer";
import Delivery from "../page/delivery/delivery";
import Admin from "../page/admin/admin";
import Category from "../page/managementCategory/Category";
import DeliveryOrder from "../page/delivery/deliveryOrder/deliveryOrder";
import OrderManagement from "../page/store/orderManagement/orderManagement";
import FoodItem from "../page/store/foodItemManagement/foodItem";
import NotFound from "../components/layout/notFound/notFound";
import RegisterRestaurant from "../page/account/register/registerRestaurant/registerRestaurant";
import RegisterDelivery from "../page/account/register/registerDelivery/registerDelivery";
import MainRegister from "../page/account/register/mainRegister";
import Profile from "../page/profile/profile";
import RestaurantsBlock from "../page/store/foodManagementBlock/restaurantsBlock";
import CustomerBlock from "../page/customerBlock/customerBlock";
import AdminBlock from "../page/adminBlock/adminBlock";
import StatisticManagement from "../page/statistic/statistic";
import DeliveryBlock from "../page/deliveryBlock/deliveryBlock";

const { Content } = Layout;

// set timeout rendering component login


const RouterURL = withRouter(({ location }) => {

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


    const LoginContainer = () => (
        <div className="container">
            <PublicRoute exact path="/">
                <Login />
            </PublicRoute>
            <PublicRoute exact path="/register-restaurant">
                <RegisterRestaurant />
            </PublicRoute>
            <PublicRoute exact path="/register-delivery">
                <RegisterDelivery />
            </PublicRoute>
            <PublicRoute exact path="/main-register">
                <MainRegister />
            </PublicRoute>
        </div>
    )

    const DefaultContainer = () => (
        <div>
            {checkAuth() === 1 ?
                <div>
                    <Layout>
                        <Header />
                        <Layout >
                            <Sidebar />
                            <Layout>
                                <Content style={{ marginLeft: 230, width: 'calc(100% - 230px)' }}>
                                    <PrivateRoute exact path="/customer">
                                        <Customer />
                                    </PrivateRoute>
                                    <Route exact path="/customer-block">
                                        <CustomerBlock />
                                    </Route>
                                    <PrivateRoute exact path="/delivery">
                                        <Delivery />
                                    </PrivateRoute>
                                    <PrivateRoute exact path="/delivery-block">
                                        <DeliveryBlock />
                                    </PrivateRoute>
                                    <PrivateRoute exact path="/restaurant-management">
                                        <RestaurantsManagement />
                                    </PrivateRoute>
                                    <PrivateRoute exact path="/restaurant-management-block">
                                        <RestaurantsBlock />
                                    </PrivateRoute>
                                    <PrivateRoute exact path="/management-admin">
                                        <Admin />
                                    </PrivateRoute>
                                    <PrivateRoute exact path="/management-admin-block">
                                        <AdminBlock />
                                    </PrivateRoute>
                                    <PrivateRoute exact path="/management-category">
                                        <Category />
                                    </PrivateRoute>
                                    <PrivateRoute exact path="/profile">
                                        <Profile />
                                    </PrivateRoute>
                                    <PrivateRoute exact path="/dashboard">
                                        <StatisticManagement />
                                    </PrivateRoute>
                                </Content>
                                <Footer />
                            </Layout>
                        </Layout>
                    </Layout>
                </div>
                :
                checkAuth() === 2 ?
                    <div>
                        <Layout>
                            <Header />
                            <Layout >
                                <Sidebar />
                                <Layout>
                                    <Content style={{ marginLeft: 230, width: 'calc(100% - 230px)' }}>
                                        <PrivateRoute exact path="/delivery-order">
                                            <DeliveryOrder />
                                        </PrivateRoute>
                                        <PrivateRoute exact path="/profile">
                                            <Profile />
                                        </PrivateRoute>
                                        <PrivateRoute exact path="/dashboard">
                                            <StatisticManagement />
                                        </PrivateRoute>
                                    </Content>
                                    <Footer />
                                </Layout>
                            </Layout>
                        </Layout>
                    </div>
                    :
                    checkAuth() === 3 ?
                        <div>
                            <Layout>
                                <Header />
                                <Layout >
                                    <Sidebar />
                                    <Layout>
                                        <Content style={{ marginLeft: 230, width: 'calc(100% - 230px)' }}>
                                            <PrivateRoute exact path="/management-food">
                                                <FoodItem />
                                            </PrivateRoute>
                                            <PrivateRoute exact path="/restaurant-order">
                                                <OrderManagement />
                                            </PrivateRoute>
                                            <PrivateRoute exact path="/profile">
                                                <Profile />
                                            </PrivateRoute>
                                            <PrivateRoute exact path="/dashboard">
                                                <StatisticManagement />
                                            </PrivateRoute>
                                        </Content>
                                        <Footer />
                                    </Layout>
                                </Layout>
                            </Layout>
                        </div> :
                        <PrivateRoute exact path="/*">
                            <NotFound />
                        </PrivateRoute>
            }
        </div >
    )

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LoginContainer />
                    </Route>
                    <Route exact path="/customer">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/customer-block">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/delivery">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/management-admin">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/management-admin-block">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/management-category">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/restaurant-management">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/restaurant-management-block">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/restaurant-order">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/delivery-order">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/management-restaurant">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/management-order">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/register-restaurant">
                        <LoginContainer />
                    </Route>
                    <Route exact path="/management-food">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/register-delivery">
                        <RegisterDelivery />
                    </Route>
                    <Route exact path="/main-register">
                        <MainRegister />
                    </Route>
                    <Route exact path="/profile">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/dashboard">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/delivery-block">
                        <DefaultContainer />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
})

export default RouterURL;
