import React from 'react';
import {CUSTOMERS_LIST, getRoutePath, LOGIN, MENU, ORDERS, STATS, USERS} from "../constants/routes";

function logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('refreshToken');
    window.location.href = LOGIN;
}

const AccountLayout = ({children}) => {
    const user = JSON.parse(localStorage.getItem("userData")) ?? null;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-xl font-semibold">My Account</h1>
                {user &&
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Logout
                    </button>
                }

            </header>

            <div className="flex flex-1">
                <aside className="w-1/6 bg-blue-100 p-4">
                    <nav>
                        <ul>
                            {/* Sidebar links */}
                            <li className="mb-3">
                                <a href={"/"} className="text-blue-700 hover:text-blue-900">Home</a>
                            </li>
                            {user.role === "Employee" &&
                                <>
                                    <li className="mb-3">
                                        <a href={getRoutePath(ORDERS)}
                                           className="text-blue-700 hover:text-blue-900">Orders</a>
                                    </li>
                                    <li className="mb-3">
                                        <a href={getRoutePath(MENU)}
                                           className="text-blue-700 hover:text-blue-900">Menu</a>
                                    </li>
                                    <li className="mb-3">
                                        <a href={getRoutePath(CUSTOMERS_LIST)}
                                           className="text-blue-700 hover:text-blue-900">Customers</a>
                                    </li>
                                    <li className="mb-3">
                                        <a href={getRoutePath(USERS)}
                                           className="text-blue-700 hover:text-blue-900">Employees</a>
                                    </li>
                                    <li className="mb-3">
                                        <a href={getRoutePath(STATS)}
                                           className="text-blue-700 hover:text-blue-900">Reports</a>
                                    </li>
                                </>
                            }


                        </ul>

                    </nav>
                </aside>


                {/* Main Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>

            <footer className="bg-blue-600 text-white text-center py-4">
                <p>© 2023 My App. All rights reserved.</p>
            </footer>
        </div>
    )
        ;
};


export default AccountLayout;
