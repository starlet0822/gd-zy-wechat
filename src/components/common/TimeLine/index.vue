<!--
 * @Description: 时间线
 * @Author: wuxxing
 * @LastEditTime: 2022-03-21 17:19:50
-->
<template>
  <div class="timeline-wrapper">
    <div class="timeline__header">时间线</div>
    <ul class="timeline">
      <li class="timeline-item vh-flex-row" v-for="item in 5" :key="item">
        <!-- 年月标签 -->
        <div class="timeline-item-left">
          {{ '2022年03月' }}
        </div>
        <div class="timeline-item-right vh-pt-5 vh-flex-row">
          <!-- 时间线条 -->
          <div class="timeline-item_tail" v-show="item !== 5"></div>
          <!-- 节点 -->
          <div class="timeline-item_node"></div>
          <!-- 时间项容器 -->
          <div class="timeline-item_wrapper">
            <!-- 时间项内容 -->
            <div class="timeline-item_content vh-font-16">{{ '同意' }}</div>
            <!-- 时间线时间 -->
            <div class="timeline-item_timestamp vh-color-tip vh-mt-8">{{ '2022-03-21' }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TimeLine',
  props: {
    timeList: {
      type: [Array],
      default: () => []
    },
    reverse: Boolean // 指定节点排序方向，默认为正序
  },
  data() {
    return {
      arr: [1, 3]
    }
  },
  methods: {
    hn() {
      this.arr((item) => {})
    }
  }
}
</script>

<style lang="less" scoped>
.timeline-wrapper {
  .timeline__header {
    font-size: 18px;
    line-height: 1.5;
    // font-weight: bold;
  }
  .timeline {
    font-size: 14px;
    .timeline-item {
      .timeline-item-left {
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
      .timeline-item-right {
        position: relative;
        padding-bottom: 20px;
        // &:last-child {// TODO 不生效？
        //   .timeline-item_tail {
        //     display: none;
        //   }
        // }
        .timeline-item_tail {
          position: absolute;
          left: 7px;
          height: 100%;
          border-left: 1px solid #1a77f0;
        }
        .timeline-item_node {
          position: absolute;
          // background-color: #e4e7ed;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          //
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          opacity: 0.97;
          border: 4px solid #e06500;
        }
        .timeline-item_wrapper {
          position: relative;
          padding-left: 28px;
          top: -3px;
        }
      }
    }
  }
}
</style>
