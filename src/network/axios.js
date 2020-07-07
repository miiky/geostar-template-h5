/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2019-08-05 14:14:19
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-06 13:04:57
 */
import axios from 'axios'
import {
  Notify
} from 'vant'

const Axios = axios.create()
Axios.defaults.timeout = 50000

Axios.defaults.headers.post['Content-Type'] =
  'application/json;charset=UTF-8'

// 添加请求拦截器
Axios.interceptors.request.use(
  _config => {
    const token = '' //getToken()
    if (token) {
      _config.headers.common['Authorization'] = 'Bearer ' + token
    }
    _config.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
    return _config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
Axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response
  },
  err => {
    // 对响应错误做点什么
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          let status = err.response.data.error
          if (status === 'invalid_grant') {
            err.message = '用户名或密码错误'
          } else if (err.response.data.zh_error !== undefined && err.response.data.zh_error != null && err.response.data.zh_error !== '') {
            err.message = err.response.data.zh_error
          } else {
            err.message = '请求错误(400)'
          }
          break
        case 401:
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break
      }
    }
    Notify({
      type: 'danger',
      message: err.message,
      duration: 1500,
    })
    return Promise.reject(err)
  }
)

export default Axios