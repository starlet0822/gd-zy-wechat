/*
 * @Description:用户路由
 * @Author: wuxxing
 * @LastEditTime: 2022-05-06 10:26:22
 */
export default [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/user-center',
    name: 'UserCenter',
    meta: { title: '个人中心' },
    component: () => import(/* webpackChunkName: "user-center" */ '@/views/user-center/index.vue')
  }
]
