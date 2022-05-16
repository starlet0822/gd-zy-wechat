<!--
 * @Description:资产购置审核
 * @Author: wuxxing
 * @LastEditTime: 2022-05-07 10:50:37
-->
<template>
  <div class="check-wrapper vh-bg">
    <vh-nav-bar
      :left-arrow="canBack"
      :title="dataInfo && dataInfo.title"
      @click-right="handleRightClick"
    >
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
              v-for="citem in item.rowData.filter((v) => v.isShow === 1)"
              :key="citem.fieldName"
              :title="citem.fieldName"
              :value="citem.fieldValue || '--'"
              :value-class="['vh-flex2']"
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
    <!-- 附件上传 -->
    <div class="asset-info vh-rounded-12 vh-m-10 file-upload" v-if="false">
      <van-cell title-class="vh-color-blue" :title="'附件'"></van-cell>
      <div class="file-box">
        <!-- 图片集 -->
        <ImgView border></ImgView>
        <!-- 文件列表 -->
        <FileCard></FileCard>
      </div>
    </div>
    <!-- 表单 -->
    <van-form v-if="formData.length" scroll-to-error>
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
        <template
          v-if="checkPeopleData && checkPeopleData.rowData && checkPeopleData.rowData.length"
        >
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
      <div class="vh-pt-20 vh-pl-5">
        <TimeLine :id="busKey" :type-code="typeCode"></TimeLine>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { findCheckInfoDetail, sendCheck } from '@/api/modules/common'
import { typeCode } from '@/config/constants'
import { getIncreasingArr } from '@/utils'
import check from '@/mixins/check'
export default {
  name: 'AssetDisposalCheck',
  mixins: [check],
  data() {
    return {
      typeCode: typeCode.get('disposal')
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
        this.dataInfo = data
        this.busKey = data.busKey
        this.formData = [...data.formData, ...data.detailData] || []
        this.checkPeopleData = data.checkPeopleData || null
        this.activeNames = getIncreasingArr(this.formData?.length)
        // 获取code name
        // const user = findCodeName(this.formData)
        // this.checkParam = { ...user, ...this.checkParam }
      }
    },
    // 审批or驳回
    async checkInfo(type) {
      this.checkParam.checkState = type
      // 用户未填写意见时默认补充意见
      if (this.checkParam.remark.trim() === '') {
        this.checkParam.remark = type === 'YES' ? '同意' : '驳回'
      }
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
        this.$router.back()
      } else {
        this.$toast({
          message: errmsg,
          type: 'fail',
          duration: 3000,
          closeOnClick: true,
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
    // 按钮回调
    handleClickBtn({ value }) {
      switch (value) {
        case 'YES':
          if (this.checkPeopleData) {
            this.showCheckUser = true
          } else {
            this.checkInfo(value)
          }
          break
        case 'NO':
          this.checkParam.approver = ''
          this.checkInfo(value)
          break
      }
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
      padding-top: 5px;
      padding-bottom: 5px;
      &::after {
        border: 0;
      }
    }
  }
}
</style>
