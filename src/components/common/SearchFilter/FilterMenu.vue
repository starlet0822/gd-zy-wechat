<!--
 * @Description: 筛选页
 * @Author: wuxxing
 * @LastEditTime: 2022-03-23 18:17:44
-->
<template>
  <div class="filterMenu-wrapper vh-bg-white">
    <!-- 标题 -->
    <!-- 筛选组 -->
    <div class="filter-main vh-p-box2">
      <div v-for="(pItem, pIndex) in list" :key="pIndex" class="filter-item">
        <van-collapse v-model="activeArr" :border="false">
          <!-- :value="`${activeArr.includes(pIndex) ? '收起' : '展开'}`" -->
          <van-collapse-item :name="pIndex" :title="pItem.label" title-class="vh-color-text">
            <template #default>
              <div v-if="pItem.type !== 'tree'" class="vh-flex-wrap st-padding-box">
                <div
                  v-for="(cItem, cIndex) in pItem.data"
                  :key="cIndex"
                  :class="[
                    'filter-item-label',
                    'st-line-16',
                    'van-ellipsis',
                    { 'is-check': cItem.checked }
                  ]"
                  @click="filterLabelSelect(cItem, cIndex, pItem, pIndex)"
                >
                  {{ cItem.label }}
                </div>
              </div>
            </template>
            <!--级联选择-->
            <!-- <van-cascader
              v-else
              :key="pIndex"
              ref="cascaderRef"
              v-model="pItem.value"
              :field-names="{ text: 'label', value: 'value', children: 'children' }"
              :options="pItem.data"
              :active-color="activeColor"
              class="cascader-tree"
              placeholder="请选择"
              @close="show = false"
              @finish="onFinish($event, pItem, pIndex)"
            >
              <template #title>
                <div></div>
              </template>
            </van-cascader> -->
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <!-- 底部按钮 -->
    <footer class="filter-footer">
      <div class="filter-button-box vh-flex-ac vh-border-t-1">
        <!-- <div
          class="filter-button-cancel vh-flex-center vh-bg-white vh-flex1 vh-border-r-1"
          @click.stop="filterCancel"
        >
          取消
        </div> -->
        <div
          class="filter-button-reset vh-flex-center vh-bg-white vh-flex1 vh-color-blue"
          @click.stop="filterReset"
        >
          重置
        </div>
        <div
          v-waves
          class="filter-button-confirm vh-flex-center vh-flex2 vh-color-white"
          @click.stop="filterConfirm"
        >
          确定
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { isArray } from 'lodash-es'
export default {
  name: 'FilterMenu',
  props: {
    filterMenu: {
      type: Array,
      default: () => [
        // 复杂数据（有层级关联的） TODO:待做
        // 级联数据 TODO
        // {
        //   field: 'location',
        //   label: '地点',
        //   value: '',
        //   // 特殊场景字段
        //   type: 'tree',
        //   data: [
        //     {
        //       label: '浙江省',
        //       value: '330000',
        //       children: [{ label: '杭州市', value: '330100' }]
        //     },
        //     {
        //       label: '江苏省',
        //       value: '320000',
        //       // children: [{ label: '南京市', value: '320100' }],
        //       children: null // 无子级则 children取值须为 null
        //     }
        //   ]
        // },
        // 普通筛选 数据结构（无关联关系的）
        {
          field: 'status',
          label: '状态',
          value: '',
          // canAll: true, // TODO:是否开启全选功能 可以默认请求所有就无需添加该字段
          // multiple: false, // 是否开启多选 TODO:先不做
          data: [
            {
              label: '未审核',
              value: '-1'
            },
            {
              label: '已审核',
              value: '0'
            },
            {
              label: '审核未通过',
              value: '1'
            }
          ]
        }

        // 范围 选择（e.g:时间区间|价格区间等） TODO
      ],
      validator(val) {
        return isArray(val)
      }
    }
  },
  components: {},
  data() {
    return {
      activeArr: [0],
      list: []
    }
  },
  created() {},
  watch: {
    filterMenu: {
      handler(filterMenu, oldFilterMenu) {
        if (filterMenu === oldFilterMenu) return
        console.log('filterMenu')
        this.list = filterMenu
        this.list.forEach((item, index) => {
          if (item.data && item.data.length) {
            item.data.forEach((v) => {
              v.checked = false
            })
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // filterConfirm() {},
    // filterReset() {},
    filterCancel() {
      this.$emit('cancel')
    },
    // 点击 筛选选择项
    filterLabelSelect(cItem, cIndex, pItem, pIndex) {
      console.log(' 点击选择项', cItem, cIndex, pItem, pIndex)
      // console.log(cItem.value)
      // 点击全部选择项时
      // if (cItem.value === 'all') {
      //   cItem.checked = !cItem.checked
      //   cItem.label = cItem.checked ? '反选' : '全选'
      //   pItem.data.forEach((v) => (v.checked = cItem.checked)) // 切换当前操作的筛选项的所有状态
      // }
      // 点击普通选择项
      if (cItem.value !== 'all') {
        cItem.checked = !cItem.checked // 切换当前被点击项状态
        // this.$set(this.list[pIndex].data[cIndex], 'checked', !cItem.checked)
        // this.list[pIndex].data[cIndex].checked = !cItem.checked
        this.list[pIndex].data.splice(cIndex, 1, cItem)
        // console.log('切换后', cItem.checked)

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
    },

    // 重置
    filterReset() {
      this.list.forEach((item, index) => {
        // if (item.type && item.type === 'tree') {
        //   // 特殊处理层级关联类型的值
        //   item.valueShow = ''
        //   item.value = ''
        // }
        if (item.data && item.data.length) {
          item.data.forEach((v, i) => {
            v.checked = false
            // this.$set(v, 'checked', false)
            this.list[index].data.splice(i, 1, v)
            // if (v.value === 'all') {
            //   v.label = '全选'
            // }
          })
        }
      })
    },

    // 确定
    filterConfirm() {
      const result = {} // 筛选后的结果
      this.list.forEach((v) => {
        if (v.data && v.data.length) {
          const checkedArr = v.data.reduce((count, pre) => {
            if (pre.value !== 'all' && pre.checked) {
              count.push(pre.value)
            }
            return count
          }, [])
          // console.log(checkedArr)
          // 处理级联数据value
          if (v.type === 'tree' && v.value !== '') {
            result[v.field] = v.value
          }
          // 过滤掉无效参数 所有选项value是否不为 ''
          if (checkedArr.join(',') !== '') {
            result[v.field] = checkedArr.join(',')
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
  position: relative;
  .filter-main {
    // position: absolute;
    // bottom: 48px;
    // left: 0;
    .filter-item {
      //padding: 15px 12px 8px;
      /deep/ .van-cell__value {
        color: #8c8c8c;
      }
      .filter-item-label {
        flex: 0 0 calc(1 * (94%) / 3);
        height: 34px;
        text-align: center;
        line-height: 34px;
        padding: 0 8px;
        box-sizing: border-box;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        background: #f0f0f0;

        &:nth-child(3n) {
          margin-right: 0;
        }
      }

      .is-check {
        color: @color-blue;
        // border: 1PX solid @color-blue;
        box-sizing: border-box;
        background: rgba(107, 186, 255, 0.1);
      }
    }
  }
  .filter-footer {
    height: 48px;
    .filter-button-box {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;

      .filter-button-reset {
        // background: @color-bg;
        height: 48px;
      }

      .filter-button-confirm {
        background: @color-blue;
        color: #fff;
        height: 48px;
      }
    }
  }
}
</style>
