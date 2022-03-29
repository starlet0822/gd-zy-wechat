<!--
 * @Description: 休假审批
 * @Author: wuxxing
 * @LastEditTime: 2022-03-29 12:37:27
-->
<template>
  <div class="vacation-check-wrapper vh-bg">
    <vh-nav-bar></vh-nav-bar>
    <div class="check-info vh-mb-10 vh-bg-white">
      <!-- 折叠面板 -->
      <van-collapse class="" v-model="activeNames">
        <van-collapse-item :name="0">
          <template #title>
            <div class="vh-color-blue">人员基本信息</div>
          </template>
          <template #default>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'员工姓名'"
              :value="dataInfo.userInfo.name"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'员工编号'"
              :value="dataInfo.userInfo.no"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'部门'"
              :value="dataInfo.userInfo.depName"
            ></van-cell>
            <!-- <van-cell
              title-class="vh-color-tip"
              v-for="citem in 5"
              :key="citem"
              :title="'资产名称' + citem"
              value="xxx"
            ></van-cell> -->
          </template>
        </van-collapse-item>
        <van-collapse-item :name="1">
          <template #title>
            <div class="vh-color-blue">考勤休假申请表</div>
          </template>
          <template #default>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'休假类型'"
              :value="dataInfo.vacationInfo.type"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              value-class="vh-color-orange"
              :title="'休假余额'"
              :value="dataInfo.vacationInfo.balance + '天'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'休假天数'"
              :value="dataInfo.vacationInfo.dayNum + '天'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'申请日期'"
              :value="dataInfo.vacationInfo.applyDate | formatDate('YYYY-MM-DD')"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'开始日期'"
              :value="dataInfo.vacationInfo.startDate | formatDate('YYYY-MM-DD')"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'结束日期'"
              :value="dataInfo.vacationInfo.endDate | formatDate('YYYY-MM-DD')"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'申请原因'"
              :value="dataInfo.vacationInfo.reason"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'开始上下午'"
              :value="dataInfo.vacationInfo.start"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'结束上下午'"
              :value="dataInfo.vacationInfo.end"
            ></van-cell>
          </template>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="vh-mb-10">
      <van-field
        v-model="formInfo.opinion"
        name="opinion"
        label="审批意见"
        placeholder="请输入审批意见"
        type="textarea"
        rows="3"
        autosize
        maxlength="200"
        show-word-limit
        :rules="[{ required: false, message: '请输入审批意见' }]"
      />
    </van-form>
    <!-- 底部按钮组 -->
    <vh-button-group :btn-arr="btnList" fixed @click="handleClickBtn"></vh-button-group>
  </div>
</template>

<script>
import vars from '@/assets/css/vars.less'
export default {
  name: 'VacationCheck',
  components: {},
  data() {
    return {
      dataInfo: {
        userInfo: {
          name: '张三',
          no: '6675',
          depName: '信息管理办公室'
        },
        vacationInfo: {
          type: '年假',
          balance: '10.00',
          dayNum: 5,
          applyDate: new Date(),
          startDate: new Date(),
          endDate: new Date(),
          reason: '休年假',
          start: '上午',
          end: '下午'
        }
      },
      activeNames: [0, 1],
      showCheckDetail: false,
      formInfo: {
        opinion: ''
      },
      btnList: [
        { text: '驳回', value: 'nopass' },
        { text: '同意', value: 'pass' }
      ],
      colorYellow: vars.colorYellow,
      colorRed: vars.colorRed
    }
  },
  created() {},
  methods: {
    onClickCheck() {
      this.showCheckDetail = !this.showCheckDetail
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    // 按钮回调
    handleClickBtn({ value }) {
      switch (value) {
        case 'pass':
          this.$toast({
            message: '已同意',
            type: 'success',
            duration: 800,
            // overlay: true,
            forbidClick: true
          })
          break
        case 'nopass':
          this.$toast({
            message: '已驳回',
            type: 'success',
            duration: 800,
            // overlay: true,
            forbidClick: true
          })
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.vacation-check-wrapper {
  .check-info {
    /deep/ .van-collapse-item__content {
      padding: 0;
      .van-cell {
        // font-size: @font14;
        padding-top: 5px;
        padding-bottom: 5px;
        &::after {
          border: 0;
        }
      }
    }
  }
}
</style>
