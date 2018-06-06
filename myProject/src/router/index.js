import Vue from 'vue'
import Router from 'vue-router'
import store from './../vuex/store'
import { Message } from 'element-ui'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('@/page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('@/components/login/login')), 'login')
const forget = r => require.ensure([], () => r(require('@/components/login/forget')), 'gorget')
const user = r => require.ensure([], () => r(require('@/page/user/info')), 'user')
const companyIndex = r => require.ensure([], () => r(require('@/page/index/company')), 'companyIndex')
const serviceIndex = r => require.ensure([], () => r(require('@/page/index/service')), 'serviceIndex')
const userIndex = r => require.ensure([], () => r(require('@/page/index/user')), 'userIndex')
const userList = r => require.ensure([], () => r(require('@/page/policy/user/list')), 'userList')
const policy = r => require.ensure([], () => r(require('@/page/policy/index')), 'policy')
const repolicy = r => require.ensure([], () => r(require('@/page/policy/repolicy/list')), 'repolicy')
const companyList = r => require.ensure([], () => r(require('@/page/policy/company/list')), 'companyList')
const addCompany = r => require.ensure([], () => r(require('@/page/policy/company/add')), 'addCompany')
const detailCompany = r => require.ensure([], () => r(require('@/page/policy/company/detail')), 'detailCompany')
const serviceList = r => require.ensure([], () => r(require('@/page/policy/service/list')), 'serviceList')
const detailService = r => require.ensure([], () => r(require('@/page/policy/service/detail')), 'detailService')

let routes = [{path: '/login', component: login}, {path: '/forget', component: forget}, {path: '/', component: home}, {path: '/home', component: home, children: [{path: '/home/user', name: '个人中心', component: user}]}]
/* 权限路由：role: 0:被保险人、1:保险专员、2:服务专员, nav: true可以渲染在导航栏 */
export const asyncRoutes = [
  {
    path: 'home',
    component: home,
    redirect: '/home/index',
    meta: {role: ['0', '1', '2'], nav: false},
    children:
      [
        {
          path: '/home/index',
          name: '保单概览',
          component: companyIndex,
          meta: { role: ['1'], nav: true }
        },
        {
          path: '/home/index',
          name: '保单概览',
          component: serviceIndex,
          meta: { role: ['2'], nav: true }
        },
        {
          path: '/home/index',
          name: '保单概览',
          component: userIndex,
          meta: { role: ['0'], nav: true }
        },
        {
          path: '/policy',
          name: '保单管理',
          component: policy,
          redirect: '/policy/list',
          meta: { role: ['0'], nav: true },
          children: [
            {
              path: 'list',
              name: '保单',
              component: userList,
              meta: { role: ['0'], nav: true }
            }
          ]},
        {
          path: '/policy',
          name: '保单管理',
          component: policy,
          redirect: '/policy/company',
          meta: { role: ['1'], nav: true },
          children: [
            {
              path: '/policy/company',
              name: '保单',
              redirect: '/policy/company/list',
              component: policy,
              meta: { role: ['1'], nav: true },
              children: [
                {
                  path: 'list',
                  name: '保单',
                  component: companyList,
                  meta: { role: ['1'], nav: false }
                },
                {
                  path: 'detail/:policyNum',
                  name: '保单详情',
                  component: detailCompany,
                  meta: { role: ['1'], nav: false }
                },
                {
                  path: 'add',
                  name: '添加保单',
                  component: addCompany,
                  meta: { role: ['1'], nav: false }
                }
              ]},
            {
              path: '/policy/prelist',
              name: '预保单',
              component: repolicy,
              meta: { role: ['1'], nav: true }
            }
          ]
        },
        {
          path: '/policy',
          name: '保单管理',
          component: policy,
          redirect: '/policy/company',
          meta: { role: ['2'], nav: true },
          children: [
            {
              path: '/policy/company',
              name: '保单',
              redirect: '/policy/company/list',
              component: policy,
              meta: { role: ['2'], nav: true },
              children: [
                {
                  path: 'list',
                  name: '保单',
                  component: serviceList,
                  meta: { role: ['2'], nav: false }
                },
                {
                  path: 'detail/:policyNum',
                  name: '保单详情',
                  component: detailService,
                  meta: { role: ['2'], nav: false }
                }
              ]
            }
          ]
        }
      ]
  }
]
let router = new Router({
  'linkActiveClass': 'manage-nav-itemed',
  routes: routes,
  mode: 'history'
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // 第一步 先去vuex拉取用户信息
  let info = store.state.userInfo
  let infoLength = Object.keys(info).length === 0
  // infoLength为true 说明是第一次访问系统或者刷新页面,在这里判断路由'/login'，防止进入死循环。未登录，status为1，跳到登录页面，已登录，status为0，继续访问页面
  if (infoLength && to.path !== '/login' && to.path !== '/forget') {
    store.dispatch('getUserInfo').then((response) => {
      if (response.status === '0') {
        store.dispatch('userLogin', response.data) // 将用户基本信息存入vuex
        store.dispatch('permission', response.data.userType).then(() => { // 根据用户角色，动态添加权限路由
          router.addRoutes(store.state.navList)
          next({ ...to, replace: true })
        }
        )
      } else if (response.status === '1') {
        next('/login')
      } else if (response.status === '2') { // 刷新时登录失效
        next() // 刷新后 加载出原页面再提示登录失效，防止出现空白页面
        Message({
          message: '登录失效,请重新登录',
          type: 'error',
          duration: 2000,
          showClose: true,
          customClass: 'my-el-message',
          onClose: function () {
            next('/login')
          }
        })
      }
    })
  } else { // infoLength为false 说明是静态点击，不需要任何操作
    next()
  }
})
export default router
