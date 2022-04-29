<!--
 * @Description: 借调审批列表
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 11:26:38
-->
<template>
  <div class="secondment-wrapper vh-bg">
    <vh-nav-bar></vh-nav-bar>
    <van-tabs v-model="tabActive" animated sticky offset-top="1.28rem" @change="onTabsChange">
      <van-tab v-for="tab in tabs" :title="tab.title" :key="tab.id" :name="tab.id">
        <search-filter
          ref="searchFilterRef"
          :key-id="tab.id"
          :value.sync="parameters.queryTerm"
          placeholder="请输入员工姓名"
          @search="handleSearch"
          :can-filter="false"
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
              class="list-item vh-m-10 vh-rounded-6 vh-p-10 vh-bg-white"
              v-for="item in dataList"
              :key="item.billId"
              v-waves
              @click="toCheck(item)"
            >
              <van-row type="flex" align="center">
                <van-col span="22" class="vh-flex-wrap">
                  <p
                    class="vh-pr-40"
                    v-for="(field, fieldIndex) in item.formData.filter((v) => v.isShow === 1)"
                    :key="fieldIndex"
                  >
                    <span class="vh-tip">{{ field.fieldKey }}：</span>
                    <span :class="{ 'vh-color-blue': field.fieldName === 'bill_no' }">
                      {{ field.fieldValue || '--' }}
                    </span>
                  </p>
                </van-col>
                <van-col span="2">
                  <van-icon name="arrow" size="0.64rem" :color="themeColor"></van-icon>
                </van-col>
              </van-row>
            </div>
            <vh-tip v-if="dataList.length === 0 && !loading"></vh-tip>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { themeColor, typeCode } from '@/config/constants'
import { findHrCheckList } from '@/api/modules/common'
import list from '@/mixins/list'
import SearchFilter from '@comp/common/SearchFilter'
export default {
  name: 'Secondment',
  mixins: [list],
  components: {
    SearchFilter
  },
  data() {
    return {
      themeColor,
      typeCode: typeCode.get('toLoan')
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
          parameters: { ...this.parameters }
        }
        const {
          errcode,
          data: { dataList: data, totalSize }
        } = await findHrCheckList(params)
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
      this.$router.push(`/secondment-check/${billId}/${this.tabActive}`)
    },
    // 搜索
    handleSearch(val) {
      this.parameters.queryTerm = val
      this.onRefresh()
    },
    // 标签页切换
    onTabsChange(id, title) {
      this.parameters.dataState = id
      this.parameters.queryTerm = ''
      this.$nextTick(() => {
        const searchFilterRefs = this.$refs.searchFilterRef
        const curSearchFilterRef = searchFilterRefs.find((v) => v.keyId === id)
        this.parameters.queryTerm = curSearchFilterRef.keyword // 获取关键字
        this.onRefresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.secondment-wrapper {
}
</style>
