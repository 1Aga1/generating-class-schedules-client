import {makeAutoObservable} from 'mobx'

class Account {
    constructor() {
        makeAutoObservable(this)
    }

    isAuth: boolean = false
    setAuth = (state: boolean) => this.isAuth = state

    check = async () => {

    }

}

export default new Account()