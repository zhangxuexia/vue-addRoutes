import axios from 'axios'
import config from 'common/config'
import { Message } from 'element-ui'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]
export function getUserInfo () {
  return new Promise((resolve, reject) => {
    axios.post(config.mockUrl + '/user/userDetail').then((response) => {
      let a = response.data
      resolve(a)
    }).catch((response) => { /*  reject(response) */
      Message({
        message: '系统繁忙，请稍后再试',
        type: 'error',
        customClass: 'my-el-message'
      })
    })
  })
}
