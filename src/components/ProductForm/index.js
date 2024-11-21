import React from 'react';
import {useForm} from 'react-hook-form';

const ProductForm = ({ defaultValues, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl p-4 bg-white shadow-md rounded-lg">
            {/* Article Field */}
            <div className="mb-4">
                <label htmlFor="article" className="block text-gray-700 text-sm font-bold mb-2">Article</label>
                <input
                    id="article"
                    type="text"
                    {...register('article', { required: 'Article is required' })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.article && <p className="text-red-500 text-xs italic">{errors.article.message}</p>}
            </div>

            {/* Description Field */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                    id="description"
                    {...register('description', { required: 'Description is required' })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
            </div>

            {/* Price Field */}
            <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                <input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register('price', { required: 'Price is required' })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.price && <p className="text-red-500 text-xs italic">{errors.price.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
            </button>
        </form>
    );
};

export default ProductForm;
