<!--
 * @Description: 考勤审批
 * @Author: wuxxing
 * @LastEditTime: 2022-04-22 11:56:46
-->
<template>
  <div class="attendance-check-wrapper vh-bg">
    <vh-nav-bar @click-right="onClickCheck">
      <template #right>
        <div class="vh-color-white">审批详情</div>
      </template>
    </vh-nav-bar>
    <!-- <div class="vh-p-box0">
      <UserTable :headData="tableHead" :bodyData="matirialUsed"></UserTable>
    </div> -->
    <van-swipe class="my-swipe" @change="onChange">
      <van-swipe-item v-for="item in 5" :key="item">
        <div v-if="true" class="check-info vh-bg-white vh-p-10 vh-m-10 vh-rounded-6">
          <div class="vh-flex-ac-jb vh-pb-8">
            <span>{{ '黄晶如' }}</span>
          </div>
          <p class="vh-pb-8">
            <span class="vh-color-tip">工号：</span>
            <span class="vh-color-blue">{{ '6087' }}</span>
          </p>
          <p class="vh-pb-8">
            <span class="vh-color-tip">所属科室：</span>
            <span>{{ '审计处' }}</span>
          </p>
          <p class="vh-pb-8">
            <span class="vh-color-tip">职称：</span>
            <span>{{ '助理会计师' }}</span>
          </p>
          <p class="vh-pb-8">
            <span class="vh-color-tip">休假类型：</span>
            <span>{{ '年假' }}</span>
          </p>
          <p class="vh-pb-8">
            <span class="vh-color-tip">预休假天数：</span>
            <span>{{ '0.5' }}</span>
          </p>
          <p class="vh-pb-8">
            <span class="vh-color-tip">销假天数：</span>
            <span>{{ '2' }}</span>
          </p>
          <p class="vh-pb-8">
            <span class="vh-color-tip">实休假天数：</span>
            <span>{{ '1' }}</span>
          </p>
          <p class="vh-pb-8">
            <span class="vh-color-tip">休假开始时间：</span>
            <span>{{ new Date() | formatDate('YYYY-MM-DD') }}</span>
          </p>
          <p class="vh-pb-8">
            <span class="vh-color-tip">回院时间：</span>
            <span>{{ new Date() | formatDate('YYYY-MM-DD') }}</span>
          </p>
          <p class="vh-pb-8">
            <span class="vh-color-tip">补考勤月：</span>
            <span>{{ new Date() | formatDate('M') }}</span>
          </p>
          <p class="vh-pb-8">
            <span class="vh-color-tip">补考勤年：</span>
            <span>{{ new Date() | formatDate('YYYY') }}</span>
          </p>
          <!-- <transition name="van-slide-up">
        <div v-show="showCheckDetail">
          <TimeLine class="vh-p-0"></TimeLine>
        </div>
      </transition> -->
        </div>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{ 5 }}</div>
      </template>
    </van-swipe>
    <!-- 表单 -->
    <van-form v-if="formData.length" scroll-to-error>
      <van-field
        v-model="checkParam.remark"
        :readonly="!canCheck"
        name="remark"
        label="审批意见"
        placeholder="请输入审批意见"
        type="textarea"
        rows="3"
        label-class="vh-color-tip"
        autosize
        maxlength="200"
        show-word-limit
        :rules="[{ required: false, message: '请输入审批意见' }]"
      />
    </van-form>
    <!-- 底部按钮组 -->
    <vh-button-group :btn-arr="btnList" fixed @click="handleClickBtn"></vh-button-group>
    <van-popup
      v-model="showCheckDetail"
      position="right"
      closeable
      :style="{ width: '90%', height: '100%' }"
    >
      <div class="vh-pt-20 vh-pl-5">
        <TimeLine ref="timeLineRef" :id="parameters.billId" :type-code="typeCode"></TimeLine>
      </div>
    </van-popup>
  </div>
</template>

<script>
import vars from '@/assets/css/vars.less'
import { getAtteDetailList } from '@/api/modules/human-resources'
import { typeCode } from '@/config/constants'
import check from '@/mixins/check'
// import UserTable from './components/UserTable.vue'
export default {
  name: 'AttendanceCheck',
  mixins: [check],
  // components: { UserTable },
  data() {
    return {
      colorYellow: vars.colorYellow,
      colorRed: vars.colorRed,
      current: 0,
      typeCode: typeCode.get('attendance'),
      // 参数相关
      parameters: {
        billId: '',
        empName: ''
      },
      checkParam: {
        busKey: '',
        checkState: 'NO',
        remark: '同意',
        approver: '',
        openId: 'xiejiewei1390',
        state: ''
      },
      tableHead: [
        {
          name: '工号', // 注意传进去的列名
          span: '4',
          prop: 'name' // 注意传进去的列属性名，要跟实际取得的数据的属性名一致，如matirialUsed数组的每一项的属性名
        },
        {
          name: '姓名',
          span: '4',
          prop: 'name'
        },
        {
          name: '休假类型',
          span: '4',
          prop: 'num'
        },
        {
          name: '开始时间',
          span: '6',
          prop: 'num'
        },
        {
          name: '回院时间',
          span: '5',
          prop: 'num'
        }
      ],
      matirialUsed: [
        {
          name: '',
          model: '',
          num: '0',
          editDisable: true // 是否可编辑
        },
        {
          name: '',
          model: '',
          num: '0',
          editDisable: true
        },
        {
          name: '',
          model: '',
          num: '0',
          editDisable: true
        },
        {
          name: '',
          model: '',
          num: '0',
          editDisable: true
        }
      ]
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const { id } = this.$route.params
      this.parameters.billId = this.checkParam.busKey = id
      const { errcode, data } = await getAtteDetailList({
        typeCode: this.typeCode,
        parameters: this.parameters
      })
      if (errcode === '0') {
        console.log(data)
      }
    },
    onClickCheck() {
      this.showCheckDetail = !this.showCheckDetail
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    onChange(index) {
      this.current = index
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
.attendance-check-wrapper {
  .check-info {
    transition: all 0.3s;
  }
  .custom-indicator {
    position: absolute;
    right: 15px;
    bottom: 15px;
    padding: 2px 5px;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
