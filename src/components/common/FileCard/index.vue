<!--
 * @Description: 文件展示
 * @Author: wuxxing
 * @LastEditTime: 2022-04-01 11:51:48
-->
<template>
  <div class="file-card-wrapper">
    <div
      class="file-item van-hairline--bottom vh-flex-ac vh-bg-white"
      v-for="(file, index) in fileList"
      :key="file.fileName + index"
      v-waves
    >
      <div class="vh-flex-center">
        <van-icon size="32" name="description" />
      </div>
      <div class="file-info vh-ml-12 vh-flex1">
        <div class="file-name vh-font-14 van-multi-ellipsis--l2">
          {{ file.fileName }}
        </div>
        <div class="file-size vh-tip">{{ file.fileSize }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileCard',
  props: {
    value: {
      type: [Array],
      default: () => [
        {
          fileName: '文件名称1.doc',
          fileSize: '1024kb',
          filePath: 'https://xxx'
        },
        {
          fileName: '文件名称2.xlsx',
          fileSize: '20kb',
          filePath: 'https://xxx'
        },
        {
          fileName: '文件名称3.ppt',
          fileSize: '108kb',
          filePath: 'https://xxx'
        }
      ]
    }
  },
  computed: {
    fileList: {
      get() {
        return this.value
      }
    }
  }
}
</script>

<style lang="less" scoped>
.file-card-wrapper {
  .file-item {
    padding: 8px 0;
  }
}
</style>
