<!--
 * @Description: 休假列表
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 13:48:29
-->
<template>
  <div class="vacation-list-wrapper vh-bg">
    <!-- TODO 批量审批 -->
    <vh-nav-bar @click-right="onClickCheck">
      <template #right>
        <div v-show="showCheckBtn" class="vh-color-white">批量审批</div>
      </template>
    </vh-nav-bar>
    <MoveTabs v-model.trim="tabActive" :tabs="tabs" offset-top="48" @change="handleTasChange">
      <div class="vh-w-full vh-flex-ac">
        <!-- @input="handleSearch" -->
        <van-search
          class="vh-flex1"
          v-model="parameters.queryTerm"
          placeholder="请输入员工姓名"
          :show-action="true"
        >
          <template #action>
            <div class="vh-flex-center" @click="handleSearch">
              <van-button class="vh-px-12" type="info" size="mini">查询</van-button>
            </div>
          </template>
        </van-search>
      </div>
      <van-cell center class="vh-border-0" v-if="dataList.length">
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
      </van-cell>
      <!-- 列表 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :error="error"
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
              v-for="(item, index) in dataList"
              :key="item.billId + index"
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
          <vh-empty v-if="dataList.length === 0 && !loading"></vh-empty>
        </van-list>
      </van-pull-refresh>
    </MoveTabs>
  </div>
</template>

<script>
import MoveTabs from '@comp/common/MoveTabs'
import vars from '@/assets/css/vars.less'
import { themeColor, typeCode } from '@/config/constants'
import { findHrCheckList } from '@/api/modules/common'
export default {
  name: 'Vacation',
  components: { MoveTabs },
  data() {
    return {
      colorBlue: vars.colorBlue,
      colorOrange: vars.colorOrange,
      themeColor,
      showMulti: false, // 是否批量
      result: [],
      tabActive: 0,
      tabs: ['待处理', '已处理', '全部'],
      dataList: [],
      error: false,
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0,
      typeCode: typeCode.get('vacation'),
      pageRequest: {
        pageNum: 1,
        pageSize: 10
      },
      parameters: {
        dataState: '0', // 默认待处理
        queryTerm: ''
      }
    }
  },
  computed: {
    // 是否显示批量审批按钮
    showCheckBtn: {
      get() {
        return this.showMulti && this.result.length > 0
      }
    },
    showAction: {
      get() {
        return String(this.parameters.queryTerm).trim() !== '' // TODO 清空两边空格无效
      }
    },
    finishedText: {
      // 共${this.dataList.length}条数据
      get() {
        return this.dataList.length ? `没有更多了` : ''
      }
    }
  },
  created() {},
  methods: {
    onLoad() {
      this.getList()
    },
    // 获取数据列表
    async getList() {
      try {
        // 组织请求参数
        const params = {
          typeCode: this.typeCode,
          pageRequest: this.pageRequest,
          parameters: this.parameters
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
    // 列表刷新
    onRefresh() {
      console.log('列表数据刷新---')
      // 清空列表数据
      this.finished = false
      this.refreshing = true
      this.loading = true
      this.dataList = []
      this.totalSize = 0
      this.pageRequest.pageNum = 1
      this.onLoad()
    },
    // 标签页切换回调
    handleTasChange(val) {
      this.parameters.dataState = ['0', '1', 'all'][val]
      this.onRefresh()
    },
    // 搜索
    handleSearch(val) {
      console.log('搜索')
      // throttle(this.onRefresh, 150)
      this.onRefresh()
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
    },
    // TODO 批量审批
    onClickCheck() {}
  }
}
</script>

<style lang="less" scoped>
.vacation-list-wrapper {
  .vacation-item {
    // border-radius: 6px;
    // border-bottom: 1px solid @color-border;
  }
}
</style>
