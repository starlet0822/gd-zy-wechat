<!--
 * @Description: pick选择项类型
 * @Author: wuxxing
 * @LastEditTime: 2022-04-20 17:40:15
-->
<template>
  <div class="select-field-wrapper">
    <van-cell :title="label" title-class="vh-color-text" center is-link>
      <template #default>
        <van-dropdown-menu :active-color="themeColor" v-on="$listeners" @change="onMenuChange">
          <van-dropdown-item
            v-bind="$attrs"
            v-on="$listeners"
            v-model="defaultVal"
            :options="options"
          />
        </van-dropdown-menu>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { _isEqual } from '@/utils/is'
import { themeColor } from '@/config/constants'
export default {
  name: 'SelectField',
  props: {
    field: String,
    label: String,
    // placeholder: {
    //   type: String,
    //   default: '请选择'
    // },
    value: [String, Number],
    // 选项
    options: {
      type: Array,
      default: () => []
    },
    type: String,
    result: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      defaultVal: this.value,
      themeColor
    }
  },
  created() {},
  methods: {
    // 重置绑定值
    resetDefaultVal() {
      const initData = this.$options.data.call(this)
      if (_isEqual(this.defaultVal, initData.defaultVal)) return
      console.log(`重置${this.field}`)
      this.defaultVal = initData.defaultVal
    },
    onMenuChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="less" scoped>
.select-field-wrapper {
  /deep/ .van-dropdown-menu__bar {
    height: auto;
    box-shadow: none;
    background-color: transparent;
    .van-dropdown-item__option {
      .van-cell__title {
        color: #262626;
      }
    }
    .van-dropdown-menu__item {
      justify-content: flex-end;

      .van-dropdown-menu__title {
        padding: 0;
        &::after {
          border: 0;
        }
      }
    }
  }
}
</style>
