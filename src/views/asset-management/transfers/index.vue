<!--
 * @Description:资产调拨
 * @Author: wuxxing
 * @LastEditTime: 2022-03-31 15:23:31
-->
<template>
  <div class="asset-transfers-wrapper vh-bg">
    <vh-nav-bar :left-arrow="true"></vh-nav-bar>
    <search-filter v-model="query.title" @search="handleSearch"></search-filter>
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
              :to="{ name: 'AssetTransfersCheck' }"
              v-for="(item, index) in dataList"
              :key="item.id + index"
            >
              <div class="list-item vh-p-10 vh-bg-white" v-waves>
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
import { themeColor, checkStatus } from '@/config/constants'
import { getFixCheckList } from '@/api/modules/asset-management'
import SearchFilter from '@comp/common/SearchFilter'
import TagBox from '@comp/common/TagBox'
export default {
  name: 'AssetTransfers',
  components: {
    SearchFilter,
    TagBox
  },
  data() {
    return {
      tabs: [
        // { title: '全部', id: '0' },
        { title: '待处理', id: 'NO' },
        { title: '已处理', id: 'YES' },
        { title: '全部', id: '' }
        // { title: '执行完成', id: '4' },
        // { title: '中止', id: '5' }
      ],
      title: '',
      active: '1',
      activeColor: themeColor,
      checkStatus, // 审批状态
      // 列表相关
      mockArr: 1,
      query: {
        title: '',
        page: 1,
        limit: 10,
        checkState: 'NO'
      },
      dataList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {},
  methods: {
    async onLoad() {
      if (this.refreshing) {
        this.dataList = []
        this.refreshing = false
      }
      const res = await getFixCheckList(this.query)
      // console.log(res)
      if (res.errcode === 0) {
        this.dataList = this.dataList.concat(res.data)
      }
      this.loading = false
      if (this.dataList.length >= res.total) {
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
    // 搜索
    handleSearch(val) {
      console.log('handleSearch', val)
      this.query.title = val
      this.onRefresh()
    },
    // 标签页切换
    onTabsChange(id, title) {
      console.log(id)
      this.query.checkState = id
      this.onRefresh()
    }
  }
}
</script>

<style lang="less" scoped>
.asset-transfers-wrapper {
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
