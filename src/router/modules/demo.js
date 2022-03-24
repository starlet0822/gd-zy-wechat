/*
 * @Description:demo页面路由
 * @Author: wuxxing
 * @LastEditTime: 2022-03-24 10:08:43
 */
import Home from '@/views/Home.vue'
export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '@/views/test/index.vue')
  }
]
