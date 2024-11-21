import React from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from "react-router-dom";
import {AuthAPI} from "../../api/AuthAPI";
import {ACCOUNT} from "../../constants/routes";

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await AuthAPI.login(data);
            localStorage.setItem('jwtToken', response.data.data.token);
            delete response.data.data.token;
            localStorage.setItem('userData', JSON.stringify(response.data.data));
            navigate(ACCOUNT);
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
        }
    };

    const styles = {
        form: {
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        },
        inputGroup: {
            marginBottom: '20px',
        },
        label: {
            display: 'block',
            marginBottom: '10px',
            fontWeight: 'bold'
        },
        input: {
            width: '100%',
            padding: '10px',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '5px'
        },
        error: {
            color: 'red',
            fontSize: '12px'
        },
        button: {
            padding: '10px 15px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="username">Username</label>
                <input
                    style={styles.input}
                    id="username"
                    type="text"
                    {...register('username', {required: 'Username is required'})}
                />
                {errors.username && <p style={styles.error}>{errors.username.message}</p>}
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="password">Password</label>
                <input
                    style={styles.input}
                    id="password"
                    type="password"
                    {...register('password', {required: 'Password is required'})}
                />
                {errors.password && <p style={styles.error}>{errors.password.message}</p>}
            </div>
            <button style={styles.button} type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
