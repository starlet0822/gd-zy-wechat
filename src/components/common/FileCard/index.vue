<!--
 * @Description: 文件展示
 * @Author: wuxxing
 * @LastEditTime: 2022-05-05 11:31:57
-->
<template>
  <div class="file-card-wrapper">
    <div
      class="file-item van-hairline--bottom vh-flex-ac vh-bg-white"
      v-for="(file, index) in fileList"
      :key="file.fileName + index"
      v-waves
      @click="onClickFile(file)"
    >
      <div class="vh-flex-center">
        <van-icon size="0.8533rem" name="description" />
      </div>
      <div class="file-info vh-ml-12 vh-flex1">
        <div class="file-name vh-font-14 van-multi-ellipsis--l2">
          {{ file.fileName }}
        </div>
        <div class="file-size vh-tip">{{ getFileSize(file.fileSize) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFileSize } from '@/utils/file'
import { isPic } from '@/utils/is'
import { API_BASEURL, ISDEV } from '@/config'
const { devProxyTarget } = require('@/config/settings')
export default {
  name: 'FileCard',
  props: {
    value: {
      type: [Array],
      default: () => [
        // {
        //   fileName: '文件名称1.doc',
        //   fileSize: '1024kb',
        //   filePath: 'https://xxx'
        // },
        // {
        //   fileName: '文件名称2.xlsx',
        //   fileSize: '20kb',
        //   filePath: 'https://xxx'
        // },
        // {
        //   fileName: '文件名称3.ppt',
        //   fileSize: '108kb',
        //   filePath: 'https://xxx'
        // }
      ]
    }
  },
  data() {
    return {
      getFileSize
    }
  },
  computed: {
    fileList: {
      get() {
        return this.value.filter((v) => !isPic(v.fileType))
      }
    }
  },
  methods: {
    // 点击文件 TODO: 文件大小转换
    onClickFile(file) {
      const prefix = ISDEV ? devProxyTarget : API_BASEURL
      const url = prefix + `/api/file/getUrlFile?path=${file.filePath}&isview=1`
      window.open(url)
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
