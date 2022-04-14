<!--
 * @Description: 筛选页
 * @Author: wuxxing
 * @LastEditTime: 2022-04-14 10:55:14
-->
<template>
  <div class="filterMenu-wrapper vh-bg-white">
    <!-- 标题 -->
    <!-- 筛选组 -->
    <div class="filter-main vh-p-box2">
      <div v-for="(pItem, pIndex) in filterMenu" :key="pIndex" class="filter-item">
        <RadioField
          ref="radioFieldRef"
          v-if="pItem.type === 'radio'"
          :key="pItem.label"
          v-bind="{ ...pItem, result }"
          @change="handleChangeRadio($event, pItem)"
        ></RadioField>
        <SelectField
          ref="selectFieldRef"
          v-if="pItem.type === 'select'"
          :key="pItem.label"
          v-bind="{ ...pItem, result }"
          @change="handleSelect($event, pItem)"
        ></SelectField>
        <InputField
          ref="inputFieldRef"
          v-if="pItem.type === 'input'"
          :key="pItem.label"
          v-bind="{ ...pItem, result }"
          @input="handleInput($event, pItem)"
        ></InputField>
        <DateField
          ref="dateFieldRef"
          v-if="pItem.type === 'date'"
          :key="pItem.label"
          v-bind="{ ...pItem, result }"
          @change="handleChangeDate($event, pItem)"
        ></DateField>
      </div>
    </div>
    <!-- 底部按钮 -->
    <footer class="filter-footer">
      <div class="filter-button__content vh-flex-ac vh-border-t-1">
        <!-- <div
          class="filter-button filter-button--cancel vh-flex-center vh-bg-white vh-flex1 vh-border-r-1"
          @click.stop="filterCancel"
        >
          取消
        </div> -->
        <div
          v-waves
          class="filter-button filter-button--reset vh-flex-center vh-bg-white vh-flex1 vh-color-blue"
          @click.stop="filterReset"
        >
          重置
        </div>
        <div
          v-waves
          class="filter-button filter-button--confirm vh-flex-center vh-flex2 vh-color-white"
          @click.stop="filterConfirm"
        >
          确定
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { RadioField, InputField, SelectField, DateField } from './components/index'
import { isArray } from 'lodash-es'
export default {
  name: 'FilterMenu',
  components: {
    RadioField,
    InputField,
    SelectField,
    DateField
  },
  props: {
    filterMenu: {
      type: Array,
      default: () => [
        // 复杂数据（有层级关联的） TODO:待做
        // 普通筛选 数据结构（无关联关系的）
        // {
        //   field: 'status',
        //   label: '状态',
        //   value: '',
        //   type: 'radio', // 单选
        //   // canAll: true, // TODO:是否开启全选功能 可以默认请求所有就无需添加该字段
        //   // multiple: false, // 是否开启多选 TODO:先不做
        //   options: [
        //     { label: '未审核', value: '-1' },
        //     { label: '已审核', value: '0' },
        //     { label: '未通过', value: '1' },
        //     { label: '审核中', value: '2' },
        //     { label: '已退回', value: '3' }
        //   ]
        // },
        // pick选择
        // {
        //   field: 'department',
        //   label: '科室',
        //   // placeholder: '请输入',
        //   type: 'select',
        //   value: '',
        //   options: [
        //     { text: '请选择', value: '' },
        //     { text: '科室1', value: '0' },
        //     { text: '科室2', value: '1' },
        //     { text: '科室3', value: '2' }
        //   ]
        // },
        // 输入框
        {
          field: 'empName',
          label: '申请人',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        // 输入框
        {
          field: 'billNo',
          label: '申请单据号',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        // 输入框
        {
          field: 'applyDeptCode',
          label: '申请科室',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        // 范围 选择（e.g:时间区间|价格区间等） TODO
        // 输入框
        {
          // field: 'createDate',
          field: ['applyDate', 'applyEndDate'],
          label: '申请时间',
          placeholder: ['开始时间', '结束时间'],
          type: 'date',
          value: ''
        }
      ],
      validator(val) {
        return isArray(val)
      }
    }
  },
  data() {
    return {
      activeArr: [0],
      list: this.filterMenu,
      result: {} // 筛选结果
    }
  },
  created() {},

  methods: {
    handleInput(val, item) {
      console.log('handleInput', val, item)
      this.result[item.field] = val.trim()
    },
    handleSelect(val, item) {
      console.log('handleSelect', val, item)
      this.result[item.field] = val
    },
    handleChangeRadio(val, item) {
      console.log('handleChangeRadio', val, item)
      this.result[item.field] = val
    },
    handleChangeDate(val, item) {
      console.log('handleChangeDate', val, item)
      if (isArray(item.field) && item.field?.length >= 1) {
        const [startField, endField] = item.field
        const [startVal, endVal] = val
        // 字段为数组时先这样赋值
        this.result[startField] = startVal
        this.result[endField] = endVal
      } else {
        this.result[item.field] = val
      }
    },
    // 取消
    filterCancel() {
      this.$emit('cancel')
    },

    // 重置
    filterReset() {
      this.list.forEach((item, index) => {
        // if (item.type && item.type === 'tree') {
        //   // 特殊处理层级关联类型的值
        //   item.valueShow = ''
        //   item.value = ''
        // }
        if (item.type && item.type === 'input') {
          item.value = ''
          this.result[item.field] = ''
          // 获取dom
          const inputFieldRef = this.$refs.inputFieldRef
          console.log(inputFieldRef)
          inputFieldRef.forEach((ref) => {
            ref.defaultVal = ''
          })
        }

        if (item.type && item.type === 'select') {
          item.value = ''
          this.result[item.field] = ''
          // 获取dom
          const selectFieldRef = this.$refs.selectFieldRef
          console.log(selectFieldRef)
          selectFieldRef.forEach((ref) => {
            ref.defaultVal = ''
          })
        }

        if (item.type && item.type === 'date') {
          item.value = ''
          if (isArray(item.field) && item.field?.length >= 1) {
            const [startField, endField] = item.field
            // 字段为数组时先这样赋值
            this.result[startField] = ''
            this.result[endField] = ''
          } else {
            this.result[item.field] = ''
          }
          // 获取dom
          const dateFieldRef = this.$refs.dateFieldRef
          dateFieldRef.forEach((ref) => {
            ref.defaultVal = ['', '']
          })
        }

        if (item.type && item.type === 'radio') {
          item.value = ''
          this.result[item.field] = ''
          // 获取dom
          const radioFieldRef = this.$refs.radioFieldRef
          radioFieldRef.forEach((ref) => {
            ref.defaultVal = ''
          })

          if (item.options && item.options.length) {
            item.options.forEach((v, i) => {
              v.checked = false
              this.list[index].options.splice(i, 1, v)
              // if (v.value === 'all') {
              //   v.label = '全选'
              // }
            })
          }
        }

        // if (item.options && item.options.length) {
        //   item.options.forEach((v, i) => {
        //     v.checked = false
        //     // this.$set(v, 'checked', false)
        //     this.list[index].options.splice(i, 1, v)
        //     // if (v.value === 'all') {
        //     //   v.label = '全选'
        //     // }
        //   })
        // }
      })
    },

    // 确定
    filterConfirm() {
      const { result } = this // 筛选后的结果
      // this.list.forEach((v) => {
      //   // input 类型
      //   if ((v.type === 'input') & (v.value.trim() !== '')) {
      //     result[v.field] = v.value
      //   }
      //   if (v.options && v.options.length) {
      //     const checkedArr = v.options.reduce((count, pre) => {
      //       if (pre.value !== 'all' && pre.checked) {
      //         count.push(pre.value)
      //       }
      //       return count
      //     }, [])
      //     // console.log(checkedArr)
      //     // 处理级联数据value
      //     if (v.type === 'tree' && v.value !== '') {
      //       result[v.field] = v.value
      //     }
      //     // 过滤掉无效参数 所有选项value是否不为 ''
      //     if (checkedArr.join(',') !== '') {
      //       result[v.field] = checkedArr.join(',')
      //     }
      //   }
      // })
      // TODO 过滤掉值为空的字段
      for (const key in result) {
        if (key && String(result[key]).trim() === '') {
          this.$delete(result, key)
        }
      }
      const noEmptyObj = Object.keys(result).length !== 0 // 有数据
      console.log('result', result, noEmptyObj)
      this.$emit('confirm', result, noEmptyObj)
    }
  }
}
</script>

<style lang="less" scoped>
.filterMenu-wrapper {
  min-height: 100%;
  .filter-main {
    .filter-item {
      //padding: 15px 12px 8px;
      // /deep/ .van-cell__value {
      //   color: #8c8c8c;
      // }
    }
  }
  .filter-footer {
    height: 48px;
    .filter-button__content {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      .filter-button {
        height: 48px;
      }
      .filter-button--reset {
        background: @color-bg;
      }

      .filter-button--confirm {
        background: @color-blue;
        color: #fff;
      }
    }
  }
}
</style>
