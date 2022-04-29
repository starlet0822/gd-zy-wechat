<!--
 * @Description: 表格
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 11:16:31
-->
<template>
  <div class="fake-table">
    <template>
      <el-table :data="tableData" :style="tableStyle" border stripe>
        <template v-for="column in columns">
          <el-table-column
            :key="column.prop"
            :fixed="column.fixed"
            :label="column.label"
            :min-width="column.minWidth"
          >
            <template v-slot="{ row }">
              <span>{{ row[column.prop] || (row.dataType === -99 ? '' : 0) }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </template>
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import { _isUndefined } from '@/utils/is'
export default {
  name: 'UserTable',
  components: {
    elTable: Table,
    elTableColumn: TableColumn
  },
  props: {
    headData: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tableStyle: {
      get() {
        return {
          width: '100%'
          // height: '250px'
          // height: '6.6667rem'
        }
      }
    },
    columns() {
      const ret = this.headData.map((v) => {
        // const hasVal = this.tableData[0][v.item_code]
        const fixed = ['empCode', 'empName', '!bDeptName', '!cDeptName'].includes(v.itemCode)
        return {
          dataType: v.dataType,
          label: v.itemName,
          prop: v.itemCode,
          fixed: fixed,
          minWidth: fixed ? 90 : 100
        }
      })
      return ret
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@col-padding: 5px;

.fake-table {
  // min-height: 200px;
  // margin: 12px;
  &__head,
  &__body {
    border: 1px solid #dddddd;
    &:not(:last-child) {
      border-bottom: none;
    }
  }
  &__head {
    font-size: 14px;
    background: #f5faff;
    .col {
      // font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      padding: @col-padding;
    }
  }
  &__body {
    .col {
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      padding: 5px 0;
      // padding: @col-padding;
      // padding: @colPaddingLeft @colPaddingLeft @colPaddingLeft
      //   calc(@colPaddingLeft - @inputPaddingLeft);
      // &:last-child {
      //   padding-left: @inputPaddingLeft;
      // }
    }
  }
}
</style>
