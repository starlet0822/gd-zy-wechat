<!--
 * @Description: 点击多选类型
 * @Author: wuxxing
 * @LastEditTime: 2022-04-22 18:11:45
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
    <van-checkbox-group v-model="defaultVal" ref="checkboxGroup">
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
              <van-checkbox :name="item.value" @click="onCheckboxChange(item)">
                {{ item.label }}
              </van-checkbox>
            </div>
          </div>
        </div>
      </div>
    </van-checkbox-group>
  </div>
</template>

<script>
import { div, mul } from '@/utils/calculate'
import { _isEqual } from '@/utils/is'
import { RootValue } from '@/config/constants'
export default {
  name: 'CheckboxField',
  props: {
    field: String,
    label: String,
    placeholder: {
      type: String,
      default: '多选'
    },
    value: [Array],
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
    // 开启全选/反选
    canAll: Boolean,
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
      this.result[this.field] = this.defaultVal.join(',')
    },
    // 重置绑定值
    resetDefaultVal() {
      const initData = this.$options.data.call(this)
      if (_isEqual(this.defaultVal, initData.defaultVal)) return
      console.log(`重置${this.field}`)
      this.defaultVal = initData.defaultVal
    },
    handleToggle() {
      this.isPickup = !this.isPickup
    },
    onCheckboxChange({ label, value }) {
      console.log('onCheckboxChange', label, value)
      // const allItem = this.options.find((v) => v.value === 'all')
      // let isAll = false
      // isAll = this.defaultVal.length === this.options.length - 1 // 选中的项目总数
      // if (isAll && !this.defaultVal.includes('all')) {
      //   this.$refs.checkboxGroup.toggleAll(isAll)
      //   allItem.label = isAll ? '反选' : '全选'
      // }
      // if (value === 'all') {
      //   isAll = this.defaultVal.includes('all')
      //   this.$refs.checkboxGroup.toggleAll(isAll)
      //   allItem.label = isAll ? '反选' : '全选'
      // }
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
          .van-checkbox {
            flex: 1;
            justify-content: center;
          }
          .van-checkbox__icon {
            display: none;
          }
          .van-checkbox__label {
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
          .van-checkbox__icon--checked {
            & + .van-checkbox__label {
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
