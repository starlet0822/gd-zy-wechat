/*
 * @Description:人力管理相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-05-07 09:39:29
 */
import { typeCode } from '@/config/dictionary'
export default [
  {
    path: '/attendance',
    name: 'Attendance',
    meta: {
      title: '考勤申请',
      icon: 'kaoqin',
      modCode: '21',
      typeCode: typeCode.get('attendance'),
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "attendance" */ '@/views/human-resources/attendance/index.vue')
  },
  {
    path: '/attendance-check/:id/:dataState?',
    name: 'AttendanceCheck',
    meta: {
      title: '考勤审批'
    },
    component: () =>
      import(/* webpackChunkName: "attendance-check" */ '@/views/human-resources/attendance/check')
  },
  {
    path: '/vacation',
    name: 'Vacation',
    meta: {
      title: '休假申请',
      icon: 'xiujia',
      modCode: '21',
      typeCode: typeCode.get('vacation'),
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "vacation" */ '@/views/human-resources/vacation/index.vue')
  },
  {
    path: '/vacation-check/:id/:dataState?',
    name: 'VacationCheck',
    meta: {
      title: '休假审批'
    },
    component: () =>
      import(/* webpackChunkName: "vacation-check" */ '@/views/human-resources/vacation/check')
  },
  {
    path: '/vacation-reset',
    name: 'VacationReset',
    meta: {
      title: '销假审批',
      icon: 'xiaojia',
      modCode: '21',
      typeCode: typeCode.get('resetVacation'),
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "vacation-reset" */ '@/views/human-resources/vacation-reset/index.vue'
      )
  },
  {
    path: '/vacation-reset-check/:id/:dataState?',
    name: 'VacationResetCheck',
    meta: {
      title: '销假审批'
    },
    component: () =>
      import(
        /* webpackChunkName: "vacation-reset-check" */ '@/views/human-resources/vacation-reset/check'
      )
  },
  {
    path: '/rotational',
    name: 'Rotational',
    meta: {
      title: '职工轮岗',
      icon: 'lungang',
      modCode: '21',
      typeCode: typeCode.get('workShift'),
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "rotational" */ '@/views/human-resources/rotational/index.vue')
  },
  {
    path: '/rotational-check/:id/:dataState?',
    name: 'RotationalCheck',
    meta: {
      title: '轮岗审批'
    },
    component: () =>
      import(/* webpackChunkName: "rotational-check" */ '@/views/human-resources/rotational/check')
  },
  {
    path: '/secondment',
    name: 'Secondment',
    meta: {
      title: '职工借调',
      icon: 'jiediao',
      modCode: '21',
      typeCode: typeCode.get('toLoan'),
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "secondment" */ '@/views/human-resources/secondment/index.vue')
  },
  {
    path: '/secondment-check/:id/:dataState?',
    name: 'SecondmentCheck',
    meta: {
      title: '借调审批'
    },
    component: () =>
      import(/* webpackChunkName: "secondment-check" */ '@/views/human-resources/secondment/check')
  },
  {
    path: '/departure',
    name: 'Departure',
    meta: {
      title: '离职申请',
      icon: 'lizhi',
      modCode: '21',
      typeCode: typeCode.get('quit'),
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "departure" */ '@/views/human-resources/departure/index.vue')
  },
  {
    path: '/departure-check/:id/:dataState?',
    name: 'DepartureCheck',
    meta: {
      title: '离职审批'
    },
    component: () =>
      import(/* webpackChunkName: "departure-check" */ '@/views/human-resources/departure/check')
  },
  // {
  //   path: '/rotary',
  //   name: 'Rotary',
  //   meta: {
  //     title: '轮转申请',
  //     icon: 'lunzhuan',
  //     modCode: '21',
  //     keepAlive: true
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "rotary" */ '@/views/human-resources/rotary/index.vue')
  // },
  {
    path: '/rotary-check/:id/:dataState?',
    name: 'RotaryCheck',
    meta: {
      title: '轮转审批'
    },
    component: () =>
      import(/* webpackChunkName: "rotary-check" */ '@/views/human-resources/rotary/check')
  }
]
