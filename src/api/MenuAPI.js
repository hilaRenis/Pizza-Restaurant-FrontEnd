import {BASE_URL} from "./backend";
import api from "./api";

export const MENU = `${BASE_URL}/menus`;
export const LIST = `${MENU}/list`;

export const MenuAPI = {
    list: () => api.get(LIST),
    create: (data) => api.post(MENU, data),
    update: (data, id) => api.put(`${MENU}/${id}`, data),
    delete: (id) => api.delete(`${MENU}/${id}`),
    get: (id) => api.get(`${MENU}/${id}`)
}