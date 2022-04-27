<!--
 * @Description: 点击选择类型
 * @Author: wuxxing
 * @LastEditTime: 2022-04-22 17:24:46
-->
<template>
  <div class="radio-field-wrapper vh-bg2">
    <van-cell class="vh-border-0" title-class="vh-color-text" center value-class="vh-tip">
      <template #title>
        <div>
          {{ label }}
          <span class="vh-tip">({{ placeholder }})</span>
        </div>
      </template>
      <template v-if="showPickup">
        <div class="pick-btn" @click="handleToggle">
          {{ isPickup ? '展开' : '收起' }}
          <van-icon :name="isPickup ? 'arrow-down' : 'arrow-up'" />
        </div>
      </template>
    </van-cell>
    <van-radio-group v-model="defaultVal">
      <div class="gird vh-pb-5 vh-flex-wrap" :style="{ 'padding-left': gutter }">
        <div
          class="gird-item"
          :style="{
            flex: `0 0 ${flexBasic}%`,
            'padding-right': gutter,
            'margin-top': index >= +columnNum ? '0.2667rem' : '0'
          }"
          v-for="(item, index) in list"
          :key="index"
        >
          <div v-waves :class="['grid-item__content', 'vh-rounded-6', 'vh-flex-center']">
            <div :class="['grid-item__text']">
              <van-radio :name="item.value">{{ item.label }}</van-radio>
            </div>
          </div>
        </div>
      </div>
    </van-radio-group>
  </div>
</template>

<script>
import { div, mul } from '@/utils/calculate'
import { _isEqual } from '@/utils/is'
import { RootValue } from '@/config/constants'
export default {
  name: 'RadioField',
  props: {
    field: String,
    label: String,
    placeholder: {
      type: String,
      default: '单选'
    },
    value: [String, Number],
    options: {
      type: Array,
      default: () => []
    },
    type: String,
    result: {
      type: Object,
      default: () => {}
    },
    // 默认显示n条
    length: {
      type: [String, Number],
      default: 6
    },
    // 格子之间的间距
    columnNum: {
      type: [String, Number],
      default: 3
    },
    // 间距
    gutter: {
      type: [String, Number],
      default: div(16, RootValue) + 'rem'
    }
  },
  data() {
    return {
      // list: [],
      defaultVal: this.value,
      isPickup: true // 默认显示展开按钮
    }
  },
  computed: {
    list: {
      get() {
        if (this.isPickup) {
          return this.options.slice(0, +this.length)
        }
        return this.options
      },
      set() {}
    },
    flexBasic() {
      return mul(div(1, this.columnNum), 100)
    },
    showPickup() {
      return this.options.length > +this.length
    }
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
      this.defaultVal = initData.defaultVal
    },
    handleToggle() {
      this.isPickup = !this.isPickup
    }
  }
}
</script>

<style lang="less" scoped>
.radio-field-wrapper {
  .gird {
    &-item {
      box-sizing: border-box;
      /deep/ .grid-item__content {
        .grid-item__text {
          flex: 1;
          font-size: 13px;
          .van-radio {
            flex: 1;
            justify-content: center;
          }
          .van-radio__icon {
            display: none;
          }
          .van-radio__label {
            flex: 1;
            margin-left: 0;
            padding: 6px 8px;
            box-sizing: border-box;
            border-radius: 6px;
            overflow: hidden;
            text-align: center;
            color: @color-tip;
            background-color: #f0f0f0;
          }
          .van-radio__icon--checked {
            & + .van-radio__label {
              color: @color-blue;
              background: rgba(107, 186, 255, 0.15);
            }
          }
        }
      }
    }
  }
}
</style>
