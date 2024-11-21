import AccountLayout from "../../../components/AccountLayout";
import React, {useEffect, useMemo, useState} from "react";
import {OrderAPI} from "../../../api/OrderAPI";
import AccordionItem from "../../../components/AccordionItem";
import {webSocketService} from "../../../api/WebSocketService";
import {toast} from "react-toastify";

export const CustomerDashboard = () => {
    const [orders, setOrders] = useState(null);
    const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

    useMemo(async () => {
        if(orders === null){
            const {data: {data}} = await OrderAPI.getCustomerOrders();
            setOrders(data);
        }
    }, [orders]);

    useEffect(() => {
        setTimeout(() => {
            webSocketService.subscribe(`/user/${userData.username}/queue/notifications`, message => {
                toast.success(message.body, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setOrders(null);
            });
        }, 1000);
    }, []);

    return (
        <AccountLayout>
            <h1 className={"text-xl font-bold mb-2"}>My orders</h1>
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
                {orders !== null && orders.map((order) => {
                    return (<div className="border rounded-lg overflow-hidden shadow-lg p-4" key={order.id}>
                            <h2 className="text-xl font-bold mb-2">No. {order.id}</h2>
                            <p className="text-gray-700 mb-4">Status: {order.status}</p>
                            <p className="font-bold mb-4">Total: ${order.totalPrice}</p>
                            <p className="text-gray-700 mb-4">Address: {order.address}</p>
                            <div className="accordion" id="accordionExample">
                                <AccordionItem title="View Items">
                                    {order.items.map(item => <p key={item.id}
                                                                className="text-gray-700 mb-4">{item.article} {item.quantity} x {item.price} = {item.subtotal}</p>)}
                                </AccordionItem>
                            </div>
                        </div>
                    )
                })}
            </div>
        </AccountLayout>
    )
}