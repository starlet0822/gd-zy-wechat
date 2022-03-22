<!--
 * @Description:资产购置审核
 * @Author: wuxxing
 * @LastEditTime: 2022-03-22 15:48:47
-->
<template>
  <div class="check-wrapper vh-bg">
    <vh-nav-bar @click-right="handleRightClick">
      <template #right>
        <div class="vh-color-white">审批详情</div>
      </template>
    </vh-nav-bar>
    <!-- 折叠面板 -->
    <van-collapse class="vh-m-10" v-model="activeNames">
      <van-collapse-item :name="item" v-for="item in 3" :key="item">
        <template #title>
          <div class="vh-color-blue">标题{{ item }}</div>
        </template>
        <template #default>
          <van-cell
            v-for="citem in 5"
            :key="citem"
            :title="'资产名称' + citem"
            value="xxx"
          ></van-cell>
        </template>
      </van-collapse-item>
    </van-collapse>
    <!-- <div class="asset-info vh-rounded-12 vh-m-10" v-for="item in 3" :key="item">
      <van-cell
        title-class="vh-color-blue"
        :border="false"
        :title="'基本信息'"
        value="xxx"
      ></van-cell>
      <van-cell title="资产名称" value="xxx"></van-cell>
      <van-cell title="资产名称" value="xxx"></van-cell>
      <van-cell title="资产名称" value="xxx"></van-cell>
      <van-cell title="资产名称" value="xxx"></van-cell>
      <van-cell title="资产名称" value="xxx"></van-cell>
      <van-cell title="资产名称00" value="xxx"></van-cell>
    </div> -->
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
    <!-- 底部按钮组 -->
    <ButtonGroup :btn-arr="btnList" fixed @click="handleClickBtn"></ButtonGroup>
    <!-- <van-tabbar v-model="active" fixed placeholder>
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
    </van-tabbar> -->
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
export default {
  name: 'AssetPurchaseCheck',
  components: { FileCard, ImgView, TimeLine, ButtonGroup },
  data() {
    return {
      showCheckUser: false,
      showCheckDetail: false,
      active: 0,
      radio: 0,
      activeNames: [1],
      users: ['张三', '李四', '王五'],
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
  }
}
</style>
