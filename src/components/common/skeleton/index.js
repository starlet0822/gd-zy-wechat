/*
 * @Description: 骨架屏
 * @Author: wuxxing
 * @LastEditTime: 2022-03-16 23:17:33
 */
import Vue from 'vue'
import Skeleton from './index'

export default new Vue({
  components: {
    Skeleton
  },
  template: `
    <div>
      <skeleton id="skeleton" style="display:none"/>
    </div>
  `
})
