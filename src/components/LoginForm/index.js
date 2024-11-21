import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from "react-router-dom";
import {AuthAPI} from "../../api/AuthAPI";
import {getRoutePath, REGISTER} from "../../constants/routes";
import api from "../../api/api";

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await AuthAPI.login(data);
            localStorage.setItem('jwtToken', response.data.data.token);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
            delete response.data.data.token;
            delete response.data.data.refreshToken;
            localStorage.setItem('userData', JSON.stringify(response.data.data));
            window.location.href = getRoutePath();
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Column 1: Background Image */}
            <div className="w-3/5 bg-cover bg-center" style={{backgroundImage: "url('/pizza-background.jpg')"}}>
                {/* Optionally add content here */}
            </div>

            {/* Column 2: Login Form */}
            <div className="w-2/5 flex items-center justify-center">
                <form
                    className="max-w-sm w-full mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2" htmlFor="username">Username</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            id="username"
                            type="text"
                            {...register('username', {required: 'Username is required'})}
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            id="password"
                            type="password"
                            {...register('password', {required: 'Password is required'})}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Login
                    </button>

                    <p style={{textAlign: "center"}}>
                        Don't have account ? &nbsp;
                        <Link to={REGISTER} style={{color: "blue"}}>
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );

};

export default LoginForm;
