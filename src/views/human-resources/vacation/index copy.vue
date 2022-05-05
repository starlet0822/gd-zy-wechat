<!--
 * @Description:
 * @Author: wuxxing
 * @LastEditTime: 2022-04-28 16:12:49
-->
<!--
 * @Description: 休假列表
 * @Author: wuxxing
 * @LastEditTime: 2022-04-27 10:20:20
-->
<template>
  <div class="vacation-list-wrapper vh-bg">
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
        <!-- <van-cell center class="vh-border-0" v-if="dataList.length">
        <template #title>
          <div class="vh-tip">
            共查询到
            <span class="vh-color-orange">{{ dataList.length }}</span>
            条记录
          </div>
        </template>
        <template #right-icon>
          <span class="vh-font-12">{{ !showMulti ? '开启批量审批' : '关闭批量审批' }}</span>
          <van-switch
            :active-color="colorOrange"
            size="0.64rem"
            class="vh-ml-10"
            v-model="showMulti"
            @change="switchChange"
          ></van-switch>
        </template>
      </van-cell> -->
        <!-- 列表 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :error.sync="error"
            :finished="finished"
            :finished-text="finishedText"
            @load="onLoad"
          >
            <van-checkbox-group v-model="result">
              <van-row
                v-waves
                class="vacation-item vh-m-10 vh-bg-white vh-rounded-6 vh-p-10 vh-flex-ac-jb"
                type="flex"
                align="center"
                v-for="item in dataList"
                :key="item.billId"
              >
                <!-- <transition :name="'van-slide-left'"> -->
                <van-col span="2" v-show="showMulti">
                  <van-checkbox :name="item.billId"></van-checkbox>
                </van-col>
                <!-- </transition> -->
                <van-col :span="showMulti ? 11 : 12" @click="toCheck(item)">
                  <p v-for="(left, leftIdx) in item.formData.slice(0, 2)" :key="leftIdx">
                    <span class="vh-tip">{{ left.fieldKey }}：</span>
                    <span>{{ left.fieldValue }}</span>
                  </p>
                </van-col>
                <van-col :span="showMulti ? 11 : 12" @click="toCheck(item)">
                  <p v-for="(left, leftIdx) in item.formData.slice(2)" :key="leftIdx">
                    <span class="vh-tip">{{ left.fieldKey }}：</span>
                    <span>{{ left.fieldValue }}</span>
                  </p>
                </van-col>
              </van-row>
            </van-checkbox-group>
            <vh-tip v-if="dataList.length === 0 && !loading"></vh-tip>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import vars from '@/assets/css/vars.less'
import { themeColor, typeCode } from '@/config/constants'
import { findHrCheckList } from '@/api/modules/common'
import list from '@/mixins/list'
import SearchFilter from '@comp/common/SearchFilter'

export default {
  name: 'Vacation',
  mixins: [list],
  components: { SearchFilter },
  data() {
    return {
      colorBlue: vars.colorBlue,
      colorOrange: vars.colorOrange,
      themeColor,
      showMulti: false, // 是否批量
      result: [],
      typeCode: typeCode.get('vacation')
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
          // this.dataList.forEach((v) => {
          //   v.showMulti = false // 默认单选
          // })
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
      this.$router.push(`/vacation-check/${billId}`)
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
.vacation-list-wrapper {
  .vacation-item {
  }
}
</style>
