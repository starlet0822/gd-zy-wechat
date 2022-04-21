<!--
 * @Description:资产调拨审核
 * @Author: wuxxing
 * @LastEditTime: 2022-04-21 15:40:28
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
        @click="handleClickItem(item)"
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
    <!-- 底部按钮组 -->
    <vh-button-group
      v-if="canCheck"
      :btn-arr="btnList"
      fixed
      @click="handleClickBtn"
    ></vh-button-group>
    <!-- 节点弹窗 -->
    <van-dialog
      v-if="checkPeopleData"
      class-name="user-dialog"
      v-model="showCheckUser"
      :title="checkPeopleData.title"
      show-cancel-button
      :close-on-click-overlay="false"
      @confirm="handleConfirmUser"
    >
      <template #default>
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
    </van-dialog>

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
import { findCheckInfoDetail, sendCheck } from '@/api/modules/common'
import { typeCode } from '@/config/constants'
import { getIncreasingArr } from '@/utils'
import check from '@/mixins/check'
export default {
  name: 'AssetAllocateCheck',
  mixins: [check],
  data() {
    return {
      typeCode: typeCode.get('allocation')
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
        data.detailData.forEach((item) => {
          this.$set(item, 'canView', true)
        })
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
    // 按钮回调
    handleClickBtn({ value }) {
      switch (value) {
        case 'YES':
          if (this.checkPeopleData?.rowData.length) {
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
    },
    // 查看审批详情
    handleRightClick() {
      // console.log(555);
      this.showCheckDetail = true
      this.$nextTick(() => {
        // console.log(this.$refs.timeLineRef)
        this.$refs.timeLineRef.findCheckInfo()
      })
    },
    // 查看副表明细
    handleClickItem({ billId, canView }) {
      if (!canView) return // 不是副表不能进入明细
      this.$router.push(`/asset-allocate-detail/${billId}`)
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
  /deep/.user-dialog {
    max-height: 50%;
    overflow: auto;
    // position: relative;

    .van-dialog__header {
      position: sticky;
      left: 0;
      top: 0;
      z-index: 1;
      background-color: #ffffff;
      border-bottom: 1px solid @color-shadow;
      // color: #ffffff;
    }
    .van-dialog__footer {
      position: sticky;
      left: 0;
      bottom: 0;
    }
  }
}
</style>
