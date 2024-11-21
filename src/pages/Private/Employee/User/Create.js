import AccountLayout from "../../../../components/AccountLayout";
import React from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {getRoutePath, USERS} from "../../../../constants/routes";
import {UserAPI} from "../../../../api/UserAPI";
import UserForm from "../../../../components/UserForm";

export const Create = () => {
    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        try {
            const response = await UserAPI.create(data);
            if (response && response.status === 201) {
                const user = response.data.data;
                toast.success(`${user.fullName} successfully created`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                navigate(getRoutePath(`${USERS}/${user.id}`))
            }
        } catch (error) {
           const {response: {data}} = error;
           alert(Object.values(data).at(0))
        }
    }

    return (
        <AccountLayout>
            <h2 className="text-2xl font-bold mb-4">Create new item</h2>
            <UserForm onSubmit={handleSubmit}/>
        </AccountLayout>
    )
}