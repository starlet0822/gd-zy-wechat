<!--
 * @Description: 轮转审批 TODO: 待需求确定
 * @Author: wuxxing
 * @LastEditTime: 2022-05-24 17:39:11
-->
<template>
  <div class="rotary-check-wrapper vh-bg">
    <vh-nav-bar @click-right="handleRightClick">
      <template #right>
        <div class="vh-color-white">审批详情</div>
      </template>
    </vh-nav-bar>
    <div class="check-info vh-mb-10 vh-bg-white">
      <!-- 折叠面板 -->
      <van-collapse v-model="activeNames" :border="false">
        <van-collapse-item :name="0" class="vh-mb-100" :border="false">
          <template #title>
            <div class="vh-color-blue">人员基本信息</div>
          </template>
          <template #default>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'员工姓名'"
              :value="dataInfo.userInfo.name"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'员工编号'"
              :value="dataInfo.userInfo.no"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'员工类型'"
              :value="'xxxx'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'部门'"
              :value="'xxxx'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'单位编号'"
              :value="'xxxx'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'出生日期'"
              :value="'xxxx'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'参加工作时间'"
              :value="'xxxx'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'岗位'"
              :value="'xxxx'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'岗位等级'"
              :value="'xxxx'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'第一学历'"
              :value="'xxxx'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'最高学历'"
              :value="'xxxx'"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'毕业时间'"
              :value="'xxxx'"
            ></van-cell>
          </template>
        </van-collapse-item>
        <van-collapse-item :name="1" class="vh-mb-100" :border="false">
          <template #title>
            <div class="vh-color-blue">人员轮转信息</div>
          </template>
          <template #default>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'申请日期'"
              value="xxxx"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'轮转部门'"
              value="xxxx"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'轮转开始时间'"
              value="xxxx"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'轮转结束时间'"
              value="xxxx"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'轮转说明'"
              value="xxxx"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'带教老师'"
              value="xxxx"
            ></van-cell>
            <van-cell
              class="vh-font-14"
              title-class="vh-color-tip"
              :title="'轮转部门负责人'"
              value="xxxx"
            ></van-cell>
          </template>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="vh-mb-10">
      <van-field
        v-model="formInfo.opinion"
        name="opinion"
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
    <!-- 附件上传 -->
    <van-collapse v-model="activeNames" :border="false">
      <van-collapse-item :name="0" class="vh-mb-10" :border="false">
        <template #title>
          <div class="vh-color-blue">附件</div>
        </template>
        <template #default>
          <!-- 图片集 -->
          <ImgView border></ImgView>
          <!-- 文件列表 -->
          <FileCard class="vh-color-text"></FileCard>
        </template>
      </van-collapse-item>
    </van-collapse>
    <van-popup
      v-model="showCheckDetail"
      position="right"
      closeable
      :style="{ width: '90%', height: '100%' }"
    >
      <div class="vh-pt-20 vh-pl-5">
        <TimeLine></TimeLine>
      </div>
    </van-popup>
    <!-- 底部按钮组 -->
    <vh-button-group :btn-arr="btnList" fixed @click="handleClickBtn"></vh-button-group>
  </div>
</template>

<script>
import vars from '@/assets/css/vars.less'
import FileCard from '@comp/common/FileCard'
import ImgView from '@comp/common/ImgView'
import TimeLine from '@comp/common/TimeLine'
export default {
  name: 'RotaryCheck',
  components: { FileCard, ImgView, TimeLine },
  data() {
    return {
      dataInfo: {
        userInfo: {
          name: '张三',
          no: '6675',
          depName: '信息管理办公室'
        },
        rotaryInfo: {
          type: '年假',
          balance: '10.00',
          dayNum: 5,
          applyDate: new Date(),
          startDate: new Date(),
          endDate: new Date(),
          reason: '休年假',
          start: '上午',
          end: '下午'
        }
      },
      activeNames: [0, 1],
      showCheckDetail: false,
      formInfo: {
        opinion: ''
      },
      btnList: [
        { text: '驳回', value: 'nopass' },
        { text: '同意', value: 'pass' }
      ],
      colorYellow: vars.colorYellow,
      colorRed: vars.colorRed
    }
  },
  created() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values)
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
.rotary-check-wrapper {
  /deep/.check-info {
    .van-collapse-item__title {
      background: @color-bg;
    }
    .van-collapse-item__content {
      padding: 0;
      .van-cell {
        // font-size: @font14;
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
