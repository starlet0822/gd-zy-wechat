/*
 * @Description:审批公共混入
 * @Author: wuxxing
 * @LastEditTime: 2022-05-23 13:48:57
 */
import { findCheckInfoDetail, sendCheck } from '@/api/modules/common'
import { getIncreasingArr, findField } from '@/utils'
import FileCard from '@comp/common/FileCard'
import ImgView from '@comp/common/ImgView'
import TimeLine from '@comp/common/TimeLine'
import { mapGetters } from 'vuex'
export default {
  components: { FileCard, ImgView, TimeLine },
  data() {
    return {
      showCheckUser: false, // 显隐下一批审批人
      showCheckDetail: false, // 显隐审批流程
      activeNames: [], // 折叠板是否默认展开
      approvers: [], // 下一审批人集合
      dataInfo: null, // 审批详情数据
      formData: [], // 基本信息数据
      detailData: [], // 明细数据
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
      busKey: '', // 用于查询审批流程
      checkParam: {
        busKey: '',
        checkState: 'NO',
        remark: '',
        approver: '', // 下一审批人
        openId: 'xiejiewei' + 'demo', // TODO 手动改值测试
        state: ''
      }
    }
  },

  computed: {
    // 是否可以审核操作
    canCheck() {
      // const { dataState } = this.$route.params
      // return dataState === '0' // 待处理才显示
      return this.dataInfo && +this.dataInfo?.isNotCheck !== 0
    },
    // ! 企业微信跳转时必传 - 是否可以返回?
    canBack() {
      console.log('canBack', this.$route.params.canBack)
      if (!this.$route.params.canBack) return true
      return this.$route.params.canBack === 'true'
    },
    ...mapGetters(['openId'])
  },
  created() {
    // console.log(this.openId)
    this.checkParam.openId = this.openId // test
  },
  methods: {
    // 获取详情数据
    async getInfo() {
      const { id } = this.$route.params
      this.parameters.billId = this.checkParam.busKey = id
      const { errcode, data } = await findCheckInfoDetail({
        typeCode: this.typeCode,
        parameters: this.parameters
      })
      if (errcode === '0') {
        this.dataInfo = data
        this.busKey = data.busKey
        this.formData = [...data.formData, ...data.detailData] || []
        this.checkPeopleData = data.checkPeopleData || null
        this.activeNames = getIncreasingArr(this.formData?.length)
        // 目前只有当前页面需要获取状态state
        this.checkParam.state = findField(data.formData, 'state')?.fieldValue
        this.inOutType = findField(data.formData, 'inOutType')?.fieldValue
        // 获取code name
        // const user = findCodeName(this.formData)
        // this.checkParam = { ...user, ...this.checkParam }
      }
    },
    // 审批or驳回
    async checkInfo(type) {
      this.checkParam.checkState = type
      // 用户未填写意见时默认补充意见
      if (type === 'YES') {
        if (this.checkParam.remark.trim() === '') {
          this.checkParam.remark = '同意'
        }
      } else {
        if (this.checkParam.remark.trim() === '') {
          this.$toast({ message: `请填写审批意见` })
          return
        }
      }
      const { errcode, errmsg } = await sendCheck({
        typeCode: this.typeCode,
        checkParam: this.checkParam
      })
      if (errcode === '0') {
        this.$toast({
          message: type === 'YES' ? '已同意' : '已驳回',
          type: 'success',
          duration: 800,
          closeOnClick: true,
          // overlay: true,
          forbidClick: true
        })
        this.$router.back()
      } else {
        // this.checkParam.remark = '' // 提交未成功清空审批意见
        this.$toast({
          message: errmsg,
          type: 'fail',
          duration: 3000,
          closeOnClick: true,
          // overlay: true,
          // className: 'vh-color-orange',
          forbidClick: true
        })
      }
    },
    handleConfirmUser(type = 'YES') {
      if (!this.approvers.length) {
        this.$toast({
          message: `请选择下一审批人！`,
          type: 'error',
          duration: 1500,
          // overlay: true,
          forbidClick: true
        })
        return
      }
      this.checkParam.approver = this.approvers.join(',')
      // 调接口
      this.checkInfo(type)
    },
    // 按钮回调
    handleClickBtn({ value }) {
      switch (value) {
        case 'YES':
          if (this.checkPeopleData?.rowData.length) {
            this.showCheckUser = true
          } else {
            this.checkInfo(value)
          }
          break
        case 'NO':
          this.checkParam.approver = ''
          this.checkInfo(value)
          break
      }
    },
    // 查看审批详情
    handleRightClick() {
      this.showCheckDetail = true
      this.$nextTick(() => {
        this.$refs.timeLineRef.findCheckInfo()
      })
    }
  }
}
