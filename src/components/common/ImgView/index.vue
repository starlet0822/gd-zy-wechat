<!--
 * @Description: 图片展示
 * @Author: wuxxing
 * @LastEditTime: 2022-04-08 13:42:52
-->
<template>
  <div class="imgView-wrapper vh-p-box12 vh-bg-white" :class="{ 'van-hairline--bottom': border }">
    <!-- <div class="vh-flex-wrap"> -->
    <van-image
      class="imgItem vh-mr-10"
      v-for="(img, index) in imgList"
      :key="index"
      width="1.3rem"
      height="1.3rem"
      fit="cover"
      radius="0.16rem"
      lazy-load
      :src="img"
      v-lazy="img"
      @click="handleClickImg(img, index)"
    />
    <!-- </div> -->
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { isPic } from '@/utils/is'
export default {
  name: 'ImgView',
  props: {
    value: {
      type: Array,
      default: () => [
        {
          fileName: '文件名称1.doc',
          fileSize: '1024kb',
          filePath: 'https://img01.yzcdn.cn/vant/cat.jpeg'
        },
        {
          fileName: '文件名称2.xlsx',
          fileSize: '20kb',
          filePath: 'http://tva1.sinaimg.cn/large/006nwNl2gy1h0e2hh0x9kj30go0rpadd.jpg'
        },
        {
          fileName: '文件名称3.ppt',
          fileSize: '108kb',
          filePath: 'http://tva1.sinaimg.cn/large/006nwNl2gy1h0e2hyxqnxj30go0uwtds.jpg'
        }
      ]
    },
    border: Boolean
  },
  data() {
    return {}
  },
  computed: {
    imgList: {
      get() {
        const imgs = this.value.filter((v) => isPic(v.fileType))
        return imgs.map((item) => {
          const prefix = 'http://10.10.247.31:8089/'
          const url = prefix + `/api/file/getUrlFile?path=${item.filePath}&isview=1`
          return url
        })
      }
    }
  },
  created() {},
  methods: {
    // 预览图片
    handleClickImg(img, index) {
      // const { filePath } = img
      this.handlePreview(index)
    },
    handlePreview(index) {
      const imgsrcArr = this.imgList
      ImagePreview({
        images: imgsrcArr,
        startPosition: +index,
        closeable: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.imgView-wrapper {
  .imgItem {
    overflow: hidden;
    // &:not(:last-child) {
    //   margin-right: 10px;
    // }
  }
}
</style>
