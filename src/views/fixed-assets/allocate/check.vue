<!--
 * @Description:资产调拨审核
 * @Author: wuxxing
 * @LastEditTime: 2022-05-23 11:49:22
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
        <TimeLine ref="timeLineRef" :id="busKey" :type-code="typeCode"></TimeLine>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { typeCode } from '@/config/constants'
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
  methods: {}
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
