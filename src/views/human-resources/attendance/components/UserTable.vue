<template>
  <div class="fake-table">
    <van-row class="fake-table__head">
      <van-col
        class="col vh-flex-center"
        v-for="(item, index) in headData"
        :key="index"
        :span="item.span"
      >
        {{ item.name }}
      </van-col>
    </van-row>
    <van-row class="fake-table__body" v-for="(item, index) in bodyData" :key="index">
      <template v-for="(colItem, colIndex) in headData">
        <van-col
          class="col vh-flex-center"
          :span="colItem.span"
          :key="colIndex"
          v-if="colItem.prop"
        >
          <span>{{ item[colItem.prop] }}</span>
        </van-col>
      </template>
    </van-row>
  </div>
</template>
<script>
export default {
  props: {
    headData: {
      type: Array,
      default: () => []
    },
    bodyData: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@col-padding: 5px;

.fake-table {
  margin: 12px;
  &__head,
  &__body {
    border: 1px solid #dddddd;
    &:not(:last-child) {
      border-bottom: none;
    }
  }
  &__head {
    font-size: 14px;
    background: #f5faff;
    .col {
      // font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      padding: @col-padding;
    }
  }
  &__body {
    .col {
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      padding: 5px 0;
      // padding: @col-padding;
      // padding: @colPaddingLeft @colPaddingLeft @colPaddingLeft
      //   calc(@colPaddingLeft - @inputPaddingLeft);
      // &:last-child {
      //   padding-left: @inputPaddingLeft;
      // }
    }
  }
}
</style>
