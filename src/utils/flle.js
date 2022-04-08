/*
 * @Description: 文件相关工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-04-08 14:16:30
 */
import { _isNumber } from './is'
// 获取文件大小
export function getFileSize(size) {
  try {
    const newSize = parseInt(size)
    if (!_isNumber(newSize)) return size
    const size1 = newSize / 1024 / 1024
    const size2 = newSize / 1024
    if (size1 >= 1) return size1.toFixed(2) + 'M'
    else if (size2 >= 1) return size2.toFixed(2) + 'KB'
    else return newSize + 'B'
  } catch (e) {
    return size
  }
}
