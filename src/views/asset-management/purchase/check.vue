<!--
 * @Description:资产购置审核
 * @Author: wuxxing
 * @LastEditTime: 2022-04-01 13:31:38
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
        v-for="(item, index) in detailData"
        :key="item.title"
        :border="false"
      >
        <template #title>
          <div class="vh-color-blue">{{ item.type === 'file' ? '附件' : `${item.title}` }}</div>
        </template>
        <template #default>
          <template v-if="item.type !== 'file'">
            <van-cell
              title-class="vh-color-tip"
              v-for="citem in item.rowData"
              :key="citem.fieldName"
              :title="citem.fieldName"
              value="xxxx"
            ></van-cell>
          </template>
          <div v-else class="file-upload">
            <div class="file-box vh-p-box vh-color-text">
              <!-- 图片集 -->
              <ImgView border></ImgView>
              <!-- 文件列表 -->
              <FileCard></FileCard>
            </div>
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
    <!-- 底部按钮组 -->
    <ButtonGroup :btn-arr="btnList" fixed @click="handleClickBtn"></ButtonGroup>
    <!-- 节点弹窗 -->
    <van-dialog
      v-model="showCheckUser"
      title="下一节审批人"
      show-cancel-button
      :close-on-click-overlay="false"
      @confirm="handleConfirmUser"
    >
      <template #default>
        <div class="vh-p-20">
          <van-radio-group v-model="radio" icon-size="0.64rem">
            <van-radio class="vh-mb-10" v-for="(user, index) in users" :key="index" :name="index">
              {{ user }}
            </van-radio>
          </van-radio-group>
        </div>
      </template>
    </van-dialog>

    <van-popup
      v-model="showCheckDetail"
      position="right"
      closeable
      :style="{ width: '90%', height: '100%' }"
      @get-container="getContainer"
    >
      <div class="vh-flex-center vh-pt-40">
        <TimeLine></TimeLine>
      </div>
    </van-popup>
  </div>
</template>

<script>
import FileCard from '@comp/common/FileCard'
import ImgView from '@comp/common/ImgView'
import TimeLine from '@comp/common/TimeLine'
import ButtonGroup from '@comp/global/ButtonGroup'
import { detailData } from './mock'
export default {
  name: 'AssetPurchaseCheck',
  components: { FileCard, ImgView, TimeLine, ButtonGroup },
  data() {
    return {
      showCheckUser: false,
      showCheckDetail: false,
      active: 0,
      radio: 0,
      activeNames: [0],
      users: ['张三', '李四', '王五'],
      detailData,
      btnList: [
        { text: '驳回', value: 'nopass' },
        // { text: '提交', value: 'submit' },
        { text: '通过', value: 'pass' }
      ]
    }
  },
  created() {},
  methods: {
    handleConfirmUser() {
      // 调佣接口
    },
    // 按钮回调
    handleClickBtn({ value }) {
      switch (value) {
        case 'pass':
          this.showCheckUser = true
          break
        case 'nopass':
          // this.showCheckUser = true
          this.$toast({
            message: '已驳回',
            type: 'success',
            duration: 800,
            // overlay: true,
            forbidClick: true
          })
          break
      }
    },
    // 查看审批详情
    handleRightClick() {
      // console.log(555);
      this.showCheckDetail = true
    },
    // TODO 无效
    getContainer() {
      return document.querySelector('#app')
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
      font-size: @font14;
      padding-top: 5px;
      padding-bottom: 5px;
      &::after {
        border: 0;
      }
    }
  }
}
</style>
