<!--
 * @Description: 点击选择类型
 * @Author: wuxxing
 * @LastEditTime: 2022-03-25 10:22:16
-->
<template>
  <div class="radio-field-wrapper vh-bg2">
    <van-cell class="vh-border-0" title-class="vh-color-text" :title="label"></van-cell>
    <div class="gird vh-flex-wrap" :style="{ 'padding-left': '16px' }">
      <div
        class="gird-item"
        :style="{
          flex: '0 0 33.333%',
          'padding-right': '16px',
          'margin-top': index >= 3 ? '10px' : '0'
        }"
        v-for="(item, index) in list"
        :key="index"
      >
        <div :class="['grid-item__content', 'vh-flex-center', { 'is-check': item.checked }]">
          <div :class="['grid-item__text']" @click="onSelectLabel(item, index)">
            {{ item.label }}
          </div>
        </div>
        <!-- <div
          v-for="(item, index) in list"
          :key="index"
          :class="['filter-item-label', 'vh-line-16', 'van-ellipsis', { 'is-check': item.checked }]"
          @click="onSelectLabel(item, index)"
        >
          {{ item.label }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioField',
  props: {
    field: String,
    label: String,
    // placeholder: {
    //   type: String,
    //   default: '请输入'
    // },
    value: [String, Number],
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
  watch: {
    options: {
      handler(options, oldOptions) {
        if (options === oldOptions) return
        this.list = options
        this.list.forEach((item) => {
          item.checked = false
        })
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      list: [],
      defaultVal: ''
    }
  },
  created() {},
  methods: {
    // 点击 筛选选择项
    onSelectLabel(item, index) {
      console.log(' 点击选择项', item, index)
      // console.log(cItem.value)
      // 点击全部选择项时
      // if (cItem.value === 'all') {
      //   cItem.checked = !cItem.checked
      //   cItem.label = cItem.checked ? '反选' : '全选'
      //   pItem.data.forEach((v) => (v.checked = cItem.checked)) // 切换当前操作的筛选项的所有状态
      // }
      // 点击普通选择项
      // const checkedArr = []
      if (item.value !== 'all') {
        item.checked = !item.checked // 切换当前被点击项状态
        // this.$set(this.list[pIndex].data[cIndex], 'checked', !cItem.checked)
        // this.list[pIndex].data[cIndex].checked = !cItem.checked
        this.list.splice(index, 1, item)
        // console.log('切换后', cItem.checked)
        // if (item.checked) checkedArr.push(item.value)
        // console.log('checkedArr', checkedArr)
        // const checkedLen = pItem.data.filter((v) => v.value !== 'all' && v.checked).length
        // console.log('非全部按钮已选中的个数', checkedLen)
        // if (pItem.hasOwnProperty('canAll') && pItem.canAll === true) {
        //   pItem.data[0].checked = checkedLen === pItem.data.length - 1
        //   pItem.data[0].label = checkedLen === pItem.data.length - 1 ? '反选' : '全选'
        // }
      }
      // 非多选模式则 先把所有数据切换成未选中状态
      // if (pItem.hasOwnProperty('multiple') && !pItem.multiple) {
      //   if (cItem.value !== 'all') {
      //     this.list[pIndex].data.forEach((v) => (v.checked = false))
      //   }
      //   cItem.checked = !cItem.checked // 切换当前被点击项状态
      // }
      const checkedArr = this.list.reduce((count, pre) => {
        if (pre.checked) {
          count.push(pre.value)
        }
        return count
      }, [])
      console.log('checkedArr', checkedArr)
      this.$emit('change', checkedArr.join(','))
      // this.$emit('change', { [this.field]: checkedArr.join(',') })
    }
  }
}
</script>

<style lang="less" scoped>
.radio-field-wrapper {
  .gird {
    &-item {
      box-sizing: border-box;
      .grid-item__content {
        height: 100%;
        padding: 6px 8px;
        box-sizing: border-box;
        border-radius: 6px;
        overflow: hidden;
        background-color: #f0f0f0;
        .grid-item__text {
          color: @color-tip;
          font-size: 13px;
        }
        &.is-check {
          .grid-item__text {
            color: @color-blue;
            font-size: 13px;
          }
        }
      }
      .is-check {
        // border: 1PX solid @color-blue;
        box-sizing: border-box;
        background: rgba(107, 186, 255, 0.1);
      }
    }
    // .filter-item-label {
    //   // flex: 0 0 33.333%;
    //   flex: 0 0 calc(1 * (94%) / 3);
    //   height: 34px;
    //   text-align: center;
    //   line-height: 34px;
    //   padding: 0 8px;
    //   box-sizing: border-box;
    //   margin-right: 5px;
    //   margin-left: 5px;
    //   margin-bottom: 10px;
    //   border-radius: 4px;
    //   background: #f0f0f0;

    //   &:nth-child(3n) {
    //     // margin-right: 0;
    //   }
    // }
  }
}
</style>
