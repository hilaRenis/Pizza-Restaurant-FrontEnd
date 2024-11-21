import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CHECKOUT, CUSTOMER, getRoutePath, LOGIN} from "../constants/routes";

export const PageLayout = ({children, cardItemsCount}) => {
    const user = JSON.parse(localStorage.getItem("userData")) ?? null;
    const [cartItems, setCartItems] = useState(0);

    useEffect(() => {
        // Load cart items from localStorage
        const loadedCartItems = JSON.parse(localStorage.getItem('cartItems'))?.length || 0;
        setCartItems(loadedCartItems);
    }, []);

    return (
        <>
            <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to={"/"}>
                            <img src="/pizza-logo.png" alt="Logo" className="h-14 w-14 mr-2"/>
                            <span className="font-bold text-xl"></span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {!user && <Link to={LOGIN}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Login
                            </button>
                        </Link>
                        }

                        {user && <Link to={getRoutePath(CUSTOMER)}>{user.username}</Link>}

                        <div className="ml-4 relative">
                            <Link to={CHECKOUT}>
                                <img src="/cart-icon.png" alt="Cart" className="h-11 w-11"/>
                                <span
                                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                                {cardItemsCount ?? cartItems}
                            </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </>
    );
}