import AccountLayout from "../../../../components/AccountLayout";
import ProductForm from "../../../../components/ProductForm";
import React from "react";
import {MenuAPI} from "../../../../api/MenuAPI";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {getRoutePath, MENU} from "../../../../constants/routes";

export const Create = () => {
    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        const response = await MenuAPI.create(data);
        if (response.status === 201) {
            const product = response.data.data;
            toast.success(`${product.article} successfully created`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            navigate(getRoutePath(MENU + "/" + product.id))
        }
    }

    return (
        <AccountLayout>
            <h2 className="text-2xl font-bold mb-4">Create new item</h2>
            <ProductForm onSubmit={handleSubmit}/>
        </AccountLayout>
    )
}