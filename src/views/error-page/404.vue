<!--
 * @Description: 404 页面
 * @Author: wuxxing
 * @LastEditTime: 2022-04-20 09:35:05
-->
<script>
export default {
  render: function (h) {
    return h('vh-tip', {
      class: 'error404',
      props: { icon: '404', description: '404 NOT FOUND' }
    })
  }
}
</script>
