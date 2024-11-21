import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const AdminRoute = ({children}) => {
    const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
    const navigate = useNavigate();

    useEffect(() => {
        if(userData.role !== "Employee"){
            navigate('/');
        }

    }, [userData, navigate]);

    return userData ? children : null;
}

export default AdminRoute;
