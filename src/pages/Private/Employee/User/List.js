import AccountLayout from "../../../../components/AccountLayout";
import React, {useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {UserAPI} from "../../../../api/UserAPI";
import DataTable from "datatables.net-dt";
import {Link} from "react-router-dom";
import {getRoutePath, USERS, USERS_CREATE} from "../../../../constants/routes";

export const List = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useMemo(async () => {
        if (users.length === 0) {
            const {data: {data}} = await UserAPI.list();
            await setUsers(data)
            setIsLoading(false)
        }
    }, [users]);

    useEffect(() => {
        if (!isLoading) new DataTable('#datatable')
    }, [users]);

    const handleDelete = async (user) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm(`Are you sure you want to delete ${user.fullName}?`);

        // If the user confirmed, call the onDelete function
        if (isConfirmed) {
            const response = await UserAPI.delete(user.id);
            if (response.status === 200) {
                toast.success(`${user.fullName} successfully deleted`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setUsers([]);
            }
        }
    };


    return (
        <AccountLayout>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Users</h2>
                <Link to={`${getRoutePath(USERS_CREATE)}`}>
                    <button className="bg-blue-500 py-2 px-4 rounded  text-white">Register new employee</button>
                </Link>
                <p>&nbsp;</p>
                <table className="min-w-full table-auto" id="datatable">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Username</th>
                        <th className="px-4 py-2">Full Name</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b">
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.username}</td>
                            <td className="px-4 py-2">{user.fullName}</td>
                            <td className="px-4 py-2">{user.role}</td>
                            <td className="px-4 py-2">
                                <Link to={`${getRoutePath(`${USERS}/${user.id}`)}`}>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Edit
                                    </button>
                                </Link>
                                &nbsp;
                                <button
                                    onClick={() => handleDelete(user)}
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
