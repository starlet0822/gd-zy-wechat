/*
 * @Description: 请求封装
 * @Author: wuxxing
 * @LastEditTime: 2022-05-16 11:11:55
 */
import axios from 'axios'
import { API_BASEURL, API_TIMEOUT, ISBUILD } from '@/config/index'
import { Toast, Dialog } from 'vant'
import router from '@/router'
import { loginUrl } from '@/config/weixin'
const settings = require('../config/settings')
const service = axios.create({
  baseURL: API_BASEURL, // 请求前缀
  timeout: API_TIMEOUT, // 请求超时
  withCredentials: true // 跨域请求时是否携带上cookie（凭证）
  // headers: {
  //   post: { 'Content-Type': 'Content-Type: application/json' } // 默认参数格式
  // }
})

function handleErrorStatus(data) {
  const { errcode, errmsg: message } = data
  console.log('errcode', errcode)
  switch (errcode) {
    case 403:
      Dialog.confirm({ message })
        .then(() => {
          if (ISBUILD) {
            location.href = loginUrl
          } else {
            router.push({ path: '/login' })
          }
        })
        .catch(() => {})
      break
    case '0':
      Toast.clear()
      break
    default:
      Toast({ message, duration: 1500 })
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
    // console.log('响应拦截器response', response)
    if ([200, 304].includes(status)) {
      Toast.clear()
    }
    if (status && status !== 200) {
      // handleErrorStatus(data) // 根据后台自定义状态码errcode 做出对应处理
      return Promise.reject(response || 'error')
    }
    handleErrorStatus(data)
    return Promise.resolve(response)
  },
  (error) => {
    Toast.clear()
    console.error('err:' + error)
    if (error && error.response?.status) {
      const status = error.response.status
      console.log('errorStatus', status)
      switch (status) {
        case 404:
          error.message = `请求出错(${status})`
          break
        case 500:
          error.message = `服务器错误(${status})`
          break
        default:
          error.message = `连接出错(${status})`
      }
    } else {
      // 网络超时异常处理
      if (
        error.code === 'ECONNABORTED' ||
        error.message === 'Network Error' ||
        error.message.includes('timeout')
      ) {
        error.message = `请求超时`
      } else {
        error.message = `连接服务器失败`
      }
    }
    Toast({ message: error.message, duration: 3000 })
    return Promise.reject(error)
  }
)

export default service
