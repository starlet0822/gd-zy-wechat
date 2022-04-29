<!--
 * @Description: 搜索、筛选
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 17:08:16
-->
<template>
  <div class="search-filter-wrapper vh-flex-ac" :class="{ 'van-hairline--bottom': border }">
    <van-search
      class="search-box vh-flex1"
      v-model.trim="keyword"
      background="#fff"
      :placeholder="placeholder"
      :show-action="true"
      :readonly="dialog"
      @focus="onFocus"
      @input="handleInputChange"
      @search="onSearch"
    >
      <template #action>
        <!-- 过滤按钮 -->
        <div v-if="canFilter && showFilter" class="filter-box vh-flex-center">
          <van-icon
            :color="filtered ? themeColor : colorTip"
            name="filter-o"
            size="0.7rem"
            @click="onFilter"
          />
        </div>
        <!-- 搜索按钮 -->
        <div v-else class="vh-flex-center" @click="onSearch">
          <van-button class="vh-px-12" type="info" size="mini">查询</van-button>
        </div>
      </template>
    </van-search>
    <!-- 搜索组件 -->
    <van-popup v-model="visibleSearchPage" position="bottom" :style="{ height: '100%' }">
      <SearchPage v-model="keyword" @cancel="onCancel" @search="onSearch"></SearchPage>
    </van-popup>
    <!-- 筛选组件 -->
    <!-- <van-action-sheet
      :style="{ width: '100%', 'max-height': '85vh' }"
      v-model="visibleFilterMenu"
      title="全部筛选"
      teleport="body"
      @close="onCloseFilterMenu"
    >
      <FilterMenu
        ref="filterMenuRef"
        @cancel="visibleFilterMenu = false"
        @confirm="onFilterConfirm"
        v-bind="$attrs"
      ></FilterMenu>
    </van-action-sheet> -->
    <van-popup
      v-model="visibleFilterMenu"
      position="bottom"
      round
      :closeable="false"
      get-container="body"
      :style="{ width: '100%', 'max-height': '85vh' }"
    >
      <FilterMenu
        ref="filterMenuRef"
        @cancel="visibleFilterMenu = false"
        @confirm="onFilterConfirm"
        v-bind="$attrs"
      ></FilterMenu>
    </van-popup>
  </div>
</template>

<script>
import SearchPage from './search.vue'
import FilterMenu from './FilterMenu.vue'
import vars from '@css/vars.less'
export default {
  name: 'SearchFilter',
  // inheritAttrs: false,
  components: {
    SearchPage,
    FilterMenu
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    // 是否开启过滤，默认开启
    canFilter: {
      type: Boolean,
      default: true
    },
    border: Boolean,
    dialog: Boolean, // 是否弹出
    placeholder: {
      type: String,
      default: '搜索'
    },
    keyId: [String, Number] // 标识key
  },
  data() {
    return {
      keyword: this.value,
      filtered: false, // 是否已有筛选数据
      showFilter: this.canFilter, // 控制查询和筛选显隐
      visibleSearchPage: false,
      visibleFilterMenu: false,
      themeColor: vars.themeColor,
      colorTip: vars.colorTip
    }
  },
  methods: {
    onFocus() {
      // TODO 先不搞弹出交互
      this.showFilter = false
      if (!this.dialog) return false
      // this.visibleSearchPage = true
    },
    onBlur() {
      this.showFilter = true
    },
    // 点击筛选
    onFilter() {
      this.visibleFilterMenu = true
    },
    handleInputChange(keyword) {
      this.$emit('update:value', keyword)
      // this.$emit('search', keyword)
    },
    // 确定搜索
    onSearch() {
      console.log('确定搜索', this.keyword)
      this.$emit('search', this.keyword)
      this.onBlur()
      // this.onCancel()
    },
    // 取消搜索
    onCancel() {
      this.visibleSearchPage = false
    },
    onFilterConfirm(filterQuery, noEmptyObj) {
      this.filtered = noEmptyObj
      this.visibleFilterMenu = false
      this.$emit('confirm', filterQuery, noEmptyObj)
    },
    // TODO关闭动作面板触发的回调
    onCloseFilterMenu() {
      // const filterMenuRef = this.$refs.filterMenuRef
      // filterMenuRef.filterConfirm()
    }
  }
}
</script>

<style lang="less" scoped>
.search-filter-wrapper {
  /deep/ .search-box {
    .van-icon-search:before {
      color: @color-tip;
    }
    .van-cell {
      padding: 8px 8px 8px 0;
    }
  }

  .filter-box {
  }
}
</style>
