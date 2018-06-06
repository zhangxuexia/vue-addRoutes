<template>
  <div class="updatePassword">
  <el-dialog title="修改密码" :visible.sync="dialog" :before-close="cancel">
    <div id="myUpdate">
      <form id="myPassword" onsubmit="return false">
      <div class="item-row"><div class="item-label inline"><label>旧密码：</label></div>
        <div :class="[{'error': errors.has('oldpassword')},'inline item-input-block']">
          <input type="password" name="oldpassword " class="item-input "  v-model="password.oldpassword" data-vv-as="密码" v-validate="'required|password'" placeholder="密码以字母开头6-20个字母、数字或符号,至少两种" autocomplete="off">
          <span class="auThen-error">{{ errors.first('oldpassword ') }}</span>
        </div></div>
      <div class="item-row"><div class="item-label inline"><label>新密码：</label></div>
        <div :class="[{'error': errors.has('newpassword ')},'inline item-input-block']">
          <input type="password" name="newpassword" class="item-input " v-model="password.newpassword"  data-vv-as="密码" v-validate="'required|password'" placeholder="密码以字母开头6-20个字母、数字或符号,至少两种" autocomplete="off">
          <span class="auThen-error">{{ errors.first('newpassword ') }}</span>
        </div></div>
      </form>
      <div class="item-row"><div class="item-label inline"><label>确认密码：</label></div>
        <div :class="[{'error': confirmPassword},'inline item-input-block']">
          <input type="password"  class="item-input "   data-vv-as="密码" v-model="password.confirmPassword" placeholder="密码以字母开头6-20个字母、数字或符号,至少两种"  autocomplete="new-password">
          <span class="auThen-error">两次密码不一致</span>
        </div></div>

    </div>
    <div slot="footer" class="dialog-footer">
      <button class="item-btn cancel mr20" @click="cancel">取 消</button>
      <button class="item-btn item-btn-sub inline btn" @click="submit">确 定</button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { getForm } from 'common/util'
let Base64 = require('js-base64').Base64
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      password: {
        newpassword: '',
        confirmPassword: '',
        oldpassword: ''
      },
      confirmPassword: false,
      dialog: this.showDialog
    }
  },
  watch: {
    'password': {
      handler: function (curVal, oldVal) {
        if (curVal.newpassword === curVal.confirmPassword) {
          this.confirmPassword = false
        } else this.confirmPassword = true
      },
      deep: true
    }
  },
  methods: {
    cancel () {
      this.dialog = false
      this.$emit('change', this.dialog)
    },
    submit () {
      if (!this.confirmPassword) {
        this.$validator.validate().then(result => {
          if (result) {
            let old = this.password.oldpassword
            old = Base64.encode(old)
            let newP = this.password.newpassword
            newP = Base64.encode(newP)
            let query = {oldpassword: old, newpassword: newP}
            this.apiPost('/user/resetPassword', query).then((response) => {
              this.messageBox('密码修改成功,请重新登录', 'success')
              // this.cancel()
              let t = null
              clearTimeout(t)
              t = setTimeout(() => {
                this.$router.push('/login')
                location.reload() // 主要是重新注入路由实例
              }, 1000)
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss">
.updatePassword{
  .cancel{
    border: 1px solid #C9C9C9;
    background-color:#fff!important;
    color:#555;
    &:hover{
      color: #009688!important;
      border-color: #e6e6e6!important;
      background-color: #e6e6e6!important;
      border-radius: 2px;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      -ms-border-radius: 2px;
      -o-border-radius: 2px;
    }
  }
  .mr20{
    margin-right:20px
  }
}
</style>
