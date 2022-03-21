<!--
 * @Description: 时间线组件
 * @Author: wuxxing
 * @LastEditTime: 2022-03-21 15:47:36
-->
<template>
  <div class="time-line-wrapper">
    <!-- 头部标题 -->
    <div class="time-line-title-box">
      <slot v-if="$slots.title" name="title"></slot>
      <div v-else class="head-title">{{ '我提交的历史建议' }}</div>
    </div>
    <!-- 时间线 -->
    <template v-for="(item, index) in timeList">
      <div :key="item.yearMonths" class="time-item">
        <div class="month-tag">
          {{ item.yearMonths }}
        </div>
        <div class="day-list">
          <div v-for="(cItem, cIndex) in item" :key="cItem.createDate" class="day-item">
            <div class="yuan"></div>
            <div class="item-content">
              <div class="item-content-title">{{ cItem.content }}</div>
              <div
                :class="['item-content-time']"
                :style="`border: ${
                  index === timeList.length - 1 && cIndex === item.length - 1 ? 0 : 1.5
                }`"
              >
                {{ cItem.createDate }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { orderBy } from 'lodash-es'
import dayjs from 'dayjs'

export default {
  name: 'TimeLine',
  components: {},
  props: {
    timeData: {
      type: Array,
      default: () => {
        return [
          {
            content: '机关第一党支部召开组织生活会暨学习会',
            createDate: '2021-10-01 15:00:11'
          },
          {
            content: '机关第一党支部召开组织生活会暨学习会',
            createDate: '2022-10-01 15:00'
          },
          {
            content: '抓好政治教育与素质教育',
            createDate: '2021-10-11 19:00'
          },
          {
            content: '重视干部思想能力培养教育',
            createDate: '2021-08-01 12:00'
          },
          {
            content: '机关第一党支部召开组织生活会暨学习会',
            createDate: '2021-06-01 11:00'
          },
          {
            content: '机关第一党支部召开组织生活会暨学习会',
            createDate: '2022-05-01 05:50'
          },
          {
            content: '机关第一党支部召开组织生活会暨学习会',
            createDate: '2021-04-01 15:00'
          },
          {
            content: '机关第一党支部召开组织生活会暨学习会',
            createDate: '2021-04-21 06:00'
          }
        ]
      }
    },
    // 指定排序方向，默认为倒序（以最近时间在最前）
    reverse: {
      type: Boolean,
      default: true
    },
    formatStr: {
      type: String,
      default: 'YYYY-MM-DD HH:mm' // 传值同dayjs.format() 方法参数
    }
  },
  data() {
    return {}
  },
  computed: {
    timeList: {
      get() {
        // 前端处理排序(后端如果未处理时)
        const sortArr = orderBy(this.timeData, 'createDate', this.reverse ? 'desc' : 'asc')
        // 数据分类
        const ret = this.classifyDate(sortArr)
        return ret
      }
    }
  },
  created() {
    // 处理排序
    // const dateArr = _.orderBy(this.timeData, 'createDate', this.reverse)
    // console.log(dateArr)
    // 按月份归类
    // console.log(this.classifyDate(dateArr))
    // console.log(this.$slots)
  },
  methods: {
    // 按年月份归类数据
    classifyDate(dateArr) {
      const newArr = []
      let n = 0
      let yearMonths = ''
      const [first] = dateArr
      // console.log(first)
      const { createDate } = first // 源数组的第一项时间
      yearMonths = dayjs(createDate).format('YYYY年MM月')
      // 直接在这里处理时间显示 无需在模板使用过滤器
      first.createDate = dayjs(createDate).format(this.formatStr)
      newArr[n] = [first]
      newArr[n].yearMonths = yearMonths // 先将第一组数据放进数组，然后判断后一组数据与前一组数据，年月是否相同，相同就放进该组数组，不相同则新建一个数组
      for (let i = 1; i < dateArr.length; i++) {
        const nowItem = dateArr[i] // 当前项时间
        const oldItem = dateArr[i - 1] // 当前的上一项时间
        yearMonths = dayjs(nowItem.createDate).format('YYYY年MM月')
        const isSame = dayjs(nowItem.createDate).isSame(oldItem.createDate, 'month') // 比较时间是否同年同月
        // 直接在这里处理时间显示 无需在模板使用过滤器
        nowItem.createDate = dayjs(nowItem.createDate).format(this.formatStr)
        if (isSame) {
          newArr[n].push(nowItem)
        } else {
          n++
          newArr[n] = []
          newArr[n].yearMonths = yearMonths
          newArr[n].push(nowItem)
        }
      }
      // console.table(newArr)
      return newArr
    }
  }
}
</script>

<style lang="less" scoped>
.time-line-wrapper {
  .time-line-title-box {
    .head-title {
      padding: 20px 0;
      box-sizing: border-box;
    }
  }

  .time-item {
    display: -webkit-flex;
    display: flex;

    .month-tag {
      min-width: 54px;
      height: 30px;
      line-height: 30px;
      background: #1a77f0;
      border-radius: 15px;
      text-align: center;
      color: #fff;
      margin-right: 10px;
      padding: 0 8px;
      box-sizing: border-box;
    }

    .day-list {
      padding-top: 8px;
      box-sizing: border-box;
    }

    .day-item {
      display: -webkit-flex;
      display: flex;

      .yuan {
        width: 16px;
        height: 16px;
        background: #ffffff;
        border: 4px solid #e06500;
        opacity: 0.97;
        border-radius: 50%;
      }

      .item-content {
        &-title {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
          margin-left: 12px;
          margin-top: -2px;
        }

        &-time {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
          padding-top: 10px;
          padding-bottom: 30px;
          padding-left: 20px;
          box-sizing: border-box;
          // $borderWidth: 4;
          margin-left: -9.5px;
          border-left: 1.5px dashed #dcdcdc;
          // TODO:TEST
          // margin-left: #{($borderWidth - 11) / 2}px;
          // border-left: #{$borderWidth}px dashed #dcdcdc;
        }
      }
    }
  }
}
</style>
