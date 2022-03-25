<!--
 * @Description: 搜索、筛选
 * @Author: wuxxing
 * @LastEditTime: 2022-03-25 14:17:11
-->
<template>
  <div class="search-filter-wrapper vh-flex-ac" :class="{ 'van-hairline--bottom': border }">
    <van-search
      class="vh-flex1"
      v-model="keyword"
      background="#fff"
      placeholder="请输入搜索关键词"
      show-action
      :readonly="dialog"
      @focus="onFocus"
      @input="handleInputChange"
    >
      <template #action>
        <div class="filter-box vh-flex-center">
          <van-icon
            :color="filtered ? themeColor : textColor"
            name="filter-o"
            size="0.7rem"
            @click="onFilter"
          />
        </div>
      </template>
    </van-search>
    <!-- <van-search
      v-model="keyword"
      show-action
      label="地址"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div class="filter-box">
          <van-icon name="filter-o" size="28" />
        </div>
      </template>
    </van-search> -->
    <!-- 搜索组件 -->
    <van-popup v-model="visibleSearchPage" position="bottom" :style="{ height: '100%' }">
      <SearchPage v-model="keyword" @cancel="onCancel" @search="onSearch"></SearchPage>
    </van-popup>
    <!-- 筛选组件 -->
    <van-action-sheet
      :style="{ width: '100%', height: '75%' }"
      v-model="visibleFilterMenu"
      title="全部筛选"
    >
      <FilterMenu @cancel="visibleFilterMenu = false" @confirm="onFilterConfirm"></FilterMenu>
    </van-action-sheet>
    <!-- <van-popup
      v-model="visibleFilterMenu"
      position="bottom"
      :style="{ width: '100%', height: '75%' }"
    >
      <FilterMenu @cancel="visibleFilterMenu = false"></FilterMenu>
    </van-popup> -->
  </div>
</template>

<script>
import SearchPage from './search.vue'
import FilterMenu from './FilterMenu.vue'
import { themeColor, textColor } from '@/config/constants'
export default {
  name: 'SearchFilter',
  components: {
    SearchPage,
    FilterMenu
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    border: Boolean,
    dialog: Boolean // 是否弹出
  },
  data() {
    return {
      keyword: this.value,
      filtered: false, // 是否已有筛选数据
      visibleSearchPage: false,
      visibleFilterMenu: false,
      themeColor,
      textColor
    }
  },
  computed: {
    // value: {
    //   get() {
    //     return this.value
    //   }
    //   // set(val) {
    //   //   this.keyword = val
    //   // }
    // }
  },
  methods: {
    onFocus() {
      // TODO 先不搞弹出交互
      if (!this.dialog) return false
      // this.visibleSearchPage = true
    },
    // 点击筛选
    onFilter() {
      this.visibleFilterMenu = true
    },
    handleInputChange(keyword) {
      this.$emit('update:value', keyword)
      this.$emit('change')
    },
    // 确定搜索
    onSearch(val) {
      this.$emit('search', val)
      this.onCancel()
      this.keyword = val
    },
    // 取消搜索
    onCancel() {
      this.visibleSearchPage = false
    },
    onFilterConfirm(filterQuery, noEmptyObj) {
      this.filtered = noEmptyObj
      this.visibleFilterMenu = false
      this.$emit('confirm', filterQuery, noEmptyObj)
    }
  }
}
</script>

<style lang="less" scoped>
.search-filter-wrapper {
  .filter-box {
  }
}
</style>
