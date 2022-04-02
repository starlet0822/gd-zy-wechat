<!--
 * @Description: 搜索、筛选
 * @Author: wuxxing
 * @LastEditTime: 2022-04-02 09:57:40
-->
<template>
  <div class="search-filter-wrapper vh-flex-ac" :class="{ 'van-hairline--bottom': border }">
    <van-search
      class="search-box vh-flex1"
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
            :color="filtered ? themeColor : colorTip"
            name="filter-o"
            size="0.7rem"
            @click="onFilter"
          />
        </div>
      </template>
    </van-search>
    <!-- 搜索组件 -->
    <van-popup v-model="visibleSearchPage" position="bottom" :style="{ height: '100%' }">
      <SearchPage v-model="keyword" @cancel="onCancel" @search="onSearch"></SearchPage>
    </van-popup>
    <!-- 筛选组件 -->
    <van-action-sheet
      :style="{ width: '100%', 'max-height': '85vh' }"
      v-model="visibleFilterMenu"
      title="全部筛选"
      @close="onCloseFilterMenu"
    >
      <FilterMenu
        ref="filterMenuRef"
        @cancel="visibleFilterMenu = false"
        @confirm="onFilterConfirm"
      ></FilterMenu>
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
import vars from '@css/vars.less'
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
      themeColor: vars.themeColor,
      colorTip: vars.colorTip
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
      this.$emit('search', keyword)
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
    },
    // 关闭动作面板触发的回调
    onCloseFilterMenu() {
      const filterMenuRef = this.$refs.filterMenuRef
      // console.log(filterMenuRef, 555)
      filterMenuRef.filterConfirm()
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
  }

  .filter-box {
  }
}
</style>
