/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2019-08-05 14:14:19
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 10:14:36
 */
import axios from 'axios'
import store from '@/store'
import config from '@/config'
import router from '@/router'
import {
  Notify
} from 'vant'

const Axios = axios.create({
  baseURL: '/',
  headers: {
    Locale: config.lang,
    Channel: 'website',
    overflow: false,
    [config.eos_key]: config.eos_value
  }
})
Axios.defaults.timeout = 10000

// 添加请求拦截器
Axios.interceptors.request.use(
  _config => {
    // 封装token
    const token = store.getters.token
    if (token) {
      _config.headers.Authorization = token
    }
    // 处理post请求
    if (_config.method == 'post' && _config.data.params) {
      _config.transformRequest = [
        data => {
          data = data.params
          // 对 data 进行转换处理
          let ret = ''
          for (let it in data) {
            if (data[it] != undefined)
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret.endsWith('&') ? ret.slice(0, ret.length - 1) : ret
        }
      ]
    }
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
    if (response.status == 200) {
      response = response.data
    }
    return response
  },
  err => {
    // 对响应错误做点什么
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
        case 401:
          err.message = err.response.data.message
          router.push({
            name: 'LoginPage'
          })
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
      // 判断请求异常信息中是否含有超时timeout字符串
      if (err.message.includes('timeout')) {
        err.message = '请求超时'
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