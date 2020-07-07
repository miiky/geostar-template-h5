/*
 * @Description: 暴露给app调用的接口
 * @Author: miiky_yang
 * @Date: 2019-10-09 11:04:01
 * @LastEditors  : miiky_yang
 * @LastEditTime : 2020-01-07 17:52:40
 */
import bus from '@/utils/bus'

window.onImageUploadResult = (id, code, info) => {
  console.log('onImageUploadResult id=>', id)
  // console.log('onImageUploadResult path=>', path)
  console.log('onImageUploadResult code=>', code)
  console.log('onImageUploadResult info=>', info)
  if (id === '1001') {
    // 写文章上传封面图片
    bus.$emit('uploadArticleCover', {
      code: code,
      info: info
    })
  } else if (id === '1002') {
    bus.$emit('uploadArticleContentPic', {
      code: code,
      info: info
    })
  }

}

window.onWechatQrCodeResult = (res) => {
  bus.$emit('handleUploadWxQrcode', res)
}

window.onSelectFormResult = (res) => {
  bus.$emit('onSelectFormResult', res)
}

window.onSelectDynamicResult = (res) => {
  bus.$emit('onSelectDynamicResult', res)
}

window.onSelectEmployeeResult = (res) => {
  bus.$emit('onSelectEmployeeResult', res)
}
