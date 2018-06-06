<template>
  <div>
  <div class="manage-header" >
    <div class="manage-logo">后台管理</div>
    <!-- 头部区域 -->
    <ul class="manage-nav manage-layout-right fr">
      <li class="manage-nav-item clearfix">
        <div class="manage-nav-header-img fl">
          <img :src="info.logo" class="avatar" v-if="info.logo!==''&&info.logo!==null">
        </div>
        <a href="javascript:void (0);" class="fr userName">
          {{info.userName}}
          <span class="manage-nav-more"></span></a>
        <div class="manage-content">
        <dl class="manage-nav-child manage-anim manage-anim-upbit manage-nav-child-new">
          <router-link  tag="dd" to="/home/user"><a href="javascript:void (0);">基本资料</a></router-link>
          <dd><a href="javascript:void (0);" @click="modyPassword">修改密码</a></dd>
          <dd><a href="javascript:void (0);" @click="loginOut">退出</a></dd>
        </dl>
        </div>
        <div class="manage-nav-bar"></div>
      </li>
     </ul>
  </div>
    <updatePassword v-if="showDialog" :showDialog="showDialog" @change="dialogChange"></updatePassword>
  </div>
</template>
<script type="text/ecmascript-6">
import updatePassword from '@/page/user/updatePassword'
export default {
  props: {
    info: {}
  },
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    modyPassword () {
      this.showDialog = true
    },
    dialogChange (dialog) {
      this.showDialog = dialog
    },
    // 退出登录
    loginOut () {
      this.apiPost('/user/logout').then((response) => {
        this.messageBox('操作成功', 'success')
        this.$store.state.userInfo = {} // 清除vuex储存的用户信息
        this.$store.state.navList = []
        let t = null
        clearTimeout(t)
        t = setTimeout(() => {
          this.$router.push('/login')
          location.reload() // 主要是重新注入路由实例
        }, 1000)
      })
    }
  },
  components: {
    updatePassword
  }
}
</script>
<style lang="scss" scoped="" type="text/scss">
  @import  './../../assets/css/minin';
  .manage-header{
    .manage-nav{
      .manage-nav-item{
        .userName{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        a{
          position:relative;
          margin:0 auto;
        }
        &:hover .manage-nav-bar{
          opacity: 100;
          @include myTransition(all, .2s);
        }
        &:hover dl{
              display:block;
            }
        &:hover .manage-nav-more{
        margin-top: -8px;
        border-style: dashed dashed solid;
        border-color: transparent transparent #fff;
      }
        .manage-nav-bar{
          width:100%;
         opacity: 0;
          @include myTransition(all, .3s);
        }
        .manage-nav-header-img{
          .avatar{
            height:20px;
            width:20px;
            display: inline-block;
            overflow: hidden;
            line-height: 1;
            vertical-align: middle;
            border-radius: 3px;
          }
        }
      }
    }

  }
</style>
