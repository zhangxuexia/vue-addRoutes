const mutations = {
  userLogin (state, userData) {
    state.userInfo = Object.assign({}, state.userInfo, userData)
  },
  navList (state, navList) {
    state.navList = navList
  }
}
export default mutations
