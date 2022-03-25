<!--
 * @Description: 轮岗审批
 * @Author: wuxxing
 * @LastEditTime: 2022-03-25 15:02:01
-->
<template>
  <div class="rotational-check-wrapper vh-bg">
    <vh-nav-bar :left-arrow="true"></vh-nav-bar>
    <!-- 折叠面板 -->
    <van-collapse class="vh-mb-10 vh-rounded-12" v-model="activeNames">
      <van-collapse-item :name="item" v-for="item in 3" :key="item">
        <template #title>
          <div class="vh-color-blue">人员基本信息{{ item }}</div>
        </template>
        <template #default>
          <van-cell
            title-class="vh-color-tip"
            v-for="citem in 2"
            :key="citem"
            :title="'员工姓名' + citem"
            value="xxx"
          ></van-cell>
        </template>
      </van-collapse-item>
    </van-collapse>

    <!-- 表单 -->
    <van-form @submit="onSubmit">
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
      <!-- <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div> -->
    </van-form>
    <!-- 底部按钮组 -->
    <ButtonGroup :btn-arr="btnList" fixed @click="handleClickBtn"></ButtonGroup>
  </div>
</template>

<script>
import ButtonGroup from '@comp/global/ButtonGroup'
export default {
  name: 'RotationalCheck',
  components: {
    ButtonGroup
  },
  data() {
    return {
      activeNames: [1, 2],
      formInfo: {
        opinion: ''
      },
      btnList: [
        { text: '驳回', value: 'nopass' },
        { text: '同意', value: 'pass' }
      ],
      timer: null
    }
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    // 按钮回调
    handleClickBtn({ value }) {
      switch (value) {
        case 'pass':
          // this.showCheckUser = true
          this.$toast({
            message: '已同意',
            type: 'success',
            duration: 800,
            overlay: true,
            forbidClick: true
          })
          break
        case 'nopass':
          // this.showCheckUser = true
          this.$toast({
            message: '已驳回',
            type: 'success',
            duration: 800,
            overlay: true,
            forbidClick: true
          })
          break
      }
      // 返回上一页
      this.timer = setTimeout(() => {
        this.$router.back()
      }, 1500)
    }
  }
}
</script>

<style lang="less" scoped>
.rotational-check-wrapper {
  /deep/ .van-collapse-item__content {
    padding: 0;
  }
}
</style>
