<!--
 * @Description: 借调审批列表
 * @Author: wuxxing
 * @LastEditTime: 2022-05-24 13:44:42
-->
<template>
  <div class="list-wrapper vh-bg">
    <vh-nav-bar></vh-nav-bar>
    <van-tabs v-model="tabActive" animated sticky offset-top="1.28rem" @change="onTabsChange">
      <van-tab v-for="tab in tabs" :title="tab.title" :key="tab.id" :name="tab.id">
        <search-filter
          ref="searchFilterRef"
          :key-id="tab.id"
          :value.sync="parameters.queryTerm"
          :placeholder="hrPlaceholder"
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
            :immediate-check="false"
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
                <span :class="{ 'vh-color-blue': field.fieldName === 'purc_no' }">
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
import { typeCode } from '@/config/constants'
import list from '@/mixins/list'
export default {
  name: 'Secondment',
  mixins: [list],
  data() {
    return {
      typeCode: typeCode.get('toLoan'),
      toCheckPath: `/secondment-check`
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '@css/list.less';
</style>
