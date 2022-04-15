<!--
 * @Description: 404 页面
 * @Author: wuxxing
 * @LastEditTime: 2022-04-15 17:05:17
-->
<script>
export default {
  render: function (h) {
    // const self = this
    return h('vh-tip', {
      class: 'error404',
      props: { icon: '404', description: '404 NOT FOUND' }
      // on: { click: self.$router.push('/no-power') }
    })
  }
}
</script>
