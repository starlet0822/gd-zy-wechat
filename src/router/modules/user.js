/*
 * @Description:用户路由
 * @Author: wuxxing
 * @LastEditTime: 2022-04-06 16:53:49
 */
export default [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  }
]
