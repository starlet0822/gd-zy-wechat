/*
 * @Description:资产管理mock
 * @Author: wuxxing
 * @LastEditTime: 2022-03-29 18:28:57
 */
const Mock = require('mockjs')

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    // id: '@increment',
    // timestamp: +Mock.Random.date('T'),
    // author: '@first',
    // reviewer: '@first',
    // title: '@title(5, 10)',
    // content_short: 'mock data',
    // content: baseContent,
    // forecast: '@float(0, 100, 2, 2)',
    // importance: '@integer(1, 3)',
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    // 'status|1': ['published', 'draft'],
    // display_time: '@datetime',
    // comment_disabled: true,
    // pageviews: '@integer(300, 5000)',
    // image_uri,
    // platforms: ['a-platform'],

    id: '@increment',
    title: '@title(1)',
    dateTime: '@datetime',
    'checkState|1': ['YES', 'NO'],
    formData: [
      {
        fieldName: '字段名称',
        fieldKey: '处置单号',
        'fieldValue|10': /[A-Z][0-9]/,
        fieldType: '数据类型',
        isShow: '@boolean',
        'showOrder|1-100': 10
      },
      {
        fieldName: '字段名称',
        fieldKey: '申请科室',
        'fieldValue|1': ['设备科'],
        fieldType: '数据类型',
        isShow: '@boolean',
        'showOrder|1-100': 10
      },
      {
        fieldName: '字段名称',
        fieldKey: '金额',
        'fieldValue|1': ['1000', '1024'],
        fieldType: '数据类型',
        isShow: '@boolean',
        'showOrder|1-100': 10
      }
    ]
  }))
}

module.exports = [
  {
    url: '/api/common/findFixCheckList',
    type: 'get',
    response: config => {
      const { checkState = 'NO', title, page = 1, limit = 10, sort } = config.query

      let mockList = List.filter(item => {
        // if (importance && item.importance !== +importance) return false
        if (checkState && item.checkState !== checkState) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        errcode: 0,
        errmsg: 'ok',
        total: pageList.length,
        data: pageList
      }

      // return {
      //   code: 200,
      //   data: {
      //     total: mockList.length,
      //     items: pageList
      //   }
      // }
    }
  }
]

