import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const CustomerRoute = ({children}) => {
    const token = localStorage.getItem('jwtToken');
    const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token && !userData) {
            navigate('/');
        }

    }, [token, userData, navigate]);

    return token ? children : null;
}

export default CustomerRoute;
