<template>
 <router-view ></router-view>
</template>
<style lang="scss" type="text/scss">
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
