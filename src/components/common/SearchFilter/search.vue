<!--
 * @Description: 搜索页
 * @Author: wuxxing
 * @LastEditTime: 2022-03-23 14:27:03
-->
<template>
  <div class="search-page-wrapper">
    <van-search
      v-model="keyword"
      v-bind="$attrs"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    onSearch(val) {
      this.$emit('search', val)
    },
    onCancel() {
      // this.$router.back()
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less" scoped>
.search-page-wrapper {
}
</style>
