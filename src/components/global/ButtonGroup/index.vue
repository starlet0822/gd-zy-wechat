<!--
 * @Description: 功能按钮组
 * @Author: wuxxing
 * @LastEditTime: 2022-03-22 13:43:15
-->
<template>
  <div class="button-group-wrapper vh-flex-ac vh-fixed-b vh-bg-white vh-p-box van-hairline--top">
    <van-button
      class="button-item"
      :type="index === 1 ? 'info' : 'default'"
      v-for="(btn, index) in btnArr.slice(0, 2)"
      :key="index"
      block
      :size="size"
      icon-position="right"
      @click="handleClickBtn(btn)"
    >
      {{ btn.text }}
      <template #icon>
        <!-- :get-container="getContainer" -->
        <van-popover
          :style="{ width: '100%' }"
          class="other-btn-popover"
          v-model="showMoreBtn"
          placement="top-start"
          trigger="click"
          :get-container="getContainer"
        >
          <div class="other-btns" v-if="index === 1">
            <!-- <template v-if="index === 1"> -->
            <van-button
              class="button-item--other"
              type="default"
              block
              :size="size"
              icon="plus"
              @click="handleClickBtn(btnOther)"
              v-for="(btnOther, indexOther) in otherBtns"
              :key="btnOther.value + indexOther"
            >
              {{ btnOther.text }}
            </van-button>
            <!-- </template> -->
          </div>
          <template #reference>
            <van-icon
              class="vh-pl-8 vh-pt-5"
              v-if="btnArr.length > 2 && index === 1"
              name="more-o"
              @click.stop="handleClickMore"
            />
          </template>
        </van-popover>
        <!-- <van-icon
          class="vh-pl-8"
          v-if="btnArr.length > 2 && index === 1"
          name="arrow-down"
          @click.stop="handleClickMore"
        /> -->
      </template>
    </van-button>
    <!-- <van-button block type="info">信息按钮</van-button> -->
    <!-- 更多按钮集合 -->
    <!-- <van-dropdown-menu direction="up" active-color="#1989fa">
      <van-dropdown-item :options="otherBtns" />
      <van-dropdown-item title="更多" ref="item">
        <div class="other-btns vh-p-box">
          <van-button class="button-item" type="info" block @click="onConfirm">返回</van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu> -->
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
  props: {
    btnArr: {
      type: Array,
      default: () => [
        { text: '驳回', value: 'nopass', disabled: false, color: '', plain: false },
        { text: '提交', value: 'submit', disabled: false, color: '', plain: false },
        { text: '通过', value: 'pass', disabled: false, color: '', plain: false }
      ]
    },
    size: {
      type: String,
      default: 'normal',
      validator(val) {
        return ['large', 'small', 'mini', 'normal'].includes(val) // large small mini
      }
    }
  },
  data() {
    return {
      showMoreBtn: false
      // otherBtns: []
    }
  },
  computed: {
    otherBtns: {
      get() {
        return this.btnArr.slice(2)
      }
    }
  },
  created() {},
  methods: {
    onConfirm() {},
    handleClickBtn(btn) {
      console.log('点击按钮', btn)
    },
    handleClickMore() {
      console.log('点击展开更多')
      this.showMoreBtn = true
    },
    getContainer() {
      return document.querySelector('body')
    }
  }
}
</script>
<style lang="less">
// .van-popover__content {
//   .other-btns .button-item--other {
//     .button-item {
//       margin: 0 8px;
//     }
//   }
// }
</style>

<style lang="less" scoped>
.button-group-wrapper {
  padding: 10px 8px;
  box-sizing: border-box;
  .button-item {
    margin: 0 8px;
    // height: 36px;
    &.van-button--default {
      background-color: @color-bg;
    }
    &--other {
      height: 36px;
    }
  }
}
</style>
