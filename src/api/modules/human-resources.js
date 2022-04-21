/*
 * @Description:人力资源请求接口
 * @Author: wuxxing
 * @LastEditTime: 2022-04-21 11:08:44
 */
import { post } from '@/utils/request-method'
// 获取考勤信息列表
export function getAtteDetailList(params) {
  return post(`/api/common/queryHrAtteMonthSubmitDetailInfo`, params)
}
