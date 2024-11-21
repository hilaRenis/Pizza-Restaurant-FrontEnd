import {BASE_URL} from "./backend";
import api from "./api";

export const CREATE_ORDER = BASE_URL + "/orders/customer/create";
export const MY_ORDERS = BASE_URL + "/orders/my-orders";
export const ORDERS = BASE_URL + "/orders";


export const OrderAPI = {
    create: (data) => api.post(CREATE_ORDER, data),
    getCustomerOrders: () => api.get(MY_ORDERS),
    getAllOrder: () => api.get(ORDERS),
    changeStatus: (data, id) => api.patch(`${ORDERS}/${id}`, data)
}