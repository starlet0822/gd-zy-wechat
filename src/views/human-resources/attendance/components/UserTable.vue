<!--
 * @Description: 表格
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 11:16:31
-->
<template>
  <div class="fake-table">
    <el-table
      :class="{ inner: !tableData.length }"
      :data="tableData"
      :style="tableStyle"
      border
      stripe
    >
      <template v-for="column in columns">
        <el-table-column
          :key="column.prop"
          :fixed="column.fixed"
          :label="column.label"
          :min-width="column.minWidth"
        >
          <template v-slot="{ row }">
            <span>{{ row[column.prop] || (column.dataType === -99 ? '' : 0) }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
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
      return this.headData.map((v) => {
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
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.fake-table {
  /deep/.inner {
    .el-table__header-wrapper {
      overflow: auto;
    }
  }
}
</style>
