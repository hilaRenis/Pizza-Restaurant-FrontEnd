import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const CustomerRoute = ({children}) => {
    const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
    const navigate = useNavigate();

    useEffect(() => {
        if (userData.role !== "Customer") {
            navigate('/');
        }

    }, [userData, navigate]);

    return userData ? children : null;
}

export default CustomerRoute;
