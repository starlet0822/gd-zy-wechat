<!--
 * @Description:资产购置审核
 * @Author: wuxxing
 * @LastEditTime: 2022-03-18 17:26:35
-->
<template>
  <div class="check-wrapper vh-bg">
    <vh-nav-bar @click-right="handleRightClick">
      <template #right>
        <div class="vh-color-white">审批详情</div>
      </template>
    </vh-nav-bar>
    <div class="asset-info vh-rounded-12 vh-m-10" v-for="item in 3" :key="item">
      <!-- <div class="vh-color-blue">{{'基本信息'+item}}</div> -->
      <van-cell
        title-class="vh-color-blue"
        :title="'基本信息'"
        value="xxx"
      ></van-cell>
      <van-cell title="资产名称" value="xxx"></van-cell>
      <van-cell title="资产名称" value="xxx"></van-cell>
      <van-cell title="资产名称" value="xxx"></van-cell>
      <van-cell title="资产名称" value="xxx"></van-cell>
      <van-cell title="资产名称" value="xxx"></van-cell>
      <van-cell title="资产名称00" value="xxx"></van-cell>
    </div>
    <!-- 附件上传 -->
    <div class="asset-info vh-rounded-12 vh-m-10 file-upload">
      <van-cell title-class="vh-color-blue" :title="'附件'"></van-cell>
      <div class="file-box">
        <!-- 图片集 -->
        <ImgView border></ImgView>
        <!-- 文件列表 -->
        <FileCard></FileCard>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="vh-h-44">
      <div class="vh-fixed-b vh-flex-jc vh-fixed" v-if="true">
        <van-button block plain>驳回</van-button>
        <van-button
block
type="info"
@click="showCheckUser = true"
          >通过</van-button
        >
      </div>
    </div>
    <!-- 节点弹窗 -->
    <van-dialog
      v-model="showCheckUser"
      title="下一节审批人"
      show-cancel-button
      @confirm="handleConfirmUser"
    >
      <!-- <template #title>
        <div class="vh-pl-15 vh-text-left">下一节审批人</div>
      </template> -->
      <template #default>
        <div class="vh-p-box">
          <van-radio-group v-model="radio" icon-size="0.64rem">
            <van-radio
              class="vh-mb-10"
              v-for="(user, index) in users"
              :key="index"
              :name="index"
              >{{ user }}</van-radio
            >
          </van-radio-group>
        </div>
      </template>
    </van-dialog>

    <van-popup
      v-model="showCheckDetail"
      position="right"
      closeable
      :style="{ width: '70%', height: '100%' }"
      @get-container="getContainer"
    >
      <div class="vh-flex-center vh-pt-40">666</div>
    </van-popup>
  </div>
</template>

<script>
import FileCard from '@comp/common/FileCard'
import ImgView from '@comp/common/ImgView'
export default {
  name: 'AssetPurchaseCheck',
  components: { FileCard, ImgView },
  data() {
    return {
      showCheckUser: false,
      showCheckDetail: false,
      radio: 0,
      users: ['张三', '李四', '王五']
    }
  },
  created() {},
  methods: {
    handleConfirmUser() {
      // 调佣接口
    },
    // 查看审批详情
    handleRightClick() {
      // console.log(555);
      this.showCheckDetail = true
    },
    getContainer() {
      return document.querySelector('.check-wrapper')
    }
  }
}
</script>

<style lang="less" scoped>
.check-wrapper {
  .asset-info {
  }
}
</style>
