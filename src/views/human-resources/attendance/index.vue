<!--
 * @Description: 考勤
 * @Author: wuxxing
 * @LastEditTime: 2022-06-13 11:44:34
-->
<template>
  <div class="list-wrapper vh-bg">
    <vh-nav-bar :left-arrow="true"></vh-nav-bar>
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
              <van-row
                class="vh-flex"
                v-for="(field, fieldIndex) in item.formData.filter((v) => v.isShow === 1)"
                :key="fieldIndex"
              >
                <van-col v-if="field.fieldKey" span="6" class="vh-color-tip">
                  {{ field.fieldKey ? field.fieldKey + ':' : '' }}
                </van-col>
                <van-col span="18" :class="{ 'vh-color-blue': field.fieldName === 'purc_no' }">
                  {{ field.fieldValue || '--' }}
                </van-col>
              </van-row>
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
  name: 'Attendance',
  mixins: [list],
  data() {
    return {
      typeCode: typeCode.get('attendance'),
      toCheckPath: `/attendance-check`,
      pageRequest: {
        pageSize: 15 // TODO 特殊处理
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '@css/list.less';
</style>
