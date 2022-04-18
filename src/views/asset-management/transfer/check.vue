<!--
 * @Description:资处转移审核
 * @Author: wuxxing
 * @LastEditTime: 2022-04-18 14:35:46
-->
<template>
  <div class="check-wrapper vh-bg">
    <vh-nav-bar @click-right="handleRightClick">
      <template #right>
        <div class="vh-color-white">审批详情</div>
      </template>
    </vh-nav-bar>
    <!-- 折叠面板 -->
    <van-collapse class="vh-m-10" v-model="activeNames" :border="false">
      <van-collapse-item
        class="vh-mb-10 vh-rounded-6"
        :name="index"
        v-for="(item, index) in formData"
        :key="item.title + index"
        :border="false"
      >
        <template #title>
          <div class="vh-color-blue">{{ item.title }}</div>
        </template>
        <template #default>
          <template v-if="item.type === 'jsonText'">
            <van-cell
              title-class="vh-color-tip"
              v-for="(citem, cindex) in item.rowData.filter((v) => v.isShow === 1)"
              :key="citem.fieldName + cindex"
              :title="citem.fieldName"
              :value="citem.fieldValue || '--'"
              :value-class="{ 'vh-color-blue': false }"
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
    <!-- 表单 -->
    <van-form v-if="formData.length" @submit="onSubmit" class="vh-mb-10" scroll-to-error>
      <van-field
        v-model="checkParam.remark"
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
    <ButtonGroup :btn-arr="btnList" fixed @click="handleClickBtn"></ButtonGroup>
    <!-- 节点弹窗 -->
    <van-dialog
      class-name="user-dialog"
      v-model="showCheckUser"
      :title="checkPeopleData && checkPeopleData.title"
      show-cancel-button
      :close-on-click-overlay="false"
      @confirm="handleConfirmUser"
    >
      <template #default>
        <template v-if="checkPeopleData.rowData && checkPeopleData.rowData.length">
          <div class="user-check vh-p-20">
            <van-checkbox-group v-model="approvers" icon-size="0.64rem">
              <!-- TODO: 记得去掉.slice(0, 10)-->
              <van-checkbox
                class="vh-mb-10"
                v-for="(user, index) in checkPeopleData.rowData.slice(0, 10)"
                :key="user.id + index"
                :name="user.id"
              >
                {{ user.empName }}
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </template>
        <template v-else>
          <div class="vh-p-box">{{ '暂无审批人员' }}</div>
        </template>
      </template>
    </van-dialog>

    <van-popup
      v-model="showCheckDetail"
      position="right"
      closeable
      :style="{ width: '90%', height: '100%' }"
    >
      <div class="vh-flex-center vh-pt-40">
        <TimeLine ref="timeLineRef" :id="parameters.billId" :type-code="typeCode"></TimeLine>
      </div>
    </van-popup>
  </div>
</template>

<script>
import FileCard from '@comp/common/FileCard'
import ImgView from '@comp/common/ImgView'
import TimeLine from '@comp/common/TimeLine'
import ButtonGroup from '@comp/global/ButtonGroup'
import { findCheckInfoDetail, sendCheck } from '@/api/modules/common'
import { typeCode } from '@/config/constants'
import { getIncreasingArr, findState } from '@/utils'
export default {
  name: 'AssetTransferCheck',
  components: { FileCard, ImgView, TimeLine, ButtonGroup },
  data() {
    return {
      showCheckUser: false,
      showCheckDetail: false,
      activeNames: [],
      formData: [],
      checkPeopleData: null, // 审批下一人数据
      btnList: [
        { text: '驳回', value: 'NO' },
        { text: '通过', value: 'YES' }
      ],
      typeCode: typeCode.get('transfer'),
      parameters: {
        billId: ''
      },
      checkParam: {
        busKey: '',
        checkState: 'NO',
        remark: '同意',
        approver: '',
        openId: 'xiejieweidemo',
        state: ''
      }
    }
  },
  created() {
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
        // data.formData.forEach((item) => {
        //   if (item.type === 'jsonText') {
        //     const state = item.rowData.find((v) => v.filedId === 'state')
        //     console.log(state)
        //     this.checkParam.state = state.fieldValue
        //   }
        // })
        this.formData = [...data.formData, ...data.detailData] || []
        this.checkPeopleData = data.checkPeopleData
        this.activeNames = getIncreasingArr(this.formData?.length)
        this.checkParam.state = findState(data.formData).fieldValue
        // 获取code name
        // const user = findCodeName(this.formData)
        // this.checkParam = { ...user, ...this.checkParam }
      }
    },
    // 审批or驳回
    async checkInfo(type) {
      if (!this.checkParam.remark) {
        this.$toast.fail(`请输入审批意见`)
        return
      }
      this.checkParam.checkState = type
      const { errcode, errmsg } = await sendCheck({
        typeCode: this.typeCode,
        checkParam: this.checkParam
      })
      if (errcode === '0') {
        this.$toast({
          message: type === 'YES' ? '已同意' : '已驳回',
          type: 'success',
          duration: 800,
          closeOnClick: true,
          // overlay: true,
          forbidClick: true
        })
        // this.$router.back()
      } else {
        this.$toast({
          message: errmsg,
          type: 'fail',
          duration: 3000,
          // className: 'vh-color-orange',
          forbidClick: true
        })
      }
    },
    handleConfirmUser(type = 'YES') {
      if (!this.approvers.length) {
        this.$toast({
          message: `请选择下一审批人！`,
          type: 'error',
          duration: 1500,
          // overlay: true,
          forbidClick: true
        })
        return
      }
      this.checkParam.approver = this.approvers.join(',')
      // 调接口
      this.checkInfo(type)
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    // 按钮回调
    handleClickBtn({ value }) {
      switch (value) {
        case 'YES': {
          if (!this.checkPeopleData) {
            this.checkInfo(value)
          } else {
            this.showCheckUser = true
          }
          break
        }
        case 'NO':
          this.checkParam.approver = ''
          this.checkInfo(value)
          break
      }
    },
    // 查看审批详情
    handleRightClick() {
      this.showCheckDetail = true
      this.$nextTick(() => {
        // console.log(this.$refs.timeLineRef)
        this.$refs.timeLineRef.findCheckInfo()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.check-wrapper {
  .asset-info {
  }
  /deep/ .van-collapse-item__content {
    padding: 0;
    .van-cell {
      // font-size: 14px;
      padding-top: 5px;
      padding-bottom: 5px;
      &::after {
        border: 0;
      }
    }
  }
}
</style>
