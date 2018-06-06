
import config from 'common/config'
import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]
const MyPlugin = {
  install: function (Vue, options) {
    Vue.prototype.$http = axios
    // 处理url
    Vue.prototype.getUrl = function (url) {
      let getUrl = config.mockUrl + url
      return getUrl
    }
    Vue.prototype.messageBox = function (info, type, myCustomClass) {
      this.$message({
        message: info,
        type: type,
        duration: 2000,
        customClass: myCustomClass === undefined ? 'my-el-message' : myCustomClass
      })
    }
    Vue.prototype.loginFailure = function (file) {
      this.messageBox('登录失效，请重新登录', 'error')
      let t = null
      clearTimeout(t)
      t = setTimeout(() => {
        this.$router.push('/login')
        location.reload() // 主要是重新注入路由实例
      }, 1000)
    }
    // 处理返回数据 handle 为true时，组件自己处理返回数据
    Vue.prototype.handelResponse = function (res, cb, handle) {
      if (res.status === '2') { // 半小时不操作，返回登录页
        this.loginFailure()
      } else if (res.status === '0' || handle) {
        cb(res)
      } else if (res.status === '1') {
        this.messageBox(res.error[0], 'error')
      }
    }
    Vue.prototype.apiGet = function (url, data) {
      return new Promise((resolve, reject) => {
        this.$http.get(this.getUrl(url), data).then((response) => {
          this.handelResponse(response.data, resolve)
        }).catch((response) => { /*  reject(response) */
          this.messageBox('系统繁忙，请稍后再试', 'error')
        })
      })
    }
    Vue.prototype.apiPost = function (url, data, handle) {
      return new Promise((resolve, reject) => {
        this.$http.post(this.getUrl(url), data).then((response) => {
          this.handelResponse(response.data, resolve, handle)
        }).catch((response) => { /*  reject(response) */
          this.messageBox('系统繁忙，请稍后再试', 'error')
        })
      })
    }
  }
}
export default MyPlugin
