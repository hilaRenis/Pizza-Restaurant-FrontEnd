import {BASE_URL} from "./backend";
import api from "./api";

export const STATS = BASE_URL + "/statistics";

export const StatsAPI = {
    fetch: (data) => api.get(`${STATS}`, {params: data})
}