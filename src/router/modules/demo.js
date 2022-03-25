/*
 * @Description:demo页面路由
 * @Author: wuxxing
 * @LastEditTime: 2022-03-25 13:46:27
 */
// import Home from '@/views/Home.vue'
export default [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '@/views/test/index.vue')
  }
]
