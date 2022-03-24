/*
 * @Description:请求方法 封装
 * @Author: wuxxing
 * @LastEditTime: 2022-03-24 09:34:06
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
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    request
      .post(url, Qs.stringify(data), config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const postForm = (url, params, config = {}) => {
  config.timeout = config.timeout || 60000
  return new Promise((resolve, reject) => {
    request
      .post(url, params, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
