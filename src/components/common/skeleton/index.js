/*
 * @Description: 骨架屏
 * @Author: wuxxing
 * @LastEditTime: 2022-06-17 15:36:32
 */
import Vue from 'vue'
import Skeleton from './index'

export default new Vue({
  components: {
    Skeleton
  },
  template: `
    <div>
      <skeleton id="skeleton" style="display:none;"/>
    </div>
  `
})
