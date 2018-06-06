import Vue from 'vue'
import {Button, Upload, DatePicker, Message, Dialog, Notification, Radio, Checkbox, CheckboxGroup, Select, Option} from 'element-ui'
export default function elementUi () {
  Vue.use(Button)
  Vue.use(Upload)
  Vue.use(DatePicker)
  Vue.use(Dialog)
  Vue.use(Radio)
  Vue.use(Checkbox)
  Vue.use(CheckboxGroup)
  Vue.use(Select)
  Vue.use(Option)
  Vue.prototype.$message = Message
  Vue.prototype.$notify = Notification
}
