/*
 * @Description:日期时间工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-03-21 18:06:09
 */
import dayjs from 'dayjs'
/**
 * @desc 格式化时间
 * @param time 需要格式化的时间
 * @param format 想要的格式
 * @returns {string|string}
 */
export function formatDate(time, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) return ''
  try {
    return dayjs(time).format(format) || ''
  } catch (e) {
    return ''
  }
}
