/*
 * @Description:外部链接相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 11:08:03
 */
import { ISBUILD, API_BASEURL } from '@/config'
const { devProxyTarget } = require('@/config/settings')

export default [
  {
    path: ISBUILD ? API_BASEURL : devProxyTarget + `/ctrl/login/visitWeChat/`, // ${store.getters.openId}  xiejieweidemo
    name: 'BaoXiao',
    meta: { title: '智能报销', icon: 'baoxiao', modCode: '10' }
  },
  {
    path: 'http://hrp.gdhtcm.com:8111/BI/H5/#/',
    name: 'TongJi',
    meta: { title: 'BI分析', icon: 'tongji', modCode: '' }
  }
]
