<!--
 * @Description: 输入文本类型
 * @Author: wuxxing
 * @LastEditTime: 2022-04-20 17:40:10
-->
<template>
  <div class="input-field-wrapper vh-border-b-11">
    <van-field
      v-model.trim="defaultVal"
      :label="label"
      :placeholder="placeholder"
      input-align="right"
      center
      clearable
      v-bind="$attrs"
      v-on="$listeners"
      @input="onInput"
    ></van-field>
  </div>
</template>

<script>
import { _isEqual } from '@/utils/is'
export default {
  name: 'InputField',
  props: {
    field: String,
    label: String,
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: [String, Number],
    type: String,
    result: {
      type: Object,
      default: () => {}
    }
    // config: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       field: 'name',
    //       label: '科室',
    //       placeholder: '请输入',
    //       type: 'input',
    //       value: ''
    //     }
    //   }
    // }
  },
  data() {
    return {
      defaultVal: this.value
    }
  },
  computed: {
    // defaultVal: {
    //   get() {
    //     return this.value
    //   },
    //   set(val) {
    //     console.log(val)
    //     this.$emit('update:value', val)
    //   }
    // }
  },
  created() {},
  methods: {
    // 设置绑定值
    setDefaultVal() {
      this.$emit('save', this.defaultVal)
      this.result[this.field] = this.defaultVal
    },
    // 重置绑定值
    resetDefaultVal() {
      const initData = this.$options.data.call(this)
      if (_isEqual(this.defaultVal, initData.defaultVal)) return
      console.log(`重置${this.field}`)
      this.defaultVal = initData.defaultVal
    },
    onInput(val) {
      // console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.input-field-wrapper {
}
</style>
