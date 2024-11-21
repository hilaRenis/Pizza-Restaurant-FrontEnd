import AccountLayout from "../../../../components/AccountLayout";
import {useParams} from 'react-router-dom';
import React, {useMemo, useState} from "react";
import {toast} from "react-toastify";
import {UserAPI} from "../../../../api/UserAPI";
import UserForm from "../../../../components/UserForm";

export const Edit = () => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useMemo(async () => {
        const {data} = await UserAPI.get(id);
        setUser(data.data)
        setLoading(false)
    }, []);

    const handleSubmit = async (data) => {
        const response = await UserAPI.update(data, id);
        if (response.status === 202) {
            toast.success(`${response.data.data.fullName} successfully updated`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <AccountLayout>
            {!isLoading &&
                <>
                    <h2 className="text-2xl font-bold mb-4">Edit {user.fullName}</h2>
                    <UserForm defaultValues={user} onSubmit={handleSubmit}/>
                </>
            }
        </AccountLayout>
    )
}