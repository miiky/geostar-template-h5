/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-10 15:03:51
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-15 18:36:36
 */
import Axios from '@/network/axios'

class File {

  // 附件预览 /api/file/preview
  preview = (params) => Axios.get('/api/file/preview', {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    responseType: 'blob',
    params: params
  })
}

export default File