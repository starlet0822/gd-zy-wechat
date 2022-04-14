<!--
 * @Description: 输入文本类型
 * @Author: wuxxing
 * @LastEditTime: 2022-04-14 09:53:18
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
