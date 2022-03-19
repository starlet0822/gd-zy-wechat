/*
 * @Description: 事件总线
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 11:24:15
 */
import Vue from 'vue'
const eventBus = new Vue()

export default eventBus

/*
  用法：
  在 A 页面 触发监听
  import Bus from '@/utils/eventBus'
  Bus.$emit('send', 123)

  在 B 页面 设置监听事件（一般在 created 或 mounted 中监听）
  import Bus from '@/utils/eventBus'
  Bus.$on('send', (data) => {
    console.log(data)  // 打印了 123
  })
*/
