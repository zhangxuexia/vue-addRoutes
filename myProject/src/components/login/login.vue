<template>
  <div class="login">
    <div class="login-bg">
       <div class="login-form">
         <div class=" tc login-tit">登录</div>
          <form onsubmit="return false" id="login">
     <div class="item-row">
       <div class="item-label inline"><label><em>*</em>用户名：</label></div>
       <div :class="[{'error': errors.has('userName')},'inline item-input-block']">
         <input type="text" class="item-input "   name="userName" data-vv-as="用户名"  v-validate="'required'" placeholder="请输入用户名">
         <span class="auThen-error">{{ errors.first('userName') }}</span>
       </div>
     </div>
     <div class="item-row">
       <div class="item-label inline"><label><em>*</em>密码：</label></div>
       <div :class="[{'error': errors.has('passWord')},'inline item-input-block']">
         <input type="text" class="item-input" v-model="passWord"  name="passWord" data-vv-as="密码"  v-validate="'required|password'" placeholder="请输入密码">
         <span class="auThen-error">{{ errors.first('passWord') }}</span>
       </div>
     </div>
     <div class="item-row login-btn">
       <div class="item-label inline"></div>
       <div class="inline item-input-block">
       <button class="item-btn login-btn-sub inline" @click="submit" @keyup.enter="submit">登录</button>
         <router-link  to="/forget" class="forget">忘记密码</router-link>
       </div>
     </div>
   </form>
       </div>
    </div>
  </div>
</template>

<script>
import {getForm} from 'common/util'
import config from 'common/config'
export default {
  data () {
    return {
      passWord: ''
    }
  },
  methods: {
    submit () {
      this.$validator.validate().then(result => {
        if (result) {
          let query = getForm('login')
          this.apiPost('/user/login', query, true).then((response) => {
            if (response.status === '0') {
              this.messageBox('操作成功', 'success')
              this.$router.push('/home/index')
            } else {
              this.messageBox(response.error[0], 'error')
              this.fresh()
            }
          })
        }
      })
    }
  }

}
</script>

<style lang="scss" type="text/scss">
  @import  './../../assets/css/minin';
    .login{
      .login-bg{
          .login-title{
            position:relative;
            top:100px;
            left:23%;
            width:13%;
            img{
              width:100%;
              min-width:174px;
            }
          }
        @media screen and (max-width: 1153px) {
          .login-title {
            top:30px;
            left:52%;
            width:17%;
          }
        }
          .login-form{
            background-color:rgba(252,252,254,0.8);
            color:#094788;
          /*  position:relative;
            top:60px;
            right:10%;*/
            margin:auto;
            width:580px;
            min-height:300px;
            .item-row{
              width:100%;
              height:60px;
              input{
                background-color:#fff!important;
              }
            }
            .code-input{
              width:30%;
            }
            .code-div{
              margin-left:10px;
              height:38px;
              width:60%;
              img{
                width:80%;
              }
            }
            .login-number{
              width: 30%;
              color: #ab2223;
              cursor: pointer;
              padding: 7px 0 0 5px;
              font-size: 14px;
            }
            .login-tit{
              width:100%;
              margin-top:10px;
              padding:20px 0;
              font-size:20px;
            }
            .login-btn{
              margin:40px 0;
            }
            .login-btn-sub{
              background-color: #6a1600;
              width:200px;
              @include myBackground(90deg, #ab2223 66%, white 266%);
              @include boxShadow(inset 0px 1px 1px 0px #e45e3e, 0px 2px 5px 0px rgba(0, 0, 0, 0.75), inset 0px -1px 0 0px #571200);
              @include textShadow(0px 2px 3px rgba(0, 0, 0, 0.5));
              @include myRadius(10px);
              border: 1px solid #721701;
              &:hover{
                background-color:#ab2223;
              }
            }
            .forget{
              color:#ff9a18;
              margin-left:10px;
              &:hover{
                cursor:pointer;
                color:#f7b053;
              }
            }
          }
        /*}*/
      }
    }
</style>
