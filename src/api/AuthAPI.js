import axios from 'axios';
import {BASE_URL} from "./backend";
import api from "./api";

export const LOGIN = BASE_URL + "/auth/tokens";
export const REGISTER = BASE_URL + "/auth/register-customers";

export const AuthAPI = {
    login: (data) => api.post(LOGIN, data),
    register: (data) => api.post(REGISTER, data)
}