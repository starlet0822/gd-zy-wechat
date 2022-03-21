<!--
 * @Description: 时间线
 * @Author: wuxxing
 * @LastEditTime: 2022-03-21 18:15:26
-->
<template>
  <div class="timeline-wrapper vh-p-box">
    <div class="timeline__header vh-color-blue">{{ '审批流程' }}</div>
    <ul class="timeline">
      <li class="timeline-item vh-flex-row" v-for="item in 3" :key="item">
        <!-- 年月标签 -->
        <div class="timeline-item-left">
          <p>
            {{ new Date() | formatDate('YYYY-MM-DD') }}
            <br />
            {{ new Date() | formatDate('HH:mm:ss') }}
          </p>
        </div>
        <div class="timeline-item-right vh-pt-5 vh-flex-row">
          <!-- 时间线条 -->
          <div class="timeline-item_tail"></div>
          <!-- 节点 -->
          <div class="timeline-item_node"></div>
          <!-- 时间项容器 -->
          <div class="timeline-item_wrapper">
            <!-- 时间项内容 -->
            <div class="timeline-item_content vh-flex-ac-jb">
              <div>{{ '张三' }}</div>
              <div class="vh-color-tip vh-px-8">{{ '同意' }}</div>
              <div class="vh-color-tip">{{ '主任审核' }}</div>
            </div>
            <!-- 时间线时间 -->
            <!-- <div class="timeline-item_timestamp vh-color-tip vh-mt-8">{{ `2022-0${item}-21` }}</div> -->
          </div>
        </div>
      </li>
      <div class="pick-btn vh-color-blue">收起</div>
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
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.timeline-wrapper {
  background-color: #ffffff;
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
        // min-width: 54px;
        // height: 30px;
        // line-height: 30px;
        // background: #1a77f0;
        // border-radius: 15px;
        text-align: center;
        // color: #fff;
        margin-right: 10px;
        // padding: 0 8px;
        // box-sizing: border-box;
      }
      .timeline-item-right {
        position: relative;
        padding-bottom: 20px;
        flex: 1;
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
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          opacity: 0.97;
          border: 4px solid #e06500;
        }
        .timeline-item_wrapper {
          position: relative;
          width: 100%;
          padding-left: 20px;
          top: -3px;
        }
      }
    }
    .pick-btn {
      // text-align: right;
      padding-left: 100px;
    }
  }
}
</style>
