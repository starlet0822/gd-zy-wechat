<!--
 * @Description:资产购置
 * @Author: wuxxing
 * @LastEditTime: 2022-05-05 09:16:10
-->
<template>
  <div class="asset-purchase-wrapper vh-bg">
    <vh-nav-bar></vh-nav-bar>
    <van-tabs v-model="tabActive" animated sticky offset-top="1.28rem" @change="onTabsChange">
      <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" :name="tab.id">
        <search-filter
          ref="searchFilterRef"
          :key-id="tab.id"
          :value.sync="parameters.queryTerm"
          :placeholder="fixPlaceholder"
          @search="handleSearch"
          @confirm="handleFilterConfirm"
          :filter-menu="filterMenu"
        ></search-filter>
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
                <span :class="{ 'vh-color-blue': field.fieldName === 'purc_no' }">
                  {{ field.fieldValue || '--' }}
                </span>
              </div>
              <div class="btn-status">
                <!-- :color="checkStatus.get(item.checkState).color"
                    :text="checkStatus.get(item.checkState).text" -->
                <TagBox plain size="medium" :color="tagColor" :text="item.checkState"></TagBox>
              </div>
            </div>
            <vh-tip v-bind="tip" v-if="dataList.length === 0 && !loading"></vh-tip>
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
  name: 'AssetPurchase',
  mixins: [list],
  components: {
    SearchFilter,
    TagBox
  },
  data() {
    return {
      tagColor: vars.colorOrange,
      checkStatus, // 审批状态
      typeCode: typeCode.get('acquisition')
      // filterMenu: [
      //   // 筛选菜单
      //   // {
      //   //   field: 'status',
      //   //   label: '状态',
      //   //   type: 'radio', // 单选
      //   //   value: '',
      //   //   // canAll: true, // TODO:是否开启全选功能 可以默认请求所有就无需添加该字段
      //   //   // multiple: false, // 是否开启多选 TODO:先不做
      //   //   options: [
      //   //     { label: '未审核', value: '-1' },
      //   //     { label: '已审核', value: '0' },
      //   //     { label: '未通过', value: '1' },
      //   //     { label: '审核中', value: '2' },
      //   //     { label: '已退回', value: '3' },
      //   //     { label: '已退回', value: '3' },
      //   //     { label: '已退回', value: '3' },
      //   //     { label: '已退回', value: '3' },
      //   //     { label: '已退回', value: '3' },
      //   //     { label: '已退回', value: '3' }
      //   //   ]
      //   // },
      //   // {
      //   //   field: 'status2',
      //   //   label: '状态',
      //   //   type: 'checkbox', // 多选
      //   //   value: [],
      //   //   // canAll: true, // TODO:是否开启全选功能 可以默认请求所有就无需添加该字段
      //   //   options: [
      //   //     // { label: '全选', value: 'all' },
      //   //     { label: '未审核', value: '-1' },
      //   //     { label: '已审核', value: '0' },
      //   //     { label: '未通过', value: '1' },
      //   //     { label: '审核中', value: '2' },
      //   //     { label: '已退回', value: '3' }
      //   //     // { label: '已退回', value: '3' },
      //   //     // { label: '已退回', value: '3' },
      //   //     // { label: '已退回', value: '3' },
      //   //     // { label: '已退回', value: '3' },
      //   //     // { label: '已退回', value: '3' }
      //   //   ]
      //   // },
      // ]
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
        const res = await findFixCheckList(params)
        if (res.errcode === '0') {
          const { dataList: data, totalSize } = res.data
          this.totalSize = totalSize
          if (params.pageRequest.pageNum === 1) {
            this.dataList = data || []
          } else {
            this.dataList = this.dataList.concat(data || [])
          }
          if (this.dataList.length < this.totalSize) {
            params.pageRequest.pageNum = params.pageRequest.pageNum + 1
          }
          if (this.dataList.length === 0) {
            this.tip.icon = 'empty'
          }
        }
        if (this.dataList.length >= this.totalSize) this.finished = true
      } catch (e) {
        console.error('捕获异常', e)
        this.tip.icon = 'network'
        this.error = true
        this.pageRequest.pageNum = 1 // 重置为初始页码
      } finally {
        this.refreshing = false
        this.loading = false
      }
    },
    // 审批
    toCheck({ billId }) {
      this.$router.push(`/asset-purchase-check/${billId}/${this.tabActive}`)
    }
  }
}
</script>

<style lang="less" scoped>
.asset-purchase-wrapper {
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
