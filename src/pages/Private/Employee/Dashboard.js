import AccountLayout from "../../../components/AccountLayout";
import {useMemo, useState} from "react";
import {OrderAPI} from "../../../api/OrderAPI";
import AccordionItem from "../../../components/AccordionItem";

export const Dashboard = () => {
    const [orders, setOrders] = useState([]);

    useMemo(async () => {
        if (orders.length === 0) {
            const {data: {data}} = await OrderAPI.getAllOrder();
            setOrders(data);
        }
    }, [orders]);

    const handleStartOrder = async (order) => {
        await OrderAPI.changeStatus({status: "IN_PROGRESS"}, order.id);
        setOrders([])
    };

    const handleDeliverOrder = async (order) => {
        await OrderAPI.changeStatus({status: "DELIVERED"}, order.id);
        setOrders([])
    };

    return (
        <AccountLayout>
            <h1 className={"text-xl font-bold mb-2"}>All orders</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {orders.map((order) => {
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
                            <br/>
                            <p>
                                {order.status === "PLACED" && <button onClick={() => handleStartOrder(order)}
                                                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start</button>}
                                {order.status === "IN_PROGRESS" && <button onClick={() => handleDeliverOrder(order)}
                                                                           className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Deliver</button>}
                                {order.status === "DELIVERED" && <span className="text-emerald-500">DELIVERED</span>}
                            </p>
                        </div>
                    )
                })}
            </div>
        </AccountLayout>
    )
}