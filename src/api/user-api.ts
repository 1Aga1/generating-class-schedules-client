import request from "./index";
import {IUser} from "../types/user";

class UserApi {
    login = (username: string, password: string) => {
        return request.post<IUser>('/user/login', {
            username, password
        })
    }

    logout = () => request.post('/user/logout')

    checkout = () => request.get<IUser>('/user/checkout')
}

export default new UserApi()