<!--
 * @Description: 休假列表
 * @Author: wuxxing
 * @LastEditTime: 2022-04-06 16:46:29
-->
<template>
  <div class="vacation-list-wrapper vh-bg">
    <vh-nav-bar></vh-nav-bar>
    <!-- 列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-checkbox-group v-model="result">
          <template v-for="item in 5">
            <van-row
              v-waves
              class="vacation-item vh-m-10 vh-bg-white vh-rounded-6 vh-p-10 vh-flex-ac-jb"
              type="flex"
              align="center"
              :key="item"
            >
              <van-col span="2">
                <van-checkbox
                  :name="item"
                  @click.stop="
                    () => {
                      return
                    }
                  "
                ></van-checkbox>
              </van-col>
              <van-col span="14" @click.stop="handleClickCheck">
                <div class="vacation-item-info">
                  <div class="vh-flex-ac">
                    <p>{{ '年假审批_张三_2022-03-29' }}</p>
                  </div>
                  <p class="vh-tip">{{ '特批年假6天' }}</p>
                  <p class="vh-tip">{{ '财务部审计处_张三' }}</p>
                </div>
              </van-col>
              <van-col span="8" class="vh-flex-center">
                <van-button
                  class="vh-px-8"
                  size="mini"
                  :color="colorBlue"
                  @click.stop="handleClickCheck"
                >
                  {{ '审批' }}
                </van-button>
                <div class="vh-mx-10"></div>
                <van-button
                  class="vh-px-8"
                  size="mini"
                  :color="colorOrange"
                  @click.stop="handleClickReject"
                >
                  {{ '驳回' }}
                </van-button>
              </van-col>
            </van-row>
            <!-- <div class="vacation-item vh-bg-white vh-p-10 vh-border-b-1 vh-flex-ac-jb" :key="item">
        <div class="vacation-item-info">
          <p>{{ '年假审批_张三_2022-03-29' }}</p>
          <p>{{ '特批年假6天' }}</p>
          <p>{{ '财务部审计处_张三' }}</p>
        </div>
        <div class="vacation-item-info">
          <van-button class="vh-px-8" size="mini" :color="colorBlue">{{ '审批' }}</van-button>
          <div class="vh-ml-10">
            <van-button class="vh-px-8" size="mini" :color="colorOrange">
              {{ '驳回' }}
            </van-button>
          </div>
        </div>
      </div> -->
          </template>
        </van-checkbox-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import vars from '@/assets/css/vars.less'
export default {
  name: 'Vacation',
  components: {},
  data() {
    return {
      colorBlue: vars.colorBlue,
      colorOrange: vars.colorOrange,
      result: [1],
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
    // 审批
    handleClickCheck() {
      this.$router.push(`/vacation-check`)
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
