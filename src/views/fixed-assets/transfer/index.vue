<!--
 * @Description:资处转移
 * @Author: wuxxing
 * @LastEditTime: 2022-06-08 10:56:50
-->
<template>
  <div class="list-wrapper vh-bg">
    <vh-nav-bar :left-arrow="true"></vh-nav-bar>
    <van-tabs v-model="tabActive" animated sticky offset-top="1.28rem" @change="onTabsChange">
      <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" :name="tab.id">
        <search-filter
          ref="searchFilterRef"
          :key-id="tab.id"
          :value.sync="parameters.queryTerm"
          :placeholder="fixPlaceholder"
          @search="handleSearch"
          @confirm="handleFilterConfirm"
          :filter-menu="filterMenu"
        ></search-filter>
        <!-- 列表 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :error.sync="error"
            :finished="finished"
            :finished-text="finishedText"
            :immediate-check="false"
            @load="onLoad"
          >
            <div
              class="list-item vh-p-10 vh-bg-white vh-rounded-6"
              v-waves
              v-for="item in dataList"
              :key="item.billId"
              @click="toCheck(item)"
            >
              <div class="vh-flex-jb-ac">
                <div class="vh-title">{{ item.title }}</div>
                <div class="vh-color-tip">{{ item.dateTime | formatDate('YYYY-MM-DD') }}</div>
              </div>
              <div
                class="vh-flex-ac"
                v-for="(field, fieldIndex) in item.formData"
                :key="fieldIndex"
              >
                <span class="vh-color-tip">{{ field.fieldKey ? field.fieldKey + ':' : '' }}</span>
                <span :class="{ 'vh-color-blue': field.fieldName === 'transfer_no' }">
                  {{ field.fieldValue || '--' }}
                </span>
              </div>
              <div class="btn-status">
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
import { typeCode } from '@/config/constants'
import list from '@/mixins/list'
export default {
  name: 'AssetTransfer',
  mixins: [list],
  data() {
    return {
      typeCode: typeCode.get('transfer'),
      toCheckPath: `/asset-transfer-check`
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '@css/list.less';
</style>
