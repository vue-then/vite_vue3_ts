//login.ts
import axios from '@/service/http'
import { AxiosPromise } from 'axios'
import api from '../index'
import { Login } from './types'

function getLogin(post: Login) {
    return axios.post(api.LOGIN, post).then((res) => {
        return res.data
    })
}
function logOut(post: any) {
    return axios.post(api.LOGOUT, post).then((res) => {
        return res.data
    })
}

export { getLogin, logOut }   
