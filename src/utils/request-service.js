/*
 * @Description: 请求封装
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 14:51:20
 */
import axios from 'axios'
import { API_BASEURL, API_TIMEOUT } from '@/config/index'
import { Toast } from 'vant'
const settings = require('../config/settings')
const service = axios.create({
  baseURL: API_BASEURL,
  timeout: API_TIMEOUT
  // headers: {
  //   post: {
  //     'Content-Type': 'Content-Type: application/json' // 默认参数格式
  //   }
  // }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    console.log('config', config)
    // 不传递默认开启loading
    if (settings.showAxiosLoading && !config.noLoading) {
      Toast.loading({
        loadingType: 'spinner',
        message: '加载中...',
        forbidClick: true
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
    console.log('请求拦截', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log('response', response)
    Toast.clear()
    const res = response
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录
      // if (res.status === 401) {
      //   store.dispatch('FedLogOut').then(() => {
      //     location.reload()
      //   })
      // }
      return Promise.reject(res || 'error')
    }
    return Promise.resolve(res)
  },
  (error) => {
    Toast.clear()
    console.error('err' + error)
    return Promise.reject(error)
  }
)

export default service
