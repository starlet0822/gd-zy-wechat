<!--
 * @Description: 用户展示表格
 * @Author: wuxxing
 * @LastEditTime: 2022-04-13 14:18:16
-->
<template>
  <div class="user-table-wrapper vh-bg-white">
    <van-row class="table__header" flex="flex" justify="center">
      <van-col span="4">工号</van-col>
      <van-col span="4">姓名</van-col>
      <van-col span="4">类型</van-col>
      <van-col span="6">开始时间</van-col>
      <van-col span="6">结束时间</van-col>
    </van-row>
    <van-row class="table__content" v-for="item in 20" :key="item">
      <van-col span="4" class="vh-color-blue">{{ item }}</van-col>
      <van-col span="4">张三</van-col>
      <van-col span="4">病假</van-col>
      <van-col span="6">2022-04-11</van-col>
      <van-col span="6">2022-04-12</van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  components: {},
  data() {
    return {
      tableData: [
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: '钢琴、书法、唱歌',
          address: '上海市崇明县城桥镇八一路739号'
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: '钢琴、书法、唱歌',
          address: '上海市青浦区青浦镇章浜路24号'
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: '钢琴、书法、唱歌',
          address: '上海市松江区乐都西路867-871号'
        }
      ],
      columns: [
        {
          field: 'name',
          title: '姓名',
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          formatter: function (rowData, rowIndex, pagingIndex, field) {
            return `<span class='cell-edit-color'>${rowData[field]}</span>`
          },
          isResize: true
        },
        {
          field: 'tel',
          title: '手机号码',
          width: 150,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        },
        {
          field: 'hobby',
          title: '爱好',
          width: 150,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        },
        {
          field: 'address',
          title: '地址',
          width: 280,
          titleAlign: 'center',
          columnAlign: 'left',
          isEdit: true,
          isResize: true
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.user-table-wrapper {
  // border: 1px solid #e4e4e4;
  border-right: 0;
  border-bottom: 1px solid #e4e4e4;
  max-height: 300px;
  overflow: auto;
  position: relative;
  .table__header {
    position: sticky;
    left: 0;
    top: 0;
    background-color: @color-orange;
    color: #fff;
    // font-size: 18px;
    text-align: center;
    .van-col {
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #e4e4e4;
    }
  }
  .table__content {
    text-align: center;
    .van-col {
      border-right: 1px solid #e4e4e4;
    }
  }
}
</style>

<style></style>
