<template>
  <div class="login">
    <div class="login-bg forget-bg">
      <div class="forget-form">
        <div class="forget-tit tc">重置密码</div>
        <div v-if="forget.first">
        <div class="sub-forget-tit tc">请输入您要找回的账户</div>
          <form id="first" onsubmit="return false">
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>用户名：</label></div>
          <div :class="[{'error': errors.has('userName')},'inline item-input-block']">
            <input type="text" class="item-input" v-model="form.userName"  name="userName" data-vv-as="用户名"  v-validate="'required|name'" placeholder="请输入用户名">
            <span class="auThen-error">{{ errors.first('userName') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>验证码：</label></div>
          <div :class="[{'error': errors.has('verificationCode')},'inline item-input-block']">
            <div class="clearfix">
              <div class="fl code-input"><input type="text" class="item-input" v-model="form.verificationCode" name="verificationCode" data-vv-as="验证码"  v-validate="'required'" placeholder="请输入验证码">
            <span class="auThen-error">{{ errors.first('verificationCode') }}</span>
            </div>
            <div class="fr code-time-input">
              <div class="send-code" v-if="forget.sendBtn" @click="sendCode">发送验证码</div>
              <div class="send-code-time" v-if="!forget.sendBtn">{{forget.count}}s后可再次发送</div></div>
            </div>
            <div class="code-suc" v-if="!forget.sendBtn">验证码已发送至您的手机<span>{{forget.sendInfo}}</span></div>
          </div>
        </div>
          </form>
        <div class="item-row login-btn">
          <div class="item-label inline"></div>
          <div class="inline item-input-block">
            <button class="item-btn forget-btn-sub inline" @click="nextFirst" @keyup.enter="nextFirst">下一步</button>
          </div>
        </div>
        </div>
        <div v-if="forget.second">
          <div class="sub-forget-tit tc">请输入新密码</div>
          <div class="item-row">
            <div class="item-label inline"><label><em>*</em>新密码：</label></div>
            <div :class="[{'error': errors.has('password')},'inline item-input-block']">
              <input type="password" class="item-input " v-model="form.password"  name="password" data-vv-as="新密码"  v-validate="'required|password'" placeholder="密码以字母开头6-20个字母、数字或符号,至少两种">
              <span class="auThen-error">{{ errors.first('password') }}</span>
            </div>
          </div>
          <div class="item-row">
            <div class="item-label inline"><label><em>*</em>再确认：</label></div>
            <div :class="[{'error': confirmPassword},'inline item-input-block']">
              <input type="password" class="item-input " v-model="form.confirmPassword"  name="confirmPassword" data-vv-as="再确认"  v-validate="'required'" placeholder="密码以字母开头6-20个字母、数字或符号,至少两种">
              <span class="auThen-error">两次密码不一致</span>
            </div>
          </div>
          <div class="item-row login-btn">
            <div class="item-label inline"></div>
            <div class="inline item-input-block">
              <button class="item-btn forget-btn-sub inline" @click="submit" @keyup.enter="submit">确认</button>
            </div>
          </div>
        </div>
        <div v-if="forget.third">
          <div class="sub-forget-tit tc password-success">密码重置成功，请重新登录</div>
          <div class="item-row login-btn tc">
              <button class="item-btn forget-btn-sub inline" @click="login" @keyup.enter="login">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      forget: {
        first: true,
        second: false,
        third: false,
        sendBtn: true,
        sendInfo: '',
        count: '',
        timer: null
      },
      form: {
        userName: '',
        verificationCode: '',
        password: '',
        confirmPassword: ''
      },
      confirmPassword: false
    }
  },
  watch: {
    'form': {
      handler: function (curVal, oldVal) {
        if (curVal.password === curVal.confirmPassword) {
          this.confirmPassword = false
        } else this.confirmPassword = true
      },
      deep: true
    }
  },
  methods: {
    // 点击发送验证码
    sendCode () {
      this.$validator.validate('userName').then((result) => {
        if (result) {
          let query = {userName: this.form.userName}
          this.apiPost('/user/forgetPassword', query).then((response) => {
            this.forget.sendInfo = response.data.mobile
            this.timer() // 倒计时
          })
        }
      })
    },
    // 第一步 提交
    nextFirst () {
      this.$validator.validate().then((result) => {
        if (result) {
          let query = {userName: this.form.userName, verificationCode: this.form.verificationCode}
          this.apiPost('/user/check', query).then((response) => {
            this.forget.first = false
            this.forget.second = true
          })
        }
      })
    },
    // 第二步提交
    submit () {
      this.$validator.validate().then((result) => {
        if (result) {
          let query = {userName: this.form.userName}
          this.apiPost('/user/setPassword', query).then((response) => {
            this.forget.second = false
            this.forget.third = true
          })
        }
      })
    },
    // 第三步 登录
    login () {
      this.$router.push('/login')
    },
    // 倒计时 60s
    timer () {
      const TIME_COUNT = 60
      if (!this.forget.timer) {
        this.forget.count = TIME_COUNT
        this.forget.sendBtn = false
        this.forget.timer = setInterval(() => {
          if (this.forget.count > 0 && this.forget.count <= TIME_COUNT) {
            this.forget.count--
          } else {
            this.forget.sendBtn = true
            clearInterval(this.forget.timer)
            this.forget.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss">
  .login{
    .forget-bg{
      .forget-form{
        color:#094788;
        width:462px;
        height:360px;
        margin:50px auto;
        background-color:#fff;
        box-shadow:0px 0px  10px 5px #e4e3e3;
        padding:20px 0;
        .item-row{
          width:100%;
          height:60px;
          .code-input{
            width:60%;
            min-width:155px;
          }
          .code-suc{
            color:#456492;
            font-size:12px;
            margin-top:5px;
            span{
              color:#f79a36;
            }
          }
          .send-code{
            border:1px solid #4c74a1;
            padding:7px;
            cursor:pointer;
            &:hover{
              background-color:#eaf8ff;
            }
          }
          .code-time-input{
            .send-code-time{
              border:1px solid #4c74a1;
              color:#959595;
              padding:8px 1px;
              font-size:12px;
              width:96px;
            }
          }
        }
        .password-success{
          color:#09880c!important;
          padding:20px 0;
          margin-bottom:40px!important;
        }
        .forget-tit{
          font-size:18px;
          padding:20px 0;
        }
        .sub-forget-tit{
          color:#f79a36;
          font-size:12px;
          margin-bottom:10px;
        }
        .forget-btn-sub{
          background-color:#456492;
          width:200px;
          border-radius: 10px;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          -ms-border-radius: 10px;
          -o-border-radius: 10px;
          &:hover{
            background-color:#4c94d6;
          }
        }
      }
    }
  }
</style>
