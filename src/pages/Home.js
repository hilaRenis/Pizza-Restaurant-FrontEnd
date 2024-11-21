import React, {useMemo, useState} from 'react';
import {PageLayout} from "../components/PageLayout";
import {toast} from "react-toastify";
import {MenuAPI} from "../api/MenuAPI";

export const Home = () => {
    // Retrieve the number of items in the cart from localStorage
    const cartItemCount = JSON.parse(localStorage.getItem('cartItems'))?.length || 0;

    const [pizzas, setPizzas] = useState([]);
    const [cartItems, setCartItems] = useState(cartItemCount);


    useMemo(async () => {
        const {data} = await MenuAPI.list();
        setPizzas(data.data)
    }, []);


    const addToCart = (product) => {
        // Retrieve the cart from localStorage
        let cart = localStorage.getItem('cartItems');
        cart = cart ? JSON.parse(cart) : [];

        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {
            // Update quantity or other properties if needed
            cart[existingProductIndex].quantity += 1;
            cart[existingProductIndex].subtotal = cart[existingProductIndex].quantity * cart[existingProductIndex].price;
        } else {
            // Add the new product to the cart
            product.quantity = 1;
            product.subtotal = product.quantity * product.price;
            cart.push(product);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cart));

        toast.success(`${product.article} added to cart!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setCartItems(cart.length);
    };

    return (
        <PageLayout cardItemsCount={cartItems}>

            {/* Hero Section */}
            <section className="h-full w-full">
                <div className="top-0 w-full h-full bg-center bg-cover"
                     style={{
                         backgroundImage: "url('/pizza-background.jpg')",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         height: "100%",
                         width: "100%"
                     }}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <h1 className="text-white font-semibold text-5xl">See Our Menu</h1>
                                <br/>
                                <a href="#pizza"
                                   className="mt-4 bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none">
                                    Explore
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pizza Listing Section */}
            {/* This is where you would map through your pizza data and display each pizza */}
            <section id="pizza" className="h-full w-full">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 pt-10 pb-10">Our Pizzas</h2>
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
                    {pizzas.map((pizza) => (
                        <div className="border rounded-lg overflow-hidden shadow-lg p-4" key={pizza.id}>
                            <img src="/pizza-background.jpg" alt={pizza.article}
                                 className="w-full h-48 object-cover mb-4"/>
                            <h2 className="text-xl font-bold mb-2">{pizza.article}</h2>
                            <p className="text-gray-700 mb-4">{pizza.description}</p>
                            <p className="font-bold mb-4">${pizza.price}</p>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => addToCart(pizza)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
};
