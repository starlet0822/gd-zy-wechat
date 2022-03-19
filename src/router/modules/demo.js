/*
 * @Description:demo页面路由
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 18:06:31
 */
import Home from '@/views/Home.vue'
export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '@/views/test/index.vue')
  }
]
