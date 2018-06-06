<template>
  <div class="manage-layout manage-layout-admin">
    <header1 :info="info"></header1>
    <div class="manage-side manage-bg-black">
      <div class="manage-side-scroll" >
        <!-- 左侧导航区域 -->
        <ul class="manage-nav manage-nav-tree">
          <router-link v-for="(item, index) in navList" :key="index" tag="li" v-if="item.meta.nav" :to="item.path" class="manage-nav-item"  >
            <a >{{item.name}}<span class="manage-nav-more"></span></a>
            <dl class="manage-nav-child" v-if="item.children">
              <router-link v-for="(itemC, index) in item.children" v-if="itemC.meta.nav" :key="index" tag="dd" :to="itemC.path"><a href="javascript:void (0);">{{itemC.name}}</a></router-link>
            </dl>
            <div class="manage-nav-bar"></div>
          </router-link>
          <router-link tag="li" to="/home/user" class="manage-nav-item"><a>个人中心<span class="manage-nav-more"></span></a>
            <div class="manage-nav-bar"></div>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="manage-body">
      <transition name="router-fade" mode="out-in"><router-view ></router-view></transition>
    </div>
  </div>
</template>

<script>
import header1 from '@/components/header/header.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    nav (el) {
    }
  },
  computed: {
    ...mapState({
      navList: function (state) {
        if (this.info.userType) {
          return state.navList[0].children
        }
      },
      info: function (state) {
        return state.userInfo
      }
    })
  },
  components: {
    header1
  }
}

</script>

<style lang="scss" scoped="" type="text/scss">
  @import  './../../assets/css/minin';
  .el-message{
    top:50%!important
  }
  .manage-side{
    .manage-nav-tree{
      .manage-nav-bar{
        height:45px;
        opacity: 0;
        @include myTransition(all, .3s);
      }
    }
    .manage-nav-item{
      a:hover {
        background-color:#4E5465;
        color:#fff;
      }
      &:hover  .manage-nav-bar{
        /*  @include myAnimation(fadeIn, 1s ,both)*/
        opacity: 100;
        @include myTransition(all, .2s);
      }
      .manage-nav-child{
        a:hover{
          background: 0 0;
          color:#fff
        }
      }
    }
    .manage-nav-itemed {
      .manage-nav-child{
        .manage-nav-itemed{
          a{
            background-color: #009688;
            color: #fff;
          }
        }
      }
    }
  }

</style>
