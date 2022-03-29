<!--
 * @Description:资产购置
 * @Author: wuxxing
 * @LastEditTime: 2022-03-29 14:29:49
-->
<template>
  <div class="asset-purchase-wrapper vh-bg">
    <vh-nav-bar :left-arrow="true"></vh-nav-bar>
    <search-filter v-model="keyword" @search="handleSearch"></search-filter>
    <van-tabs
      v-model="active"
      animated
      sticky
      offset-top="1.28rem"
      :color="activeColor"
      @change="onTabsChange"
    >
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
              :to="{ name: 'AssetPurchaseCheck' }"
              v-for="(item, index) in mockArr"
              :key="index"
            >
              <div class="list-item vh-p-10 vh-bg-white" v-waves>
                <div class="vh-flex-jb-ac">
                  <div class="">{{ '办公屏风卡座' }}</div>
                  <div class="vh-color-tip">{{ '2022-03-07' }}</div>
                </div>
                <div class="vh-flex-ac">
                  <span class="vh-color-tip">申请单号：</span>
                  <span class="vh-color-blue">{{ '6666' }}</span>
                </div>
                <div class="vh-flex-ac">
                  <span class="vh-color-tip">申请科室：</span>
                  <span>{{ '设备科' }}</span>
                </div>
                <div class="vh-flex-ac">
                  <span class="vh-color-tip">总预算：</span>
                  <span>{{ '1000.00' }}</span>
                </div>
                <div class="btn-status">
                  <TagBox
                    plain
                    size="medium"
                    :color="checkStatus.get(-1).color"
                    :text="checkStatus.get(-1).text"
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
import { themeColor, checkStatus } from '@/config/constants'
import SearchFilter from '@comp/common/SearchFilter'
import TagBox from '@comp/common/TagBox'
export default {
  name: 'AssetPurchase',
  components: {
    SearchFilter,
    TagBox
  },
  data() {
    return {
      tabs: [
        // { title: '全部', id: '0' },
        { title: '待处理', id: '1' },
        { title: '已处理', id: '2' },
        { title: '全部', id: '3' }
        // { title: '执行完成', id: '4' },
        // { title: '中止', id: '5' }
      ],
      keyword: '',
      active: '1',
      activeColor: themeColor,
      checkStatus, // 审批状态
      // 列表相关
      mockArr: 1,
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
    },
    handleSearch(val) {
      console.log('handleSearch', val)
      this.onRefresh()
    },
    onTabsChange(index, title) {
      console.log(index)
      this.mockArr = index * 6
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
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
