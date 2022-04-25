<!--
 * @Description: 时间线
 * @Author: wuxxing
 * @LastEditTime: 2022-04-25 13:50:42
-->
<template>
  <div class="timeline-wrapper vh-p-box33">
    <template v-if="list.length > 0">
      <div class="timeline__header vh-color-blue">{{ '审批流程' }}</div>
      <ul class="timeline">
        <li class="timeline-item vh-flex-row" v-for="(item, index) in list" :key="index">
          <!-- 年月标签 -->
          <div class="timeline-item-left">
            <p v-if="item.type === -1">
              {{ item.createTime | formatDate('YYYY-MM-DD') }}
              <br />
              {{ item.createTime | formatDate('HH:mm:ss') }}
            </p>
            <p v-else>
              {{ item.completeTime | formatDate('YYYY-MM-DD') }}
              <br />
              {{ item.completeTime | formatDate('HH:mm:ss') }}
            </p>
          </div>
          <div class="timeline-item-right vh-pt-5 vh-flex-row">
            <!-- 时间线条 -->
            <div class="timeline-item__tail"></div>
            <!-- 节点 -->
            <div class="timeline-item__node"></div>
            <!-- 时间项容器 -->
            <div class="timeline-item__wrapper">
              <!-- 时间项内容 vh-flex-ac-jb -->
              <div class="timeline-item_content">
                <div>{{ item.userEntityName }}</div>
                <div class="vh-color-tip">{{ item.name }}</div>
              </div>
              <div class="vh-color-tip">{{ item.remark }}</div>
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
    </template>
    <vh-tip v-if="!loading && list.length === 0"></vh-tip>
  </div>
</template>

<script>
import { findCheckInfo } from '@/api/modules/common'
export default {
  name: 'TimeLine',
  props: {
    id: {
      type: String,
      default: ''
    },
    typeCode: {
      type: String,
      default: 'hr_vacation'
    },
    // 时间线数据源
    // timeList: {
    //   type: [Array],
    //   default: () => [
    //     // { time: new Date(), name: '张三', result: '执行' },
    //     // { time: new Date(), name: '李四', result: '执行' },
    //     // { time: new Date(), name: '王五', result: '执行' },
    //     // { time: new Date(), name: '老六', result: '同意' },
    //     // { time: new Date(), name: '李四', result: '执行' },
    //     // { time: new Date(), name: '王五', result: '执行' },
    //     // { time: new Date(), name: '老六', result: '同意' },
    //     // { time: new Date(), name: '陈真', result: '同意' }
    //   ]
    // },
    reverse: Boolean, // 指定节点排序方向，默认为正序
    // 默认显示几条
    length: {
      type: [Number, String],
      default: 5
    }
  },
  data() {
    return {
      loading: false,
      isPickup: true, // 默认显示展开按钮
      originData: [] // 原始数组
      // list: originData.slice(0, +this.length)
      // params: {

      // }
    }
  },
  computed: {
    // 是否显示切换按钮
    isShowToggle: {
      get() {
        return this.originData.length > +this.length
      }
    },
    list: {
      get() {
        if (this.isPickup) {
          return this.originData.slice(0, +this.length)
        }
        return this.originData
      },
      set() {}
    }
  },
  mounted() {
    this.findCheckInfo()
  },
  methods: {
    // 获取审批流程
    async findCheckInfo() {
      try {
        this.loading = true
        const params = { typeCode: this.typeCode, busKey: this.id }
        const { errcode, data } = await findCheckInfo(params)
        if (errcode === '0') {
          this.list = this.originData = data || []
        }
      } finally {
        this.loading = false
      }
    },
    // 展开收起切换
    handleToggle() {
      this.isPickup = !this.isPickup
      // this.list = this.isPickup ? this.originData.slice(0, +this.length) : this.originData
    }
  }
}
</script>

<style lang="less" scoped>
.timeline-wrapper {
  background-color: #fff;
  padding: 10px;

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
        margin-right: 6px;
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
