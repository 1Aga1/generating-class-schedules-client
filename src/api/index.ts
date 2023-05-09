import axios from "axios";

const DEV_URL = 'http://127.0.0.1:5000/api'
const PRODUCTION_URL = 'https://schedule.helops.ru/api'

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? PRODUCTION_URL : DEV_URL,
    withCredentials: true,
    headers: {
        'Content-Disposition': '*'
    }
})

const request = {
    getBlob: <T>(url: string) => api.get<T>(url, {responseType: "blob"}),
    get: <T>(url: string) => api.get<T>(url),
    post: <T>(url: string, data?: object) => api.post<T>(url, data),
    delete: <T>(url: string, data?: object) => api.delete<T>(url, {data: data})
}

export default request;