	import axios from 'axios'
	import { ElMessage } from "element-plus";
	import router from '../../router'
	let Ajax = axios.create({
	    baseURL: "http://127.0.0.1:3003/",
	    timeout: 5000
	})
	Ajax.interceptors.response.use(response => {
	    if (response.data.data.code == 2) {
	        ElMessage(response.data.data.data)
	        router.push('/login')
	        localStorage.removeItem('username')
	        return []
	    }
	    return response.data;
	}, error => {
	    return Promise.reject(error);
	});
	
	const get = (url, params) => {
	    Ajax.defaults.headers['token'] = localStorage.getItem('token')
	    return new Promise((relove, reject) => {
	        Ajax.get(url, { params }).then(res => relove(res)).catch(err => reject(err))
	    })
	}
	const post = (url, params) => {
	    Ajax.defaults.headers['token'] = localStorage.getItem('token')
	    return new Promise((relove, reject) => {
	        Ajax.post(url, params).then(res => relove(res)).catch(err => reject(err))
	    })
	}
	export default {
	    get, post
	}


let { TOKEN, lang } = getToken()
axios.defaults.headers = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=utf-8;',
    platform: 'PC',
    sid: TOKEN && TOKEN.sessionId,
    lang: lang,
}

// 全屏问题
//https://juejin.cn/post/6987638498555592711





