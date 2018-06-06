<template>
  <div>
    <div class="layui-row">
      <div class="layui-col-xs12">
        <div class="grid-demo grid-demo-bg1">6/12</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  created () {
    this.apiPost('/index.php/api/overview/insurantMsg').then((response) => {
      let a = response.data
      this.notice(a)
    })
  },
  methods: {
    notice (data) {
      this.$notify.info({
        title: '系统提示',
        dangerouslyUseHTMLString: true,
        message: this.message(data),
        duration: 0,
        customClass: 'my-message'
      })
    },
    message (data) {
      let content = `<div class="index-loginTime"><div class="index-row"><em>上次登录时间：</em><span class="blue">${data.lastLoginTime}</span></div>
       <div class="index-row"><em>服务时间：</em><span class="blue">${data.alreadyService}天</span></div>
       <div class="index-row"><em>保险剩余时间：</em><span class="blue">${data.remaining}天</span></div>
      `
      if (data.remaining <= 90) {
        content += '<span class="red">您的网站保险即将到期，如若续期，请提前联系保险公司续期！</span>'
      }
      content += '</div>'
      return content
    }
  },
  destroyed () {
    this.$notify.closeAll()
  }
}
</script>

<style lang="scss" scoped="" type="text/scss">
  .manage-layout-body{
    .index-loginTime{
      background-color:red;
      .blue{
        color: #52bcc9;
      }
      .red{
        color:#cd494d!important;
      }
    }
  }
</style>
