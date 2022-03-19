/*
 * @Description:公共混入
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 11:12:20
 */
import { _joinKey2String } from '@/utils/index'

export default {
  install: function (Vue) {
    Vue.mixin({
      data () {
        return {
          //  ...
        }
      },
      methods: {
        _joinKey2String
      }
    })
  }
}
