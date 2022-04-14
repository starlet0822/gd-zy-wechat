<!--
 * @Description:资产处置
 * @Author: wuxxing
 * @LastEditTime: 2022-04-14 14:59:29
-->
<template>
  <div class="asset-disposal-wrapper vh-bg">
    <vh-nav-bar :left-arrow="true"></vh-nav-bar>
    <search-filter v-model="query.title" @search="handleSearch"></search-filter>
    <van-tabs v-model="tabActive" animated sticky offset-top="1.28rem" @change="onTabsChange">
      <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" :name="tab.id">
        <!-- 列表 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <router-link
              :to="{ name: 'AssetDisposalCheck' }"
              v-for="(item, index) in dataList"
              :key="item.id + index"
            >
              <div class="list-item vh-p-10 vh-bg-white vh-rounded-6" v-waves>
                <div class="vh-flex-jb-ac">
                  <div class="vh-title">{{ item.title }}</div>
                  <div class="vh-color-tip">{{ item.dateTime | formatDate('YYYY-MM-DD') }}</div>
                </div>
                <div
                  class="vh-flex-ac"
                  v-for="(field, fieldIndex) in item.formData"
                  :key="fieldIndex"
                >
                  <span class="vh-color-tip">{{ field.fieldKey }}：</span>
                  <span :class="{ 'vh-color-blue': field.fieldKey === '处置单号' }">
                    {{ field.fieldValue }}
                  </span>
                </div>
                <!--<div class="vh-flex-ac">
                  <span class="vh-color-tip">申请科室：</span>
                  <span>{{ '设备科' }}</span>
                </div>
                <div class="vh-flex-ac">
                  <span class="vh-color-tip">总预算：</span>
                  <span>{{ '1000.00' }}</span>
                </div> -->
                <div class="btn-status">
                  <TagBox
                    plain
                    size="medium"
                    :color="checkStatus.get(item.checkState).color"
                    :text="checkStatus.get(item.checkState).text"
                  ></TagBox>
                </div>
              </div>
            </router-link>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import vars from '@/assets/css/vars.less'
import { typeCode, dataState, checkStatus } from '@/config/constants'
import { findFixCheckList } from '@/api/modules/common'
import list from '@/mixins/list'
import SearchFilter from '@comp/common/SearchFilter'
import TagBox from '@comp/common/TagBox'
export default {
  name: 'AssetDisposal',
  mixins: [list],
  components: {
    SearchFilter,
    TagBox
  },
  data() {
    return {
      tabs: [],
      tabActive: '0',
      tagColor: vars.colorOrange,
      checkStatus, // 审批状态
      typeCode: typeCode.get('allocation'),
      filterMenu: [
        // 筛选菜单
        {
          field: 'empName',
          label: '申请人',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        {
          field: 'billNo',
          label: '申请单据号',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        {
          field: 'applyDeptCode',
          label: '申请科室',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        {
          field: ['applyDate', 'applyEndDate'],
          label: '申请时间',
          placeholder: ['开始时间', '结束时间'],
          type: 'date',
          value: ''
        }
      ],
      filterQuery: {} // 筛选参数
    }
  },
  created() {
    for (const [k, v] of dataState.entries()) {
      this.tabs.push({ id: k, title: v })
    }
  },
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
    // 审批
    toCheck({ billId }) {
      this.$router.push(`/asset-allocate-check/${billId}`)
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
.asset-disposal-wrapper {
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
