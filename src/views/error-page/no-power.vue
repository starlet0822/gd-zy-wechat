<!--
 * @Description: 无权限页面
 * @Author: wuxxing
 * @LastEditTime: 2022-04-15 17:06:18
-->
<script>
export default {
  data() {
    return {
      tilte: ''
    }
  },
  created() {
    this.tilte = this.$route.meta?.tilte
  },
  render: function (h) {
    return h('vh-tip', {
      props: {
        icon: 'lock',
        description: `抱歉，该${this.tilte ? this.tilte : ''}页面您无权限访问！`
      }
    })
  }
}
</script>
