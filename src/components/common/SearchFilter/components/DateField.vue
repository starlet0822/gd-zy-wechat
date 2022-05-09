<!--
 * @Description: 日期时间选择类型
 * @Author: wuxxing
 * @LastEditTime: 2022-04-27 10:17:24
-->
<template>
  <div class="date-field-wrapper" ref="dateFieldRef">
    <template v-if="ifRange">
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
        <span class="vh-color-tip">{{ rangeSeparator }}</span>
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
    </template>

    <template v-else>
      <van-field
        class="vh-border-0"
        v-model.trim="defaultVal"
        :label="label"
        :placeholder="placeholder"
        input-align="right"
        center
        clearable
        v-bind="$attrs"
        v-on="$listeners"
        @focus="onFocus"
      ></van-field>
    </template>

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
import { isArray } from '@/utils/is'
// import dayjs from 'dayjs'
export default {
  name: 'DateField',
  props: {
    field: [String, Array],
    label: String,
    placeholder: {
      type: [String, Array],
      default: function () {
        return isArray(this.value) ? ['开始', '结束'] : '请选择'
      }
    },
    value: [String, Number, Array],
    options: {
      type: Array,
      default: () => []
    },
    type: String,
    // 回显格式
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    // 选择范围时的分隔符
    rangeSeparator: {
      type: String,
      default: '—'
    },
    result: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      defaultVal: this.value,
      storageVal: this.value, // 记录默认绑定值 TODO: 为啥会双向绑定？
      curIndex: 0, // 默认操作第一个
      showDatePicker: false, // 显示时间选择
      minDate: new Date(2017, 0, 1),
      maxDate: new Date(2023, 11, 31)
    }
  },
  computed: {
    // 是否是范围选择
    ifRange() {
      return isArray(this.value)
    }
  },
  created() {
    // console.log(this.$options.data.call(this))
  },
  methods: {
    // handlePlaceholder() {
    //   if (isArray(this.placeholder) && this.placeholder?.length >= 2) {
    //     // const [start, end] = this.placeholder
    //     return this.placeholder
    //   }
    //   return this.placeholder
    // },
    // 设置绑定值
    setDefaultVal() {
      this.$emit('save', this.defaultVal)
      // 特殊处理
      if (this.ifRange) {
        this.field.forEach((k, i) => {
          this.result[k] = this.defaultVal[i]
        })
      } else {
        this.result[this.field] = this.defaultVal
      }
    },
    // 重置绑定值 TODO: 无效
    resetDefaultVal() {
      const initData = this.$options.data.call(this)
      // console.log('初始data状态', initData, this.defaultVal)
      // if (_isEqual(this.defaultVal, initData.defaultVal)) return
      // if (_isEqual(this.defaultVal, this.storageVal)) return
      // this.defaultVal = ['']
      // 特殊处理
      if (this.ifRange) {
        this.defaultVal.forEach((k, i) => {
          // this.defaultVal.splice(i, 1, initData.storageVal[i])
          this.defaultVal.splice(i, 1, '') // TODO 先这么处理
        })
      } else {
        this.defaultVal = initData.storageVal
      }
    },

    /**
     * 设置默认时间
     * 1、获取当月 月份
     * 2、获取当月天数
     * 3、计算开始结束日期
     */
    // setDefaultVal(date = new Date()) {
    //   const start = dayjs(date).startOf('month').format(this.format)
    //   const end = dayjs(date).endOf('month').format(this.format)
    //   console.log(start, end)
    //   return [start, end]
    // },
    onConfirmDate(val) {
      const dateVal = formatDate(val, this.format)
      if (this.ifRange) {
        this.defaultVal[this.curIndex] = dateVal
      } else {
        this.defaultVal = dateVal
      }
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
