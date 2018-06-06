<template>
  <div>
    <h1 class="manage-body-tit">
      个人中心
      <span>基本信息</span>
    </h1>
    <div class="policy-form">
      <form id="info" onsubmit="return false">
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>用户名：</label></div>
          <div :class="[{'error': errors.has('userName')},'inline item-input-block']" >
            <input type="text"  class="item-input" v-model="userInfo.userName" name="userName" data-vv-as="用户名"  v-validate="'required|name'" placeholder="字母数字长度2至14位，汉字位数2至6位">
            <span class="auThen-error">{{ errors.first('userName') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>联系方式：</label></div>
          <div :class="[{'error': errors.has('mobile')},'inline item-input-block']">
            <input type="text" class="item-input " v-model="userInfo.mobile" name="mobile" data-vv-as="联系方式" v-validate="'required'">
            <span class="auThen-error">{{ errors.first('mobile') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>Logo：</label></div>
          <div class="inline item-input-block">
            <div class="fl info-logo clearfix">
              <img :src="imageUrl" v-if="imageUrl!==''&&imageUrl!==null">
              <input class="none" name="logo" :value="imageUrl">
            </div>
            <div class="fr info-logo-btn">
              <el-upload
                class="upload-demo"
                :action="imgUpload"
                :on-error="handleFileError"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </div>
        </div>
      </form>
        <div class="tc company-heade">
          企业基本信息
        </div>
      <div class="company-info">
        <div class="item-row">
          <div class="item-label inline"><label>企业名称：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="userInfo.company" name="company"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业网址：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="userInfo.website" name="website"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业地址：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="userInfo.address" name="address"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业电话：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="userInfo.phone" name="phone"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>营业执照代码：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="userInfo.businessLicense" name="businessLicense"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>组织机构代码：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="userInfo.orgCode" name="orgCode"></div>
        </div>
      </div>
        <div class="item-row">
          <div class="item-label inline"></div>
          <div class="inline item-input-block tc">
            <button class="item-btn item-btn-sub inline btn" @click="submitInfo">确认</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {getForm, getFileType} from 'common/util'
import config from 'common/config'
export default {
  data () {
    return {
      imageUrl: '',
      userInfo: {},
      imgUpload: config.imgUpload
    }
  },
  created () {
    this.imageUrl = this.$store.state.userInfo.logo
    this.userInfo = Object.assign({}, this.userInfo, this.$store.state.userInfo)
  },
  methods: {
    // 图片上传成功回调
    handleAvatarSuccess (res, file) {
      this.imageUrl = res.data
    },
    beforeAvatarUpload (file) {
      const isJPG = getFileType(file.name, 'image')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.messageBox('上传图片只能是 JPG或者PNG 格式!', 'error')
      }
      if (!isLt2M) {
        this.messageBox('上传头像图片大小不能超过 2MB!', 'error')
      }
      return isJPG && isLt2M
    },
    handleFileError (err, file, fileList) { // 登录过期
      this.handelResponse(err)
    },
    // 确认修改
    submitInfo () {
      this.$validator.validate().then(result => {
        if (result) {
          let query = getForm('info')
          this.apiPost('/user/update', query).then((response) => {
            this.messageBox('操作成功', 'success')
            let a = response.data
            this.info = a
            this.$store.dispatch('userLogin', a).then(() => {
              this.imageUrl = this.$store.state.userInfo.logo
              this.userInfo = Object.assign({}, this.userInfo, this.$store.state.userInfo)
            }
            )
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss">
.policy-form{
  .none-input{
    border: none;
  }
  .sub-title{
    text-align:left;
    padding-left:10px;
  }
  .info-logo{
    img{
      height:100%;
      width:100%;
    }
    height: 90px;
    width:90px;
    padding: 5px;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
  }
  .info-logo-btn{
    position: absolute;
    bottom: 0;
    left:140px;
  }
  .company-heade{
    margin:70px 0 20px
  }
  .company-info{
    border:1px solid #e6e6e6;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
    width:49%;
    padding:10px;
    margin:20px auto
  }
}
</style>
