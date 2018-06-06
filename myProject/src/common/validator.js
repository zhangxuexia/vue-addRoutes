import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
// 自定义提示
const dictionary = {
  zn: {
    messages: {
      required: (field) => field + '不能为空',
      max: () => '元素最大长度为20位'
    }
  }
}
Validator.localize('zh_CN', {
  messages: dictionary.zn.messages
})
Validator.extend('phone', {
  getMessage: field => field + '格式输入不正确',
  validate: value => {
    return /^1[3|4|7|5|8]\d{9}$/.test(value)
  }
})
Validator.extend('password', {
  getMessage: field => field + '以字母开头6-20个字母、数字或符号,至少两种',
  validate: value => {
    return /^[a-zA-Z](?![a-zA-Z]+$)[a-zA-Z0-9\D]{5,19}$/.test(value)
  }
})
Validator.extend('name', {
  getMessage: field => '字母数字长度2至14位，汉字位数2至6位',
  validate: value => {
    return /^([\u4e00-\u9fa5]{2,6}|[a-zA-Z\d]{2,14})$/.test(value)
  }
})
export default function () {
  Vue.use(VeeValidate)
}
