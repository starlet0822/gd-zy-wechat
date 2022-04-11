/*
 * @Description:请求方法 封装
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 14:43:32
 */
import request from './request-service'
import Qs from 'qs'

export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      params,
      ...config
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// axios#post(url[, data[, config]])
// `data` 是放在请求的body里
// Content-Type: application/json 参数格式
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    request
      .post(url, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// Content-Type: application/x-www-form-urlencoded 参数格式
export const postForm = (url, params, config = {}) => {
  // config.timeout = config.timeout || 60000
  return new Promise((resolve, reject) => {
    request
      .post(url, Qs.stringify(params), config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
