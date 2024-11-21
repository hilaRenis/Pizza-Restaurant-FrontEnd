import AccountLayout from "../../../../components/AccountLayout";
import {useParams} from 'react-router-dom';
import React, {useMemo, useState} from "react";
import {MenuAPI} from "../../../../api/MenuAPI";
import ProductForm from "../../../../components/ProductForm";
import {toast} from "react-toastify";

export const Edit = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useMemo(async () => {
        const {data} = await MenuAPI.get(id);
        setProduct(data.data)
        setLoading(false)
    }, []);

    const handleSubmit = async (data) => {
        const response = await MenuAPI.update(data, id);
        if (response.status === 202) {
            toast.success(`${response.data.data.article} successfully updated`, {
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
                    <h2 className="text-2xl font-bold mb-4">Edit {product.article}</h2>
                    <ProductForm defaultValues={product} onSubmit={handleSubmit}/>
                </>
            }
        </AccountLayout>
    )
}