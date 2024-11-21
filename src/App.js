import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import CustomerRoute from "./components/CustomerRoute";
import {Dashboard} from "./pages/Private/Employee/Dashboard";
import {CustomerDashboard} from "./pages/Private/Customer/CustomerDashboard";
import React, {useEffect} from "react";
import {Login} from "./pages/Login";
import NotFound from "./pages/NotFound";
import {Register} from "./pages/Register";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CheckoutPage} from "./pages/Checkout";
import {
    ACCOUNT,
    CHECKOUT,
    CUSTOMER,
    CUSTOMERS_LIST,
    LOGIN,
    MENU,
    MENU_CREATE,
    MENU_EDIT,
    ORDERS,
    REGISTER,
    STATS,
    USERS,
    USERS_CREATE,
    USERS_EDIT
} from "./constants/routes";
import {List} from "./pages/Private/Employee/Menu/List";
import {List as UserList} from "./pages/Private/Employee/User/List";
import {List as CustomerList} from "./pages/Private/Employee/Customer/List";
import {Create as UserCreate} from "./pages/Private/Employee/User/Create";
import {Edit as UserEdit} from "./pages/Private/Employee/User/Edit";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import {Edit} from "./pages/Private/Employee/Menu/Edit";
import {Create} from "./pages/Private/Employee/Menu/Create";
import {webSocketService} from "./api/WebSocketService";
import {Stats} from "./pages/Private/Employee/Stats/Stats";

function App() {
    useEffect(() => {
        const onConnected = () => {
            console.log('WebSocket Connected');
        };

        const onDisconnected = () => {
            console.log('WebSocket Disconnected');
        };

        const onError = (error) => {
            console.error('WebSocket Error:', error);
        };

        webSocketService.connect(onConnected, onDisconnected, onError);

        return () => {
            webSocketService.disconnect();
        };
    }, []);


    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path={CHECKOUT} exact element={<CheckoutPage/>}/>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={REGISTER} element={<Register/>}/>

                <Route path={ACCOUNT}
                       element={
                           <PrivateRoute>
                               {/* Add other protected routes here */}

                               <Routes>
                                   <Route path={"/admin/*"} element={
                                       <AdminRoute>
                                           <Routes>
                                               <Route path={ORDERS} element={<Dashboard/>}/>
                                               <Route path={MENU} element={<List/>}/>
                                               <Route path={MENU_CREATE} element={<Create/>}/>
                                               <Route path={MENU_EDIT} element={<Edit/>}/>
                                               <Route path={USERS} element={<UserList/>}/>
                                               <Route path={USERS_EDIT} element={<UserEdit/>}/>
                                               <Route path={USERS_CREATE} element={<UserCreate/>}/>
                                               <Route path={CUSTOMERS_LIST} element={<CustomerList/>}/>
                                               <Route path={STATS} element={<Stats/>}/>
                                           </Routes>
                                       </AdminRoute>
                                   }/>

                                   <Route path={"/customer/*"} element={
                                       <CustomerRoute>
                                           <Routes>
                                               <Route path={CUSTOMER} element={<CustomerDashboard/>}/>
                                           </Routes>
                                       </CustomerRoute>
                                   }/>
                               </Routes>
                           </PrivateRoute>
                       }
                />

                <Route path="/*" element={<NotFound/>}/>
            </Routes>
            <ToastContainer/>
        </Router>
    );
}

export default App;
