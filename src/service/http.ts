//http.ts
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'
import router from '@/router'
import { ElMessage } from 'element-plus'
import Lockr from 'lockr'
import { getLocal } from '@/util/common'


let getToken = () => {
    return {
        TOKEN: Lockr.get('token') || '',
        lang: getLocal(),
    }
}
// 设置请求头和请求路径
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000
//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
//axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'


axios.interceptors.request.use(
    (config): AxiosRequestConfig<any> => {
        const token = window.sessionStorage.getItem('token')
        if (token) {
            //@ts-ignore
            config.headers.token = token
        }
        return config
    },
    (error) => {
        return error
    }
)

axios.interceptors.request.use(
    (config) => {
        config.timeout = 60 * 1000 // Timeout
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject()
    }
)

// 响应拦截
axios.interceptors.response.use(
    (response) => {
        let code = response.data.code
        // console.log(response, 'code')
        if (code === 404) {
            // sessionStorage.removeItem('token');
            router.push({
                name: '404',
            })
        }
        if (code === 1008) {
            router.push({
                name: 'login',
            })
        }
        //tryHideFullScreenLoading()
        return response
    },
    (error) => {
        //tryHideFullScreenLoading()
        let status = error.response.status
        switch (status) {
            case 403:
                router.push({
                    name: '403',
                })
                break;
            case 404:
                router.push({
                    name: '404s',
                })
                break;
            default:
                ElMessage('服务器连接异常')
                router.push({
                    name: 'login',
                })
                break;
        }
        return Promise.reject()
    }
)

interface ResType<T> {
    code: number
    data?: T
    msg: string
    err?: string
}
interface Http {
    get<T>(url: string, data?: unknown): AxiosPromise<ResType<T>>
    post<T>(url: string, data?: unknown, isUploadFile?: Boolean): AxiosPromise<ResType<T>>
    form<T>(url: string, data?: unknown, isUploadFile?: Boolean): AxiosPromise<ResType<T>>
    download(url: string): void
}

const http: Http = {
    get(url, data) {
        NProgress.start()
        let { TOKEN, lang } = getToken()
        return axios({
            method: 'get',
            url,
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8;',
                platform: 'PC',
                sid: TOKEN && (TOKEN as any).sessionId,
                lang: lang,
            },
        }).then((response) => {
            return response
        })
    },
    post(url, data, isUploadFile = false) {
        let { TOKEN, lang } = getToken()
        NProgress.start()
        return axios({
            method: 'post',
            url,
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8;',
                platform: 'PC',
                sid: TOKEN && (TOKEN as any).sessionId,
                lang: lang,
            },
            data: isUploadFile ? data : JSON.stringify(data),
        }).then((response) => {
            return response
        })
    },
    form(url, data, isUploadFile = true) {
        return this.post(url, data, (isUploadFile = true))
    },
    download(url) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.onload = function () {
            document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
    },
}
export default http
