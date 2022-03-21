<!--
 * @Description:资产购置
 * @Author: wuxxing
 * @LastEditTime: 2022-03-21 15:20:44
-->
<template>
  <div class="asset-purchase-wrapper vh-bg">
    <vh-nav-bar :left-arrow="false"></vh-nav-bar>
    <div class="vh-flex-jc">
      <van-search class="vh-flex1" v-model="keyword" placeholder="请输入搜索关键词" />
      <div class="vh-font-14 vh-flex-jc-ac vh-bg-white vh-pr-10">
        <van-icon name="filter-o" size="28" />
      </div>
    </div>
    <van-tabs v-model="active" animated sticky offset-top="1.28rem" :color="activeColor">
      <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" :name="tab.id">
        <!-- 列表 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- <van-cell v-for="item in dataList" :key="item" :title="item" /> -->
            <router-link
              :to="{ name: 'AssetPurchaseCheck' }"
              v-for="(item, index) in 5"
              :key="index"
            >
              <div class="list-item vh-p-10 vh-bg-white">
                <div class="vh-flex-jb-ac">
                  <div class="">{{ '办公屏风卡座' }}</div>
                  <div class="vh-font-tip">{{ '2022-03-07' }}</div>
                </div>
                <div class="vh-flex-ac">
                  <span>申请单号：</span>
                  <span class="vh-color-blue">{{ '6666' }}</span>
                </div>
                <div class="vh-flex-ac">
                  <span>申请科室：</span>
                  <span>{{ '设备科' }}</span>
                </div>
                <div class="vh-flex-ac">
                  <span>总预算：</span>
                  <span>{{ '1000.00' }}</span>
                </div>
                <div class="btn-status">{{ '未提交' }}</div>
              </div>
            </router-link>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { themeColor } from '@/config/constants'
export default {
  name: 'AssetPurchase',
  data() {
    return {
      tabs: [
        { title: '全部', id: '0' },
        { title: '未提交', id: '1' },
        { title: '已提交', id: '2' },
        { title: '审核', id: '3' },
        { title: '执行完成', id: '4' },
        { title: '中止', id: '5' }
      ],
      keyword: '',
      active: '0',
      activeColor: themeColor,
      // 列表相关
      dataList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.dataList = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.dataList.push(this.dataList.length + 1)
        }
        this.loading = false

        if (this.dataList.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.asset-purchase-wrapper {
  .list-item {
    margin: 10px;
    // padding: 10px;
    .btn-status {
      font-size: @font14;
      text-align: right;
    }
  }
}
</style>
