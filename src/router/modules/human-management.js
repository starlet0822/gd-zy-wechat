/*
 * @Description:人力管理相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-04-02 15:51:21
 */
export default [
  {
    path: '/attendance',
    name: 'Attendance',
    meta: {
      title: '考勤审批',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "attendance" */ '@/views/human-management/attendance/index.vue')
  },
  {
    path: '/attendance-check',
    name: 'AttendanceCheck',
    meta: {
      title: '考勤审批'
    },
    component: () =>
      import(/* webpackChunkName: "attendance-check" */ '@/views/human-management/attendance/check')
  },
  {
    path: '/vacation',
    name: 'Vacation',
    meta: {
      title: '休假申请',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "vacation" */ '@/views/human-management/vacation/list.vue')
  },
  {
    path: '/vacation-check',
    name: 'VacationCheck',
    meta: {
      title: '休假审批'
    },
    component: () =>
      import(/* webpackChunkName: "vacation-check" */ '@/views/human-management/vacation/check')
  },
  {
    path: '/rotational',
    name: 'Rotational',
    meta: {
      title: '职工轮岗',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "rotational" */ '@/views/human-management/rotational/index.vue')
  },
  {
    path: '/rotational-check',
    name: 'RotationalCheck',
    meta: {
      title: '轮岗审批'
    },
    component: () =>
      import(/* webpackChunkName: "rotational-check" */ '@/views/human-management/rotational/check')
  },
  {
    path: '/secondment',
    name: 'Secondment',
    meta: {
      title: '职工借调',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "secondment" */ '@/views/human-management/secondment/index.vue')
  },
  {
    path: '/secondment-check',
    name: 'SecondmentCheck',
    meta: {
      title: '借调审批'
    },
    component: () =>
      import(/* webpackChunkName: "secondment-check" */ '@/views/human-management/secondment/check')
  },
  {
    path: '/rotary',
    name: 'Rotary',
    meta: {
      title: '轮转申请',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "rotary" */ '@/views/human-management/rotary/index.vue')
  },
  {
    path: '/rotary-check',
    name: 'RotaryCheck',
    meta: {
      title: '轮转审批'
    },
    component: () =>
      import(/* webpackChunkName: "rotary-check" */ '@/views/human-management/rotary/check')
  },
  {
    path: '/departure',
    name: 'Departure',
    meta: {
      title: '离职申请',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "departure" */ '@/views/human-management/departure/index.vue')
  },
  {
    path: '/departure-check',
    name: 'DepartureCheck',
    meta: {
      title: '离职审批'
    },
    component: () =>
      import(/* webpackChunkName: "departure-check" */ '@/views/human-management/departure/check')
  }
]
