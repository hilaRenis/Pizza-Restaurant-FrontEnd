import React, {useEffect, useState} from 'react';
import {PageLayout} from "../components/PageLayout";
import {useForm} from "react-hook-form";
import {OrderAPI} from "../api/OrderAPI";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const CheckoutPage = () => {
    const token = localStorage.getItem('jwtToken');
    const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();


    const {register, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        // Load cart items from localStorage
        const loadedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (token && userData) {
            setIsAuthenticated(true);
        }

        setCartItems(loadedCartItems);
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const removeItem = (id) => {
        const newCartItems = cartItems.filter(item => item.id !== id);
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        setCartItems(newCartItems);
        calculateTotal();
    }

    const onSubmit = async ({address}) => {
        const orderRequest = {
            customerId: userData.id,
            items: cartItems,
            totalPrice: calculateTotal(),
            address: address,
        }
        try {
            const response = await OrderAPI.create(orderRequest);

            if (response.status === 201) {
                toast.success(`Order successfully created`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                localStorage.setItem("cartItems", JSON.stringify([]));

                navigate("/")
            }
        } catch (error) {
            const {response: {status, data}} = error;
            if (status === 401 && userData.role === "Employee") {
                alert("You are not allowed to place order as Employee!");
                return;
            }

            if (status !== 401) {
                console.log(data.error)
            }
        }
    };

    return (
        <PageLayout cardItemsCount={cartItems.length}>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4" style={{paddingTop: "8em"}}>
                {/* Product List Column */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                    {cartItems.length > 0 ? (
                        <>
                            <ul>
                                {cartItems.map((item, index) => (
                                    <li key={index} className="mb-2 flex justify-between">
                                        <span style={{width: "250px"}}>{item.article}</span>
                                        <span>{item.quantity} x ${item.price}</span>
                                        <span onClick={() => removeItem(item.id)}>Remove</span>
                                    </li>
                                ))}
                            </ul>
                            <hr/>
                            <p style={{textAlign: "right"}}>Total $ {calculateTotal()}</p>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {cartItems.length > 0 &&
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                        {isAuthenticated && (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                <>
                                 <textarea
                                     placeholder="Address"
                                     {...register("address", {required: true})}
                                     className="border p-2 w-full"
                                 ></textarea>
                                    <button type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Place Order
                                    </button>
                                </>

                            </form>
                        )}

                        {!isAuthenticated && <h3>Please login to place order</h3>}
                    </div>
                }
            </div>
        </PageLayout>

    );
};