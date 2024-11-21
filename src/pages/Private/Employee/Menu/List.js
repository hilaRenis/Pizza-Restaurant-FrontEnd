import AccountLayout from "../../../../components/AccountLayout";
import React, {useEffect, useMemo, useState} from "react";
import {MenuAPI} from "../../../../api/MenuAPI";
import {Link} from "react-router-dom";
import {getRoutePath, MENU, MENU_CREATE} from "../../../../constants/routes";
import {toast} from "react-toastify";
import DataTable from 'datatables.net-dt';

export const List = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useMemo(async () => {
        if (products.length === 0) {
            const {data} = await MenuAPI.list();
            await setProducts(data.data)
            setIsLoading(false)
        }
    }, [products]);

    useEffect(() => {
        if (!isLoading) new DataTable('#datatable')
    }, [products]);
    const handleDelete = async (product) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm(`Are you sure you want to delete ${product.article}?`);

        // If the user confirmed, call the onDelete function
        if (isConfirmed) {
            const response = await MenuAPI.delete(product.id);
            if (response.status === 200) {
                toast.success(`${product.article} successfully deleted`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setProducts([]);
            }

        }
    };

    return (
        <AccountLayout>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Menu</h2>
                <Link to={`${getRoutePath(MENU_CREATE)}`}>
                    <button className="bg-blue-500 py-2 px-4 rounded  text-white">Create a new item</button>
                </Link>
                <p>&nbsp;</p>
                <table className="min-w-full table-auto" id="datatable">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="border-b">
                            <td className="px-4 py-2">{product.id}</td>
                            <td className="px-4 py-2">{product.article}</td>
                            <td className="px-4 py-2">{product.description}</td>
                            <td className="px-4 py-2">${product.price}</td>
                            <td className="px-4 py-2">
                                <Link to={`${getRoutePath(MENU + "/" + product.id)}`}>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Edit
                                    </button>
                                </Link>
                                &nbsp;
                                <button
                                    onClick={() => handleDelete(product)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AccountLayout>
    )
}