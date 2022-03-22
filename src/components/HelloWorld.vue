<template>
  <div class="hello vh-bg">
    <!-- <h1 class="vh-font22">{{ userName }}</h1>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="primary" @click="changeUsername" v-waves>actions调用</van-button>
    <van-button type="primary">主要按钮</van-button>
    <router-link to="/about">
      <van-button type="info">关于</van-button>
    </router-link>
    <router-link to="/asset-purchase">
      <van-button type="warning">审批</van-button>
    </router-link> -->
    <!-- <van-cell
      v-waves
      class=""
      title="审核状态"
      value="通过"
      v-for="item in 5"
      :key="item"
    ></van-cell> -->

    <!-- <MoveTabs>
      <div>
        <van-cell v-for="item in 10" :key="item" title="列表"></van-cell>
      </div>
    </MoveTabs> -->
    <van-form :show-error-message="false" validate-first scroll-to-error>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请填写密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        readonly
        v-model="type"
        name="类型"
        label="类型"
        placeholder="请选择类型"
        :rules="[{ required: false, message: '请选择类型' }]"
        is-link
      />
    </van-form>

    <!--    <div class="vh-flex-row">-->
    <!--      <div class="vh-flex4 file-name van-ellipsis">-->
    <!--        文件名称文件名称文件名称文件名称文件名称文件名称文件名称文件名称van-ellipsis-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="file-name van-multi-ellipsis&#45;&#45;l2">-->
    <!--      {{-->
    <!--        '文件名称文件名称文件名称文件名称文件名称文件名称文件名称文件名称van-multi-ellipsis&#45;&#45;l2' +-->
    <!--        '文件名称文件名称文件名称文件名称文件名称文件名称文件名称文件名称van-multi-ellipsis&#45;&#45;l2'-->
    <!--      }}-->
    <!--    </div>-->

    <div class="vh-p-box vh-flex-wrap">
      <TagBox
        class="vh-mr-10"
        v-for="item in 5"
        :key="item"
        :closeable="[4].includes(item)"
        @close="handleClose(item)"
      ></TagBox>
    </div>

    <h2 class="vh-p-10 vh-border-y-1">上吧{{ ret }}</h2>
    <vh-empty></vh-empty>
    <van-tabbar v-model="active" fixed placeholder>
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import vars from '@/assets/css/vars.less'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { _camelCase } from '@utils/index'
import { mul, div } from '@/utils/calculate'
// import { Decimal } from 'decimal.js'
import TagBox from '@comp/common/TagBox'
// import MoveTabs from '@comp/common/MoveTabs'
// import ButtonGroup from '@comp/global/ButtonGroup'
export default {
  name: 'HelloWorld',
  components: {
    TagBox
    // MoveTabs,
    // ButtonGroup
  },
  mixins: [],
  props: {
    msg: String
  },
  data() {
    return {
      active: 0,
      name: 'wxx',
      arr: [
        { id: '1', lang: 'html' },
        { id: '2', lang: 'css' },
        { id: '3', lang: 'js' }
      ],
      username: '',
      password: '',
      type: '',
      ret: ''
    }
  },
  computed: {
    ...mapGetters(['userName', 'roles2'])
  },
  created() {
    console.log('js引入less变量', vars)
    console.log('userName', this.userName, this.roles2)
    console.log(_camelCase('starlet-wu'))
    console.log('id拼接', this._joinKey2String(this.arr))
    // this.ret = add(2.0, 3)
    // this.ret = sub(0, 0.2)
    this.ret = mul(1, 2, 3)
    this.ret = div(1, 2)
    console.log('结果：', this.ret)
    // const x = new Decimal(0.1) // '255.9375'
    // const y = new Decimal(0.2) // '172'
    // this.ret = x.mul(y)
    // console.log(x, y, this.ret)
  },
  methods: {
    ...mapMutations(['SET_USER_NAME']),
    ...mapActions('user', ['/setUserName']),
    changeUsername() {
      // this.SET_USER_NAME('我是修改后的名称')
      this.setUserName('我是修改后的名称')
    },
    handleClose(event) {
      console.log(event)
    }
  }
}
</script>

<style scoped lang="less"></style>
