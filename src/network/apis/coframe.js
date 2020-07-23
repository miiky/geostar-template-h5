/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-17 10:50:59
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 12:17:18
 */
import Axios from '@/network/axios'

class Coframe {

  // 分页查询字典项 /api/dict-entries/page-search
  findByCriteria = (params) => Axios.get('/api/dict-entries/page-search', {
    params: params
  })
}

export default Coframe