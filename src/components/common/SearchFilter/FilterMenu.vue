<!--
 * @Description: 筛选页
 * @Author: wuxxing
 * @LastEditTime: 2022-04-22 15:34:16
-->
<template>
  <div class="filterMenu-wrapper vh-bg-white">
    <!-- 标题 -->
    <!-- 筛选组 -->
    <div class="filter-main">
      <template v-if="list && list.length">
        <div ref="filterItemRef" v-for="(pItem, pIndex) in list" :key="pIndex" class="filter-item">
          <component
            ref="fieldRef"
            :is="componentId(pItem)"
            v-bind="{ key: pItem.label, ...pItem, result }"
          ></component>
          <!-- <RadioField
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
          ></DateField> -->
        </div>
      </template>
      <vh-tip v-else description="暂未配置筛选项"></vh-tip>
    </div>
    <!-- 底部按钮 -->
    <footer class="filter-footer">
      <div class="filter-button__content vh-flex-ac vh-border-t-1">
        <div
          v-waves
          class="filter-button filter-button--reset vh-flex-center vh-bg-white vh-flex1 vh-color-blue"
          @click.stop="filterReset('fieldRef')"
        >
          重置
        </div>
        <div
          v-waves
          class="filter-button filter-button--confirm vh-flex-center vh-flex2 vh-color-white"
          @click.stop="filterConfirm('fieldRef')"
        >
          确定
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { RadioField, CheckboxField, InputField, SelectField, DateField } from './components/index'
import { isArray } from '@/utils/is'
import { isEqual } from 'lodash-es'
export default {
  name: 'FilterMenu',
  components: {
    RadioField,
    CheckboxField,
    InputField,
    SelectField,
    DateField
  },
  props: {
    filterMenu: {
      // required: () => {
      //   console.log(this)
      //   return this.showFilter
      // },
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
        // {
        //   field: 'empName',
        //   label: '申请人',
        //   placeholder: '请输入',
        //   type: 'input',
        //   value: ''
        // },
        // // 输入框
        // {
        //   field: 'billNo',
        //   label: '申请单据号',
        //   placeholder: '请输入',
        //   type: 'input',
        //   value: ''
        // },
        // // 输入框
        // {
        //   field: 'applyDeptCode',
        //   label: '申请科室',
        //   placeholder: '请输入',
        //   type: 'input',
        //   value: ''
        // },
        // // 范围 选择（e.g:时间区间|价格区间等） TODO
        // // 输入框
        // {
        //   // field: 'createDate',
        //   field: ['applyDate', 'applyEndDate'],
        //   label: '申请时间',
        //   placeholder: ['开始时间', '结束时间'],
        //   type: 'date',
        //   value: ''
        // }
      ],
      validator(val) {
        return isArray(val)
      }
    }
    // 是否开启过滤，默认开启
    // showFilter: {
    //   type: Boolean,
    //   default: false
    // }
  },
  watch: {
    filterMenu: {
      handler(newVal, oldVal) {
        if (isEqual(newVal, oldVal)) return false
        console.log(newVal)
        this.handleResult(newVal)
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      activeArr: [0],
      list: this.filterMenu,
      result: {} // 筛选结果
    }
  },
  methods: {
    // 处理已注册组件名称
    componentId({ type: name }) {
      return `${name}-field`
    },
    // 初始化筛选数据结构
    handleResult(data) {
      data.forEach((item) => {
        const { type, field, value } = item
        if (type === 'input') {
          this.result[field] = value
        }
        // 特殊处理日期筛选
        if (type === 'date') {
          if (isArray(value)) {
            field.forEach((k, i) => {
              this.result[k] = value[i]
            })
          } else {
            this.result[field] = value
          }
        }
      })
      console.log('初始化筛选数据结构', this.result)
    },
    // 取消
    filterCancel() {
      this.$emit('cancel')
    },

    // 重置
    filterReset(refName) {
      this.$toast({
        type: 'loading',
        message: `重置中...`,
        duration: 0,
        forbidClick: true,
        getContainer: () => {
          return this.$el.querySelector('.filter-main')
        }
      })
      this.$nextTick(function () {
        const fieldRefs = this.$refs[refName]
        console.log('fieldRefs', fieldRefs)
        fieldRefs.forEach((fieldRef, index) => {
          fieldRef.resetDefaultVal()
          if (index === fieldRefs?.length - 1) {
            this.$toast.clear()
          }
        })
      })
    },

    // 确定
    filterConfirm(refName) {
      const { result } = this // 筛选后的结果
      // this.$nextTick(function () {
      const fieldRefs = this.$refs[refName]
      console.log('fieldRefs', fieldRefs)
      fieldRefs.forEach((fieldRef) => {
        fieldRef.setDefaultVal()
        // TODO 过滤掉值为空的字段
        for (const key in result) {
          if (key && String(result[key]).trim() === '') {
            this.$delete(result, key)
          }
        }
      })
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
    /deep/.van-toast {
      position: absolute;
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
