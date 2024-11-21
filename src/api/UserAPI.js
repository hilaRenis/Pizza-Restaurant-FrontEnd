import {BASE_URL} from "./backend";
import api from "./api";

export const USERS = BASE_URL + "/users";
export const CUSTOMERS = USERS + "/customers";

export const UserAPI = {
    list: () => api.get(USERS),
    create: (data) => api.post(`${USERS}`, data),
    update: (data, id) => api.put(`${USERS}/${id}`, data),
    get: (id) => api.get(`${USERS}/${id}`),
    delete: (id) => api.delete(`${USERS}/${id}`),
    getCustomers: () => api.get(CUSTOMERS)
}