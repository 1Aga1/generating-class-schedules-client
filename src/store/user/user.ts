import {makeAutoObservable} from 'mobx'
import UserApi from "../../api/user-api";
import {IUser} from "../../types/user";

class User {
    constructor() {
        makeAutoObservable(this)
    }

    isAuth: boolean = false
    setAuth = (state: boolean) => this.isAuth = state

    user: IUser = {} as IUser
    setUser = (user: IUser) => this.user = user

    login = async (username: string, password: string) => {
        const res = await UserApi.login(username, password);

        this.setUser(res.data);
        this.setAuth(true);

        return res
    }

    checkout = async () => {
        const res = await UserApi.checkout();

        this.setUser(res.data);
        this.setAuth(true);

        return res
    }

    logout = async () => {
        const res = await UserApi.logout()

        this.setAuth(false)
        this.setUser({} as IUser)

        return res
    }
}

export default new User()