<!--
 * @Description: 借调申请列表
 * @Author: wuxxing
 * @LastEditTime: 2022-04-02 13:55:17
-->
<template>
  <div class="secondment-wrapper vh-bg">
    <vh-nav-bar></vh-nav-bar>
    <MoveTabs v-model.trim="tabActive" :tabs="tabs" offset-top="48">
      <div class="vh-w-full vh-flex-ac">
        <van-search
          class="vh-flex1"
          v-model="keyword"
          placeholder="请输入员工姓名"
          :show-action="showAction"
          @search="handleSearch"
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
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <router-link :to="{ name: 'SecondmentCheck' }" v-for="(item, index) in 5" :key="index">
            <div class="list-item vh-m-10 vh-rounded-6 vh-p-10 vh-bg-white" v-waves>
              <van-row type="flex" align="center">
                <van-col span="12">
                  <p class="vh-font-14">
                    <span class="vh-tip">人员姓名：</span>
                    <span>{{ '张三' }}</span>
                  </p>
                  <p class="vh-font-14 vh-py-5">
                    <span class="vh-tip">编制部门：</span>
                    <span>{{ '党委办公室' }}</span>
                  </p>
                  <p class="vh-font-14">
                    <span class="vh-tip">开始时间：</span>
                    <span>{{ new Date() | formatDate('YYYY-MM-DD') }}</span>
                  </p>
                </van-col>
                <van-col span="12">
                  <p class="vh-font-14">
                    <span class="vh-tip">人员编号：</span>
                    <span class="vh-color-blue">{{ '6675' }}</span>
                  </p>
                  <div class="vh-font-14 vh-py-5 vh-flex-ac-jb">
                    <p>
                      <span class="vh-tip">借调部门：</span>
                      <span>{{ '医院办公室' }}</span>
                    </p>
                    <van-icon name="arrow" size="0.64rem" :color="themeColor" />
                  </div>
                  <p class="vh-font-14">
                    <span class="vh-tip">结束时间：</span>
                    <span>{{ new Date() | formatDate('YYYY-MM-DD') }}</span>
                  </p>
                </van-col>
                <!-- <van-col span="1">
                  <van-icon name="arrow" size="0.7476rem" :color="themeColor"></van-icon>
                </van-col> -->
              </van-row>
            </div>
          </router-link>
        </van-list>
      </van-pull-refresh>
    </MoveTabs>
  </div>
</template>

<script>
import MoveTabs from '@comp/common/MoveTabs'
import { themeColor } from '@/config/constants'
export default {
  name: 'Secondment',
  components: {
    MoveTabs
  },
  data() {
    return {
      keyword: '',
      tabActive: 0,
      tabs: ['待审批', '已审批'],
      dataList: [],
      loading: false,
      finished: false,
      refreshing: false,
      themeColor
    }
  },
  computed: {
    showAction: {
      get() {
        return String(this.keyword).trim() !== '' // TODO 清空两边空格无效
      }
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
    // 搜索
    handleSearch() {
      console.log('handleSearch', this.keyword)
      this.onRefresh()
    }
  }
}
</script>

<style lang="less" scoped>
.secondment-wrapper {
}
</style>
