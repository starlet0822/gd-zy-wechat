<!--
 * @Description: 日期时间选择类型
 * @Author: wuxxing
 * @LastEditTime: 2022-04-14 10:51:11
-->
<template>
  <div class="date-field-wrapper">
    <van-cell class="vh-border-0 vh-pb-0" title-class="vh-color-text" :title="label"></van-cell>
    <div class="field-box vh-flex-ac">
      <van-search
        v-model="defaultVal[0]"
        readonly
        input-align="center"
        left-icon="clock-o2"
        :placeholder="placeholder[0]"
        shape="round"
        background="#fff"
        @focus="onFocus('0')"
      ></van-search>
      <span class="vh-color-tip">—</span>
      <van-search
        v-model="defaultVal[1]"
        readonly
        input-align="center"
        left-icon="clock-o2"
        :placeholder="placeholder[1]"
        shape="round"
        background="#fff"
        @focus="onFocus('1')"
      ></van-search>
    </div>

    <!-- 日期选择 -->
    <van-popup v-model="showDatePicker" position="bottom">
      <van-datetime-picker
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onConfirmDate"
        @cancel="showDatePicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
// import { isArray } from '@/utils/is'
export default {
  name: 'DateField',
  props: {
    field: [String, Array],
    label: String,
    placeholder: {
      type: [String, Array],
      default: () => {
        return ['开始时间', '结束时间']
      }
    },
    value: [String, Number, Array],
    options: {
      type: Array,
      default: () => []
    },
    type: String,
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    result: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      defaultVal: ['', ''],
      curIndex: '0', // 默认操作第一个
      showDatePicker: false, // 显示时间选择
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2023, 11, 31)
    }
  },
  created() {},
  methods: {
    // handlePlaceholder() {
    //   if (isArray(this.placeholder) && this.placeholder?.length >= 2) {
    //     // const [start, end] = this.placeholder
    //     return this.placeholder
    //   }
    //   return this.placeholder
    // },
    onConfirmDate(val) {
      const dateVal = formatDate(val, this.format)
      this.defaultVal[this.curIndex] = dateVal
      this.$emit('change', this.defaultVal)
      this.showDatePicker = false
    },
    onFocus(index) {
      this.curIndex = index // 记录当前操作的输入框
      this.showDatePicker = true
      // 区别处理
      switch (index) {
        case '0':
          break
        case '1':
          break
      }
    },
    formatter(type, val) {
      if (type === 'year') {
        return val + '年'
      }
      if (type === 'month') {
        return val + '月'
      }
      if (type === 'day') {
        return val + '日'
      }
      return val
    }
  }
}
</script>

<style lang="less" scoped>
.date-field-wrapper {
  /deep/ .field-box {
    .van-search {
      // padding-top: 0;
      padding-left: 16px;
      padding-right: 16px;
      .van-search__content {
        padding-left: 0;
        background-color: #f0f0f0;
        border-radius: 6px;
        .van-field__left-icon {
          display: none;
        }
        .van-field__control {
          font-size: 14px;
          color: @color-text;
        }
      }
    }
  }
}
</style>
