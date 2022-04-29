/*
 * @Description: 请求封装
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 14:10:45
 */
import axios from 'axios'
import { API_BASEURL, API_TIMEOUT } from '@/config/index'
import { Toast, Dialog } from 'vant'
import router from '@/router'
const settings = require('../config/settings')
const service = axios.create({
  baseURL: API_BASEURL, // 请求前缀
  timeout: API_TIMEOUT, // 请求超时
  withCredentials: true // 跨域请求时是否携带上cookie（凭证）
  // headers: {
  //   post: {
  //     'Content-Type': 'Content-Type: application/json' // 默认参数格式
  //   }
  // }
})

function handleErrorStatus(data) {
  const { errcode, errmsg: message } = data
  console.log('errcode', errcode)
  switch (errcode) {
    case 403:
      Dialog.confirm({ message })
        .then(() => {
          router.push({ path: '/login' })
        })
        .catch(() => {})
      // Toast({ type: 'fail', message, duration: 3000 })
      break
    case '0':
      Toast.clear()
      break
    default:
      Toast({ type: 'fail', message, duration: 1500 })
  }
}
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    console.log('请求拦截器config', config)
    // 不传递默认开启loading
    if (settings.showAxiosLoading && !config.noLoading) {
      Toast.loading({
        loadingType: 'spinner',
        message: '加载中...',
        // forbidClick: true,
        duration: 0
      })
    }
    // const token = store.getters.token || sessionStorage.getItem('mobile_base_token')
    // if (token) {
    //   config.headers['Authorization'] = token
    //   config.headers['u-login-areaId'] = '370200'
    // }
    // config.headers['X-Token'] = 'admin-token'
    return config
  },
  (error) => {
    console.log('请求拦截器error', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { status, data } = response
    console.log('响应拦截器response', response)
    if ([200, 304].includes(status)) {
      Toast.clear()
    }
    // if ([404].includes(status)) {
    //   Toast({ type: 'fail', message: '404 Not Found' })
    // }
    if (status && status !== 200) {
      // handleErrorStatus(data) // 根据后台自定义状态码errcode 做出对应处理
      return Promise.reject(response || 'error')
    }
    handleErrorStatus(data)
    return Promise.resolve(response)
  },
  (error) => {
    Toast.clear()
    console.error('err' + error)
    return Promise.reject(error)
  }
)

export default service
