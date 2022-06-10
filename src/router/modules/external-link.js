/*
 * @Description:外部链接相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-06-10 17:06:17
 */
import { ISBUILD } from '@/config'
import store from '@/store'
const account = store.state.user?.user?.account
const { devProxyTarget } = require('@/config/settings')

export default [
  {
    path:
      (ISBUILD ? window._CONFIG.BAOXIAO_BASEURL : devProxyTarget) +
      `/ctrl/crtlwechat/index/wechatlogin.jsp?account=${account}&&JHSessionId=-1`, // ${store.getters.openId}  xiejieweidemo
    name: 'BaoXiao',
    meta: { title: '智能报销', icon: 'baoxiao', modCode: '10' }
  },
  {
    path: window._CONFIG.BI_BASEURL + '/BI/H5/#/',
    name: 'TongJi',
    meta: { title: 'BI分析', icon: 'tongji', modCode: 'bi' }
  }
]
