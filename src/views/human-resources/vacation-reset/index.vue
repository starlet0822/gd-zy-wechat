<!--
 * @Description: 销假列表
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 11:26:41
-->
<template>
  <div class="vacation-reset-list-wrapper vh-bg">
    <vh-nav-bar @click-right="handleRightClick">
      <template #right>
        <div v-show="showCheckBtn" class="vh-color-white">批量审批</div>
      </template>
    </vh-nav-bar>
    <van-tabs v-model="tabActive" animated sticky offset-top="1.28rem" @change="onTabsChange">
      <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" :name="tab.id">
        <search-filter
          v-model.trim="parameters.queryTerm"
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
                <span :class="{ 'vh-color-blue': field.fieldName === 'apply_code' }">
                  {{ field.fieldValue || '--' }}
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
import { typeCode } from '@/config/constants'
import { findHrCheckList } from '@/api/modules/common'
import list from '@/mixins/list'
import SearchFilter from '@comp/common/SearchFilter'
import TagBox from '@comp/common/TagBox'

export default {
  name: 'VacationReset',
  mixins: [list],
  components: { SearchFilter, TagBox },
  data() {
    return {
      tagColor: vars.colorOrange,
      typeCode: typeCode.get('resetVacation'),
      showMulti: false, // 是否批量
      result: []
    }
  },
  computed: {
    // 是否显示批量审批按钮
    showCheckBtn: {
      get() {
        return this.showMulti && this.result.length > 0
      }
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
      this.$router.push(`/vacation-reset-check/${billId}/${this.tabActive}`)
    },
    // 搜索
    handleSearch(val) {
      this.parameters.queryTerm = val
      this.onRefresh()
    },
    // 标签页切换
    onTabsChange(id, title) {
      this.parameters.dataState = id
      this.onRefresh()
    },
    // 驳回
    handleClickReject() {
      this.$toast({
        message: '已驳回',
        type: 'success',
        duration: 800,
        // overlay: true,
        forbidClick: true
      })
    },
    switchChange(val) {
      console.log('switchChange', val)
      this.showMulti = val
      this.result = []
    },
    // TODO 批量审批
    handleRightClick() {}
  }
}
</script>

<style lang="less" scoped>
.vacation-reset-list-wrapper {
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
