import React from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from "react-router-dom";
import {AuthAPI} from "../../api/AuthAPI";
import {CUSTOMER, getRoutePath} from "../../constants/routes";

const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await AuthAPI.register(data);

            // Handle login after register
            const loginResponse = await AuthAPI.login(data);
            localStorage.setItem('jwtToken', loginResponse.data.data.token);
            localStorage.setItem('refreshToken', loginResponse.data.data.refreshToken);
            delete loginResponse.data.data.token;
            delete loginResponse.data.data.refreshToken;

            localStorage.setItem('userData', JSON.stringify(response.data.data));
            navigate(getRoutePath(CUSTOMER));

        } catch (error) {
            let messages = "";
            Object.values(error.response.data).map(e => messages += " " + e);
            alert(messages);
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
                <label style={styles.label} htmlFor="fullName">Full Name</label>
                <input
                    style={styles.input}
                    id="fullName"
                    type="text"
                    {...register('fullName', {required: 'Full name is required'})}
                />
                {errors.fullName && <p style={styles.error}>{errors.fullName.message}</p>}
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

            <button style={styles.button} type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
