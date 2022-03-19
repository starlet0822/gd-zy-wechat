<template>
  <div class="hello">
    <h1 class="vh-font22">{{ userName }}</h1>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="primary" @click="changeUsername" v-waves>actions调用</van-button>
    <van-button type="primary">主要按钮</van-button>
    <router-link to="/about">
      <van-button type="info">关于</van-button>
    </router-link>
    <van-cell v-waves class="vh-required" title="审核状态" value="通过"></van-cell>

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
      <TagBox class="vh-mr-10" v-for="item in 5" :key="item"></TagBox>
    </div>

    <h2 class="vh-p-10 vh-border-y-1">上吧</h2>
    <vh-empty></vh-empty>
    <van-tabbar v-model="active" placeholder>
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import vars from '@/assets/css/vars.less'
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
import { _camelCase } from '@utils/index'
import TagBox from '@comp/common/TagBox'
export default {
  name: 'HelloWorld',
  components: {
    TagBox
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
      ]
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
  },
  methods: {
    ...mapMutations(['SET_USER_NAME']),
    ...mapActions('user', ['/setUserName']),
    changeUsername() {
      // this.SET_USER_NAME('我是修改后的名称')
      this.setUserName('我是修改后的名称')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  color: @color-red;
  font-size: 15px;
}
</style>
