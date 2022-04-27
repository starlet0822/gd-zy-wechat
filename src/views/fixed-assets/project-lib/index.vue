<!--
 * @Description:资产购置10W以上(项目库)
 * @Author: wuxxing
 * @LastEditTime: 2022-04-27 09:08:05
-->
<template>
  <div class="asset-project-lib-wrapper vh-bg">
    <vh-nav-bar :left-arrow="true"></vh-nav-bar>
    <search-filter
      v-model.trim="parameters.queryTerm"
      @search="handleSearch"
      @confirm="handleFilterConfirm"
      :filter-menu="filterMenu"
    ></search-filter>
    <van-tabs v-model="tabActive" animated sticky offset-top="1.28rem" @change="onTabsChange">
      <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" :name="tab.id">
        <!-- 列表 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :error.sync="error"
            :finished="finished"
            :finished-text="finishedText"
            @load="onLoad"
          >
            <div
              class="list-item vh-p-10 vh-bg-white vh-rounded-6"
              v-for="item in dataList"
              :key="item.billId"
              v-waves
              @click="toCheck(item)"
            >
              <div class="vh-flex-jb-ac">
                <div class="vh-title">{{ item.title }}</div>
                <div class="vh-color-tip">{{ item.dateTime | formatDate('YYYY-MM-DD') }}</div>
              </div>
              <div
                class="vh-flex-ac"
                v-for="(field, fieldIndex) in item.formData.filter((v) => v.isShow === 1)"
                :key="fieldIndex"
              >
                <span class="vh-color-tip">{{ field.fieldKey }}：</span>
                <span :class="{ 'vh-color-blue': field.fieldName === 'approval_no' }">
                  {{ field.fieldValue }}
                </span>
              </div>
              <div class="btn-status">
                <!-- :color="checkStatus.get(item.checkState).color"
                    :text="checkStatus.get(item.checkState).text" -->
                <TagBox plain size="medium" :color="tagColor" :text="item.checkState"></TagBox>
              </div>
            </div>
            <vh-tip v-if="dataList.length === 0 && !loading"></vh-tip>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import vars from '@/assets/css/vars.less'
import { typeCode, checkStatus } from '@/config/constants'
import { findFixCheckList } from '@/api/modules/common'
import list from '@/mixins/list'
import SearchFilter from '@comp/common/SearchFilter'
import TagBox from '@comp/common/TagBox'
export default {
  name: 'AssetProjectLib',
  mixins: [list],
  components: {
    SearchFilter,
    TagBox
  },
  data() {
    return {
      tagColor: vars.colorOrange,
      checkStatus, // 审批状态
      typeCode: typeCode.get('approval_apply'),
      filterMenu: [
        // 筛选菜单
        {
          field: 'billNo',
          label: '申请单号',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        {
          field: 'deptCode', // TODO
          label: '申请科室',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        {
          field: ['applyDate', 'applyEndDate'],
          // field: 'applyDate',
          label: '申请日期',
          placeholder: ['开始', '结束'],
          type: 'date',
          value: ['', '']
          // value: '2022-04-01'
        }
        // {
        //   field: 'empName',
        //   label: '申请人',
        //   placeholder: '请输入',
        //   type: 'input',
        //   value: ''
        // },
        // {
        //   field: 'billNo',
        //   label: '立项单号',
        //   placeholder: '请输入',
        //   type: 'input',
        //   value: ''
        // },
        // {
        //   field: 'applyDeptCode',
        //   label: '立项类型',
        //   placeholder: '请输入',
        //   type: 'input',
        //   value: ''
        // },
        // {
        //   field: ['applyDate', 'applyEndDate'],
        //   label: '制单日期',
        //   placeholder: ['起始', '结束'],
        //   type: 'date',
        //   value: ''
        // }
      ]
    }
  },
  created() {},
  methods: {
    // 获取数据列表
    async getList() {
      try {
        // 组织请求参数
        const params = {
          typeCode: this.typeCode,
          pageRequest: this.pageRequest,
          parameters: { ...this.parameters, ...this.filterQuery }
        }
        const {
          errcode,
          data: { dataList: data, totalSize }
        } = await findFixCheckList(params)
        if (errcode === '0') {
          this.totalSize = totalSize
          if (params.pageRequest.pageNum === 1) {
            this.dataList = data || []
          } else {
            this.dataList = this.dataList.concat(data || [])
          }
          if (this.dataList.length < this.totalSize) {
            params.pageRequest.pageNum = params.pageRequest.pageNum + 1
          }
        }
        if (this.dataList.length >= this.totalSize) this.finished = true
      } catch (e) {
        console.error('捕获异常', e)
        this.error = true
        this.pageRequest.pageNum = 1 // 重置为初始页码
      } finally {
        this.refreshing = false
        this.loading = false
      }
    },
    // 审批
    toCheck({ billId }) {
      this.$router.push(`/asset-project-lib-check/${billId}/${this.tabActive}`)
    },
    // 搜索
    handleSearch(val) {
      console.log('handleSearch', val)
      this.parameters.queryTerm = val
      this.onRefresh()
    },
    // 筛选回调
    handleFilterConfirm(query) {
      console.log('筛选回调', query)
      this.filterQuery = query
      this.onRefresh()
    },
    // 标签页切换
    onTabsChange(id, title) {
      console.log(id)
      this.parameters.dataState = id
      this.onRefresh()
    }
  }
}
</script>

<style lang="less" scoped>
.asset-project-lib-wrapper {
  .list-item {
    margin: 10px;
    .btn-status {
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
