/*
 * @Description:项目库相关工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-04-19 18:22:01
 */

import { _camelCase } from '@/utils'

export function handleDetailStr(data, fields = ['equiName', 'applyAmount', 'replyAmount']) {
  console.log(data)
  let detailStr = ''
  let tempStr = ''
  for (const k of data) {
    if (k.type === 'jsonText') {
      // console.log(k)
      for (const row of k.rowData) {
        // console.log(row)
        let { filedId, fieldName, fieldValue } = row
        filedId = _camelCase(filedId) // 驼峰命名处理
        if (filedId === fields[0] && fieldValue) {
          tempStr += `${fieldName + ':' + fieldValue},`
        }
        if (filedId === fields[1] && fieldValue) {
          tempStr += `${fieldName + ':' + fieldValue},`
        }
        if (filedId === fields[2] && fieldValue) {
          tempStr += `${fieldName + ':' + fieldValue}万元;`
        }
      }
    }
    // console.log('tempStr', tempStr)
    detailStr += tempStr
    console.log('detailStr', detailStr)
    return `(${detailStr})`
  }
}
