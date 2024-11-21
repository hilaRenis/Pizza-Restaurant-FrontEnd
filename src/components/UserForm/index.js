import React from 'react';
import {useForm} from 'react-hook-form';

const ProductForm = ({defaultValues, onSubmit}) => {
    const {register, watch, handleSubmit, formState: {errors}} = useForm({
        defaultValues
    });

    // Custom validator for password (only validate if password is entered)
    const validatePassword = value =>
        !value || value.length >= 8 || 'Password must have at least 8 characters';

    // Custom validator for confirming password (only validate if password is entered)
    const validateConfirmPassword = value =>
        !value || value === watch('password') || 'The passwords do not match';


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl p-4 bg-white shadow-md rounded-lg">
            {/* Article Field */}
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input
                    id="username"
                    type="text"
                    {...register('username', {required: 'Username is required'})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
            </div>

            {/* Description Field */}
            <div className="mb-4">
                <label htmlFor="fullname" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    {...register('fullName', {required: 'Full Name is required'})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName.message}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                    id="password"
                    type="password"
                    step="0.01"
                    {...register('password', {validate: validatePassword})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm
                    Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    step="0.01"
                    {...register('confirmPassword', {
                        validate: validateConfirmPassword
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
            </button>
        </form>
    );
};

export default ProductForm;
