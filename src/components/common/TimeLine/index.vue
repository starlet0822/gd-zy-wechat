<!--
 * @Description: 时间线
 * @Author: wuxxing
 * @LastEditTime: 2022-03-31 16:55:42
-->
<template>
  <div class="timeline-wrapper vh-p-box33">
    <div class="timeline__header vh-color-blue">{{ '审批流程' }}</div>
    <ul class="timeline">
      <li class="timeline-item vh-flex-row" v-for="(item, index) in list" :key="index">
        <!-- 年月标签 -->
        <div class="timeline-item-left">
          <p>
            {{ item.time | formatDate('YYYY-MM-DD') }}
            <br />
            {{ item.time | formatDate('HH:mm:ss') }}
          </p>
        </div>
        <div class="timeline-item-right vh-pt-5 vh-flex-row">
          <!-- 时间线条 -->
          <div class="timeline-item__tail"></div>
          <!-- 节点 -->
          <div class="timeline-item__node"></div>
          <!-- 时间项容器 -->
          <div class="timeline-item__wrapper">
            <!-- 时间项内容 -->
            <div class="timeline-item_content vh-flex-ac-jb">
              <div>{{ item.name }}</div>
              <div class="vh-color-tip vh-px-8">{{ item.result }}</div>
              <div class="vh-color-tip">{{ '主任审核' }}</div>
            </div>
            <!-- 时间线时间 -->
            <!-- <div class="timeline-item_timestamp vh-color-tip vh-mt-8">{{ `2022-0${item}-21` }}</div> -->
          </div>
        </div>
      </li>
      <template v-if="isShowToggle">
        <div class="pick-btn vh-color-blue" @click="handleToggle">
          {{ isPickup ? '展开' : '收起' }}
          <van-icon :name="isPickup ? 'arrow-down' : 'arrow-up'" />
        </div>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TimeLine',
  props: {
    // 时间线数据源
    timeList: {
      type: [Array],
      default: () => [
        { time: new Date(), name: '张三', result: '执行' },
        { time: new Date(), name: '李四', result: '执行' },
        { time: new Date(), name: '王五', result: '执行' },
        { time: new Date(), name: '老六', result: '同意' },
        { time: new Date(), name: '李四', result: '执行' },
        { time: new Date(), name: '王五', result: '执行' },
        { time: new Date(), name: '老六', result: '同意' },
        { time: new Date(), name: '陈真', result: '同意' }
      ]
    },
    reverse: Boolean, // 指定节点排序方向，默认为正序
    // 默认显示几条
    length: {
      type: [Number, String],
      default: 5
    }
  },
  data() {
    return {
      isPickup: true, // 默认显示展开按钮
      list: this.timeList.slice(0, +this.length)
    }
  },
  computed: {
    // 是否显示切换按钮
    isShowToggle: {
      get() {
        return this.timeList.length > +this.length
      }
    }
  },
  methods: {
    // 展开收起切换
    handleToggle() {
      this.isPickup = !this.isPickup
      this.list = this.isPickup ? this.timeList.slice(0, +this.length) : this.timeList
    }
  }
}
</script>

<style lang="less" scoped>
.timeline-wrapper {
  background-color: #fff;
  .timeline__header {
    // font-size: 18px;
    // line-height: 1.5;
    // font-weight: bold;
    padding-bottom: 10px;
  }
  .timeline {
    font-size: 14px;
    .timeline-item {
      .timeline-item-left {
        text-align: center;
        margin-right: 10px;
      }
      .timeline-item-right {
        position: relative;
        padding-bottom: 20px;
        flex: 1;
        // &:last-child {// TODO 不生效？
        //   .timeline-item__tail {
        //     display: none;
        //   }
        // }
        .timeline-item__tail {
          position: absolute;
          left: 7px;
          height: 100%;
          border-left: 1px solid @color-blue;
        }
        .timeline-item__node {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          // 默认样式
          width: 14px;
          height: 14px;
          border-radius: 100%;
          background: rgba(255, 255, 255, 1);
          border: 4px solid @color-orange;
        }
        .timeline-item__wrapper {
          position: relative;
          width: 100%;
          padding-left: 20px;
          top: -3px;
        }
      }
    }
    .pick-btn {
      // text-align: right;
      padding-left: 102px;
    }
  }
}
</style>
