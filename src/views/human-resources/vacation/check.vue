<!--
 * @Description: 休假审批
 * @Author: wuxxing
 * @LastEditTime: 2022-04-26 10:07:01
-->
<template>
  <div class="vacation-check-wrapper vh-bg">
    <vh-nav-bar @click-right="handleRightClick">
      <template #right>
        <div class="vh-color-white">审批流程</div>
      </template>
    </vh-nav-bar>
    <div class="check-info vh-mb-10 vh-bg-white">
      <!-- 折叠面板 -->
      <van-collapse v-model="activeNames" :border="false">
        <van-collapse-item
          v-for="(item, index) in formData"
          :key="index"
          :name="index"
          class="vh-mb-100"
          :border="false"
        >
          <template #title>
            <div class="vh-color-blue2">{{ item.title }}</div>
          </template>
          <template #default>
            <template v-if="item.type === 'jsonText'">
              <van-cell
                v-for="(row, rowIdx) in item.rowData"
                :key="rowIdx"
                title-class="vh-color-tip"
                :title="row.fieldName"
                :value="row.fieldValue || '--'"
              ></van-cell>
            </template>
            <!-- 附件 -->
            <div v-else class="vh-p-box">
              <template v-if="item.rowData && item.rowData.length">
                <!-- 图片集 -->
                <ImgView v-model="item.rowData" border></ImgView>
                <FileCard v-model="item.rowData" class="vh-color-text"></FileCard>
              </template>
              <template v-else>
                <div>暂无附件</div>
              </template>
            </div>
          </template>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="vh-mb-10">
      <van-field
        v-model="checkParam.remark"
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
    <vh-button-group :btn-arr="btnList" fixed @click="handleClickBtn" />
    <van-popup
      v-model="showCheckDetail"
      position="right"
      closeable
      :style="{ width: '90%', height: '100%' }"
    >
      <div class="vh-pt-20 vh-pl-5">
        <TimeLine :id="parameters.billId" :type-code="typeCode"></TimeLine>
      </div>
    </van-popup>
  </div>
</template>

<script>
import vars from '@/assets/css/vars.less'
import { findCheckInfoDetail, sendCheck } from '@/api/modules/common'
import { findCodeName } from './hooks'
import ImgView from '@comp/common/ImgView'
import FileCard from '@comp/common/FileCard'
import TimeLine from '@comp/common/TimeLine'
export default {
  name: 'VacationCheck',
  components: { ImgView, FileCard, TimeLine },
  data() {
    return {
      formData: [],
      activeNames: [],
      showCheckDetail: false,
      btnList: [
        { text: '驳回', value: 'NO' },
        { text: '同意', value: 'YES' }
      ],
      colorYellow: vars.colorYellow,
      colorRed: vars.colorRed,
      // 请求参数
      typeCode: 'hr_vacation',
      parameters: {
        billId: ''
      },
      checkParam: {
        // empName: '谢杰伟',
        // empCode: 538,
        busKey: '',
        checkState: 'NO',
        remark: '',
        openId: 'xiejiewei'
      }
    }
  },
  created() {
    // this.checkParam.openId = this.$store.state.user.openId
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const { id } = this.$route.params
      this.parameters.billId = this.checkParam.busKey = id
      const { errcode, data } = await findCheckInfoDetail({
        typeCode: this.typeCode,
        parameters: this.parameters
      })
      if (errcode === '0') {
        this.formData = data.formData || []
        this.activeNames = [...Array(this.formData.length).keys()]
        // 获取code name
        const user = findCodeName(this.formData)
        this.checkParam = { ...user, ...this.checkParam }
      }
    },
    // 驳回
    async checkInfo(type) {
      const { id } = this.$route.params
      this.parameters.billId = id
      const { errcode, errmsg } = await sendCheck({
        typeCode: this.typeCode,
        checkParam: this.checkParam
      })
      if (errcode === '0') {
        this.$toast({
          message: type === 'YES' ? '已同意' : '已驳回',
          type: 'success',
          duration: 800,
          // overlay: true,
          forbidClick: true
        })
        this.$router.back()
      }
      if (errcode === '1') {
        this.$toast({
          message: errmsg,
          type: 'error',
          duration: 1500,
          // overlay: true,
          forbidClick: true
        })
      }
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    // 按钮回调
    handleClickBtn({ value }) {
      this.checkParam.checkState = value
      this.checkInfo(value)
      // switch (value) {
      //   case 'YES':
      //     this.checkInfo()
      //     break
      //   case 'NO':
      //     this.checkInfo()
      //     break
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.vacation-check-wrapper {
  /deep/.check-info {
    .van-collapse-item__title {
      // background: rgba(0, 0, 0, 0.1);
      // background: @color-bg;
      border-bottom: 1px solid #e6e6e6;
      height: 40px;
      // &::before {
      //   content: ' ';
      //   display: block;
      //   height: 40%;
      //   // line-height: 80%;
      //   width: 3px;
      //   background-color: @color-orange;
      //   position: absolute;
      //   left: 3%;
      //   top: 50%;
      //   transform: translateY(-40%);
      // }
    }
    .van-collapse-item__content {
      padding: 0;
      .van-cell {
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
