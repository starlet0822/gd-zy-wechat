/*
 * @Description: 列表 混入
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 17:24:31
 */
import { dataState } from '@/config/constants'
export default {
  data() {
    return {
      // tabs: [],
      tabActive: '0',
      // 列表相关
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
      },
      filterMenu: [
        // 筛选菜单
        {
          field: 'empName',
          label: '申请人',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        {
          field: 'billNo',
          label: '申请单号',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        {
          field: 'deptCode', // TODO
          label: '申请科室',
          placeholder: '请输入',
          type: 'input',
          value: ''
        },
        {
          field: ['applyDate', 'applyEndDate'],
          // field: 'applyDate',
          label: '申请日期',
          placeholder: ['开始', '结束'],
          type: 'date',
          value: ['', '']
          // value: '2022-04-01'
        }
      ],
      filterQuery: {}, // 筛选参数
      tip: {
        icon: 'empty'
        // description: '暂无数据'
      },
      fixPlaceholder: '单据号、科室名称/编码、申请人',
      hrPlaceholder: '员工姓名'
    }
  },
  computed: {
    finishedText: {
      // 共${this.dataList.length}条数据
      get() {
        return this.dataList.length ? `没有更多了` : ''
      }
    },
    errorText: {
      get() {
        return this.error ? `请求失败，点击重新加载` : ''
      }
    },
    tabs: {
      get() {
        const tabs = []
        for (const [k, v] of dataState.entries()) {
          tabs.push({ id: k, title: v })
        }
        return tabs
      }
    }
  },
  created() {
    // this.setTabs()
  },
  activated() {
    this.onRefresh()
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
    },
    // 标签页切换
    onTabsChange(id, title) {
      this.parameters.dataState = id
      this.parameters.queryTerm = ''
      this.$nextTick(() => {
        const searchFilterRefs = this.$refs.searchFilterRef
        const curSearchFilterRef = searchFilterRefs.find((v) => v.keyId === id)
        this.parameters.queryTerm = curSearchFilterRef.keyword // 获取关键字
        this.onRefresh()
      })
    }
  }
}
