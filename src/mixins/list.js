/*
 * @Description: 列表 混入
 * @Author: wuxxing
 * @LastEditTime: 2022-04-19 10:06:23
 */
export default {
  data() {
    return {
      tabs: [],
      tabActive: '0',
      dataList: [],
      error: false,
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0,
      // 参数相关
      pageRequest: {
        pageNum: 1,
        pageSize: 10
      },
      parameters: {
        dataState: '0', // 默认待处理
        queryTerm: ''
      }
    }
  },
  computed: {
    finishedText: {
      // 共${this.dataList.length}条数据
      get() {
        return this.dataList.length ? `没有更多了` : ''
      }
    }
  },
  methods: {
    onLoad() {
      this.getList()
    },
    // 列表刷新
    onRefresh() {
      console.log('列表数据刷新---')
      // 清空列表数据
      this.finished = false
      this.refreshing = true
      this.loading = true
      this.dataList = []
      this.totalSize = 0
      this.pageRequest.pageNum = 1
      this.onLoad()
    }
  }
}
