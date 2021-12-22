import React from 'react'
import { useSelector } from 'react-redux'
import { Switch } from 'react-router-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import AddFoodToMenu from './components/admin/AddFoodToMenu'
import Adduser from './components/admin/Adduser'
import Customers from './components/admin/Customers'
import EditFood from './components/admin/EditFood'
import Edituser from './components/admin/Edituser'
import Foods from './components/admin/Foods'
import Orders from './components/admin/Orders'
import Users from './components/admin/Users'
import AdminPage from './components/AdminPage'
import BasketPage from './components/BasketPage'
import CreateCustomer from './components/customer/CreateCustomer'
import EditCustomer from './components/customer/EditCustomer'
import CustomersPage from './components/CustomersPage'
import EditOrder from './components/EditOrder'
import Homepage from './components/Homepage'
import LoginPage from './components/LoginPage'
import Navbar from './components/Navbar'
import OrderSending from './components/OrderSending'
import OrdersPage from './components/OrdersPage'
import PageNotFound from './components/PageNotFound'
import SignupPage from './components/SignupPage'
import Userorders from './components/Userorders'

export default function App() {
    const userloged = useSelector(state => state.loginUserReducer.userLoged)
    
    return (
        <div>
            <BrowserRouter>
            <Navbar />
                <Switch>
                    <Route path="/" component={Homepage} exact />
                    <Route path="/basket" component={BasketPage} exact />
                    <Route path="/login" component={LoginPage} exact />
                    {
                        userloged && userloged.access === 'admin' && userloged.isActive === true && (
                            <Switch>
                                <Route path="/admin" component={AdminPage} exact />
                                <Route path="/admin/users" component={Users} exact />
                                <Route path="/admin/foods" component={Foods} exact />
                                <Route path="/admin/orders" component={Orders} exact />
                                <Route path="/admin/customers" component={Customers} exact />
                                <Route path="/admin/foods/addtomenu" component={AddFoodToMenu} exact />
                                <Route path="/admin/foods/edit/:id" component={EditFood} exact />
                                <Route path="/admin/users/adduser" component={Adduser} exact />
                                <Route path="/admin/users/edit/:id" component={Edituser} exact />
                                <Route path="/signup" component={SignupPage} exact />
                                <Route path="/orders" component={OrdersPage} exact />
                                <Route path="/userorder" component={Userorders} exact />
                                <Route path="/ordersending" component={OrderSending} exact />
                                <Route path="/customerspage" component={CustomersPage} exact />
                                <Route path="/customerspage/create" component={CreateCustomer} exact />
                                <Route path="/customerspage/edit/:id" component={EditCustomer} exact />
                                <Route path="/userorder/edit/:id" component={EditOrder} exact />
                                <Route component={PageNotFound} exact />
                            </Switch>
                        )
                    }
                    {
                        userloged && userloged.access !== 'admin' && userloged.isActive === true && (
                            <Switch>
                                <Route path="/userorder" component={Userorders} exact />
                                <Route path="/orders" component={OrdersPage} exact />
                                <Route path="/ordersending" component={OrderSending} exact />
                                <Route path="/customerspage" component={CustomersPage} exact />
                                <Route path="/customerspage/create" component={CreateCustomer} exact />
                                <Route path="/customerspage/edit/:id" component={EditCustomer} exact />
                                <Route path="/userorder/edit/:id" component={EditOrder} exact />
                                <Route component={PageNotFound} exact />
                            </Switch>
                        )
                    }
                    <Route component={PageNotFound} exact />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
