/*
 * @Description: 工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-04-26 11:22:51
 */
// 函数库别名导出(避免命名冲突)
import { isArray, _isNumber } from '@utils/is'
import { camelCase } from 'lodash-es'
export {
  upperFirst as _upperFirst,
  camelCase as _camelCase,
  capitalize as _capitalize,
  kebabCase as _kebabCase,
  debounce as _debounce,
  throttle as _throttle,
  orderBy as _orderBy
} from 'lodash-es'

/**
 * @desc 拼接对象数组的KEY值
 * @param arr 要拼接的数组
 * @param key 要拼接的属性名称 默认为id 若要拼接其他接 则直接传值即可
 * @returns {*}
 */
export function _joinKey2String(arr, key = 'id', flag = ',') {
  if (!isArray(arr)) return ''
  return arr.reduce((acc, cur, index, arr) => {
    return index === arr.length - 1 ? acc.concat(cur[key]) : acc.concat(cur[key] + flag)
  }, '')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function urlQuery2Object(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousand(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 获取递增数字数组 [0,1,2,...]
export function getIncreasingArr(length = 1) {
  if (!_isNumber(+length)) return
  return [...Array(length).keys()]
}

// 按字段查找当前项
// filedId：必须以camelCase（小驼峰）命名
export function findField(arg, filedId) {
  let field = null
  arg.forEach((item) => {
    if (item.rowData && item.rowData.length) {
      field = item.rowData.find((v) => camelCase(v.filedId) === filedId)
      console.log('findField', field)
    }
  })
  return field
}

// 字符串转UTF8
export function str2UTF8Bytes(str) {
  // eslint-disable-next-line
  var bytes = new Array()
  var len, c
  len = str.length
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0)
      bytes.push(((c >> 12) & 0x3f) | 0x80)
      bytes.push(((c >> 6) & 0x3f) | 0x80)
      bytes.push((c & 0x3f) | 0x80)
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0)
      bytes.push(((c >> 6) & 0x3f) | 0x80)
      bytes.push((c & 0x3f) | 0x80)
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0)
      bytes.push((c & 0x3f) | 0x80)
    } else {
      bytes.push(c & 0xff)
    }
  }
  return bytes
}
