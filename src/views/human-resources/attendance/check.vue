<!--
 * @Description: 考勤审批
 * @Author: wuxxing
 * @LastEditTime: 2022-06-08 11:18:17
-->
<template>
  <div class="attendance-check-wrapper vh-bg">
    <vh-nav-bar :left-arrow="canBack" @click-right="handleRightClick">
      <template #right>
        <div class="vh-color-white">审批详情</div>
      </template>
    </vh-nav-bar>
    <search-filter
      v-model.trim="parameters.empName"
      placeholder="请输入员工姓名"
      @search="handleSearch"
      :can-filter="false"
    ></search-filter>
    <div class="vh-mt-10" v-if="unSubmitPerson && unSubmitPerson.length">
      <van-cell class="vh-border-0" title-class=" vh-color-red" title="本月无考勤人员"></van-cell>
      <div class="user-box vh-px-16 vh-pb-10 vh-bg-white">{{ unSubmitPersonStr }}</div>
    </div>
    <div class="vh-mt-10 vh-bg-white" v-if="true">
      <van-cell class="vh-border-0">
        <template #title>
          <div>
            考勤明细(
            <span class="vh-color-blue">{{ monthData.length || 0 }}</span>
            人)
          </div>
        </template>
      </van-cell>
      <UserTable
        class="vh-px-160"
        key="monthData"
        :headData="tableHead"
        :tableData="monthData"
      ></UserTable>
    </div>
    <div class="vh-mt-10 vh-bg-white" v-if="true">
      <van-cell class="vh-border-0">
        <template #title>
          <div>
            休假明细(
            <span class="vh-color-blue">{{ vacationData.length || 0 }}</span>
            行)
          </div>
        </template>
      </van-cell>
      <UserTable
        class="vh-px-160"
        key="vacationData"
        :headData="vacationHead"
        :tableData="vacationData"
      ></UserTable>
    </div>
    <!-- 表单 -->
    <van-form v-if="dataInfo" scroll-to-error>
      <van-field
        v-model="checkParam.remark"
        v-if="canCheck"
        name="remark"
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
    <vh-button-group
      v-if="canCheck"
      :btn-arr="btnList"
      fixed
      @click="handleClickBtn"
    ></vh-button-group>
    <van-popup
      v-model="showCheckDetail"
      position="right"
      closeable
      :style="{ width: '90%', height: '100%' }"
    >
      <div class="vh-pt-20 vh-pl-5">
        <TimeLine ref="timeLineRef" :id="checkParam.busKey" :type-code="typeCode"></TimeLine>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAtteDetailList } from '@/api/modules/human-resources'
import { typeCode } from '@/config/constants'
import check from '@/mixins/check'
import SearchFilter from '@comp/common/SearchFilter'
import UserTable from './components/UserTable.vue'
import { vacationHead } from './js/constants'
export default {
  name: 'AttendanceCheck',
  mixins: [check],
  components: { SearchFilter, UserTable },
  data() {
    return {
      current: 0,
      typeCode: typeCode.get('attendance'),
      formInfo: null, // 主表信息
      tableHead: [], // 主表表头
      monthData: [], // 主表数据
      vacationHead, // 副表表头
      vacationData: [], // 副表数据
      unSubmitPerson: [] // 未考勤人员
    }
  },
  computed: {
    unSubmitPersonStr() {
      const users = this.unSubmitPerson.map((user) => {
        return user.empCode + ' ' + user.empName
      })
      return users.join(',')
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const { id } = this.$route.params
      this.parameters.billId = id
      const { errcode, data } = await getAtteDetailList({
        typeCode: this.typeCode,
        parameters: this.parameters
      })
      if (errcode === '0') {
        const { formData, show_header, monthData, vacationData, unSubmitPerson } = data
        this.dataInfo = data
        this.formInfo = formData
        this.checkParam.busKey = formData.billId
        this.checkParam.deptId = formData.deptId
        this.checkParam.acctYear = formData.acctYear
        this.checkParam.acctMonth = formData.acctMonth
        this.tableHead = show_header || []
        this.monthData = monthData || []
        this.vacationData = vacationData || []
        this.unSubmitPerson = unSubmitPerson || []
      }
    },
    // 按钮回调
    // handleClickBtn({ value }) {
    //   this.checkInfo(value)
    // },
    // 搜索
    handleSearch(val) {
      this.parameters.empName = val
      this.getInfo()
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
