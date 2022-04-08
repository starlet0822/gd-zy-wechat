<!--
 * @Description: 休假列表
 * @Author: wuxxing
 * @LastEditTime: 2022-04-08 15:11:33
-->
<template>
  <div class="vacation-list-wrapper vh-bg">
    <!-- TODO 批量审批 -->
    <vh-nav-bar></vh-nav-bar>
    <MoveTabs v-model.trim="tabActive" :tabs="tabs" offset-top="48" @change="handleTasChange">
      <div class="vh-w-full vh-flex-ac">
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
      <!-- 列表 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="finishedText"
          @load="onLoad"
        >
          <!-- <van-checkbox-group v-model="result"> -->
          <template v-for="(item, index) in dataList">
            <van-row
              v-waves
              class="vacation-item vh-m-10 vh-bg-white vh-rounded-6 vh-p-10 vh-flex-ac-jb"
              type="flex"
              align="center"
              :key="item.billId + index"
              @click="handleClickCheck(item)"
            >
              <!-- <van-col span="2">
                <van-checkbox
                  :name="item"
                  @click.stop="
                    () => {
                      return
                    }
                  "
                ></van-checkbox>
              </van-col> -->
              <!-- <van-col span="22" @click.stop="handleClickCheck(item)">
                <div class="vacation-item-info">
                  <div class="vh-flex-ac">
                    <p>{{ item.title }}</p>
                  </div>
                  <p class="vh-tip">{{ '特批年假6天' }}</p>
                  <p class="vh-tip">{{ '财务部审计处_张三' }}</p>
                </div>
              </van-col> -->
              <van-col span="12">
                <p v-for="(left, leftIdx) in item.formData.slice(0, 2)" :key="leftIdx">
                  <span class="vh-tip">{{ left.fieldKey }}：</span>
                  <span>{{ left.fieldValue }}</span>
                </p>
              </van-col>
              <van-col span="12">
                <p v-for="(left, leftIdx) in item.formData.slice(2)" :key="leftIdx">
                  <span class="vh-tip">{{ left.fieldKey }}：</span>
                  <span>{{ left.fieldValue }}</span>
                </p>
              </van-col>
            </van-row>
          </template>
          <!-- </van-checkbox-group> -->
          <vh-empty v-if="dataList.length === 0 && !loading"></vh-empty>
        </van-list>
      </van-pull-refresh>
    </MoveTabs>
  </div>
</template>

<script>
import MoveTabs from '@comp/common/MoveTabs'
import vars from '@/assets/css/vars.less'
import { themeColor } from '@/config/constants'
import { findHrCheckList } from '@/api/modules/common'
export default {
  name: 'Vacation',
  components: { MoveTabs },
  data() {
    return {
      colorBlue: vars.colorBlue,
      colorOrange: vars.colorOrange,
      themeColor,
      result: [1],
      tabActive: 0,
      tabs: ['待处理', '已处理', '全部'],
      dataList: [],
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0,
      typeCode: 'hr_vacation',
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
    async onLoad() {
      // return
      if (this.refreshing) {
        this.dataList = []
        this.refreshing = false
      }
      const {
        errcode,
        data: { dataList: data, totalSize }
      } = await findHrCheckList({
        typeCode: this.typeCode,
        pageRequest: this.pageRequest,
        parameters: this.parameters
      })
      console.log('findHrCheckList', data)
      if (errcode === '0') {
        this.total = totalSize
        this.dataList = this.dataList.concat(data)
      }
      this.loading = false
      if (this.dataList.length >= this.total) {
        this.finished = true
      }
    },
    onRefresh() {
      // 清空列表数据
      this.dataList = []
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    //
    handleTasChange(val) {
      this.parameters.dataState = ['0', '1', 'all'][val]
      this.onRefresh()
    },
    // 搜索
    handleSearch() {
      this.onRefresh()
    },
    // 审批
    handleClickCheck({ billId }) {
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
    }
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
