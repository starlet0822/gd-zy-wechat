/*
 * @Description:审批公共混入
 * @Author: wuxxing
 * @LastEditTime: 2022-04-18 17:10:57
 */
import FileCard from '@comp/common/FileCard'
import ImgView from '@comp/common/ImgView'
import TimeLine from '@comp/common/TimeLine'
export default {
  components: { FileCard, ImgView, TimeLine },
  data() {
    return {
      showCheckUser: false, // 显隐下一批审批人
      showCheckDetail: false, // 显隐审批流程
      activeNames: [],
      approvers: [], // 下一审批人集合
      formData: [], // 页面数据
      checkPeopleData: null, // 审批下一人数据
      // 底部按钮
      btnList: [
        { text: '驳回', value: 'NO' },
        { text: '通过', value: 'YES' }
      ],
      // 参数相关
      parameters: {
        billId: ''
      },
      checkParam: {
        busKey: '',
        checkState: 'NO',
        remark: '同意',
        approver: '',
        openId: 'xiejieweidemo',
        state: ''
      }
    }
  },

  computed: {
    // 是否可以审核操作
    canCheck() {
      const { dataState } = this.$route.params
      return dataState === '0' // 待处理才显示
    }
  },
  methods: {}
}
