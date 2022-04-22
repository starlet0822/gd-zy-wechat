<template>
  <div class="fake-table">
    <van-row class="fake-table__head">
      <van-col class="col" v-for="(item, index) in headData" :key="index" :span="item.span">
        {{ item.name }}
      </van-col>
    </van-row>
    <van-row class="fake-table__body" v-for="(item, index) in bodyData" :key="index">
      <template v-for="(colItem, colIndex) in headData">
        <van-col class="col" :span="colItem.span" :key="colIndex" v-if="colItem.prop">
          <van-field
            v-model="item[colItem.prop]"
            placeholder="请输入名称"
            :disabled="item.editDisable"
            :class="[item.editDisable ? 'input-diabled' : 'input-abled']"
          />
          <span>{{ item[colItem.prop] }}</span>
        </van-col>
        <van-col
          class="col"
          :span="colItem.span"
          :key="colIndex"
          @click.stop.capture="doThis($event, index)"
          v-else
        >
          <slot></slot>
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
  methods: {
    doThis(e, rowIdx) {
      if (e.target.id === 'edit') {
        this.$emit('edit', rowIdx)
      } else if (e.target.id === 'delete') {
        this.$emit('delete', rowIdx)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@inputPaddingLeft: 5px;
@colPaddingLeft: 10px;

.fake-table /deep/ .van-field__control {
  padding-left: @inputPaddingLeft;
}

.col /deep/ .van-cell {
  padding: 0;
}

.col /deep/ .input-diabled {
  border: none;
}

.col /deep/ .input-abled {
  border: 1px solid #dddddd;
}

.table-col {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #313131;
}

.fake-table {
  margin: 0 12px;
  &__head,
  &__body {
    border: 1px solid #dddddd;
    &:not(:last-child) {
      border-bottom: none;
    }
  }
  &__head {
    height: 40px;
    background: #f5faff;
    .col:extend(.table-col) {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      padding: @colPaddingLeft;
    }
  }
  &__body {
    .col:extend(.table-col) {
      font-size: 13px;
      font-weight: 400;
      line-height: 18px;
      padding: @colPaddingLeft @colPaddingLeft @colPaddingLeft
        calc(@colPaddingLeft - @inputPaddingLeft);
      &:last-child {
        padding-left: @inputPaddingLeft;
      }
    }
  }
}
</style>
