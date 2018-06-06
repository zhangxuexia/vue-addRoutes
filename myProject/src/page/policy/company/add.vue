<template>
  <div class="policy-form">
    <h1 class="manage-body-tit">
      管理
      <span>添加</span>
    </h1>
    <form id="policy" onsubmit="return false">
    <!--<div class="slide-tit act mb20 sub-title">
      基本信息
      <div :class="[{'act':!shrink1},'policy-shrink']" @click="shrink1= !shrink1">
        <span v-if="shrink1">收起</span>
        <span v-else>展开</span></div>
    </div>-->
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink1},'policy-shrink-from']" >
      <div v-show="shrink.shrink1">
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>第一项：</label></div>
          <div :class="[{'error': errors.has('name1')},'inline item-input-block']">
            <input type="text" class="item-input"   name="name1" data-vv-as="第一项"  v-validate="'required|max:20'" placeholder="长度不能超过20">
            <span class="auThen-error">{{ errors.first('name1') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>下拉框：</label></div>
          <div class="inline item-input-block">
            <el-select  v-model="option.plan" placeholder="请选择">
              <el-option
                v-for="item in option.reportData"
                :key="item.id"
                :label="item.policyPlan"
                :value="item.id">
              </el-option>
            </el-select>
            <input class="none" :value="option.plan" name="planId">
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>有效期：</label></div>
          <div class="inline item-input-block policy-date">
            <el-date-picker
              v-model="option.validityStart"
              name="validityStart"
              type="date"
              :clearable=false
              :picker-options="option.pickerOptions1"
              placeholder="开始日期">
            </el-date-picker>
            至
            <el-date-picker
              v-model="option.validityEnd"
              type="date"
              :clearable=false
              name="validityEnd"
              :picker-options="option.pickerOptions2"
              placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>状态：</label></div>
          <div class="inline item-input-block policy-radio">
            <el-radio  v-model="option.status" label="0">状态1</el-radio>
            <el-radio  v-model="option.status" label="1">状态2</el-radio>
            <el-radio  v-model="option.status" label="2">状态3</el-radio>
            <input class="none" :value="option.status" name="status">
          </div>
        </div>
      </div>
    </div>
    <div class="slide-tit act mb20 sub-title">
      信息
      <div :class="[{'act':!shrink.shrink4},'policy-shrink']" @click="getHeight('shrink4')">
        <span v-if="shrink.shrink4">收起</span>
        <span v-else>展开</span></div>
    </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink4},'policy-shrink-from']" :style="{height:shrink.shrink4Height}">
      <div id="shrink4" class="shrink">
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>名称：</label></div>
          <div :class="[{'error': errors.has('name45')},'inline item-input-block']">
            <input type="text" class="item-input "  name="name45" data-vv-as="名称"  v-validate="'required'">
            <span class="auThen-error">{{ errors.first('name45') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>附件：</label></div>
          <div class="inline item-input-block">
            <el-upload
              class="upload-demo"
              :action="uploadOther"
              :on-success="handleFileSuccess"
              :on-error="handleFileError"
              :show-file-list="true"
              :on-exceed="handleExceed"
              :limit="5"
              :on-remove="handleRemove"
              :before-upload="beforeFileUpload"
            >
              <input name="insOther"  class="none" v-model="fileListV">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">最多只能上传5个文件</div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-tit act mb20 sub-title">
      多选框
      <div :class="[{'act':!shrink.shrink5},'policy-shrink']" @click="getHeight('shrink5')">
        <span v-if="shrink.shrink5">收起</span>
        <span v-else>展开</span></div>
    </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink5},'policy-shrink-from']" :style="{height:shrink.shrink5Height}">
      <div id="shrink5" class="shrink">
        <div class="service-content clearfix">
        <el-checkbox-group v-model="serviceList.serviceId" class="clearfix">
          <div class="check-box-group" v-for="(item, index) in serviceList.allList.dailyList" :key="index"><el-checkbox  :label="String(item.id)" :disabled="option.plan!=0">{{item.name}}服务</el-checkbox></div>
        </el-checkbox-group>
        </div>
      </div>
    </div>
    </form>
    <div class="item-row">
      <div class="item-label inline"></div>
      <div class="inline item-input-block tc">
        <button class="item-btn item-btn-sub inline btn" @click="submit">提交</button>
        <button class="item-btn item-btn-primary inline btn" @click="back">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import {getForm, computedHight, getFileType} from 'common/util'
import config from 'common/config'
export default {
  data () {
    return {
      shrink: {
        shrink1: true,
        shrink4: true,
        shrink4Height: '',
        shrink5: true,
        shrink5Height: ''
      },
      startDate: new Date(),
      option: {
        plan: '',
        status: '0',
        validityStart: new Date(),
        validityEnd: new Date(),
        pickerOptions1: {},
        pickerOptions2: {},
        reportData: []
      },
      // 上传列表
      fileList: [],
      // input 值 上传列表
      fileListV: '',
      // 列表
      serviceList: {
        allList: {},
        serviceId: {}
      },
      userInfo: {},
      // 上传接口
      uploadOther: config.uploadOther
    }
  },
  created () {
    // 名称
    this.userInfo = Object.assign({}, this.userInfo, this.$store.state.userInfo)
  },
  mounted () {
    this.getHeight('shrink4', true)
  },
  watch: {
    'option.plan': {
      handler: function (curVal, oldVal) {
        this.service()
      }
    },
    // 分别给开始结束日期 限制选择面板
    'option.validityStart': {
      handler: function (curVal, oldVal) {
        this.option.pickerOptions2 = {
          disabledDate: function (time) {
            return time.getTime() < curVal
          }
        }
      }
    },
    'option.validityEnd': {
      handler: function (curVal, oldVal) {
        this.option.pickerOptions1 = {
          disabledDate: function (time) {
            return time.getTime() > curVal
          }
        }
      }
    },
    'fileList': {
      handler: function (curVal, oldVal) {
        let file = curVal
        file = JSON.stringify(file)
        this.fileListV = file
      },
      deep: true
    }
  },
  methods: {
    // 提交
    submit () {
      this.$validator.validate().then(result => {
        if (result) {
          let query = getForm('policy')
          query.service = service
          this.apiPost('/add', query).then((response) => {
            this.messageBox('操作成功', 'success')
            let t = null
            clearTimeout(t)
            t = setTimeout(() => {
              this.back()
            }, 1000)
          })
        }
      })
    },
    // 返回
    back () {
      this.$router.push('/policy/company/list')
    },
    // 上传
    beforeFileUpload (file, fileList) {
      const isExcel = getFileType(file.name, 'other')
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isExcel) {
        this.messageBox('上传文件格式不正确!', 'error')
      }
      if (!isLt2M) {
        this.messageBox('上传文件大小不能超过10MB!', 'error')
      }
      return isExcel && isLt2M
    },
    handleExceed () {
      this.messageBox('超过最大限制，最多上传五个文件!', 'error')
    },
    handleFileSuccess (res, file) {
      this.fileList.push({name: file.name, url: res.data})
      this.$nextTick().then(() => {
        this.getHeight('shrink4', true)
      })
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    handleFileError (err, file, fileList) { // 登录过期
      this.handelResponse(err)
    },
    // 点击展开 收起时 获取div高度
    getHeight (id, first) {
      let divHeight = id + 'Height'
      if (first) {
        this.shrink[divHeight] = computedHight(id, this.shrink[id]) + 'px'
      } else {
        let flag = this.shrink[id] = !this.shrink[id]
        this.shrink[divHeight] = 0
        if (flag) {
          this.shrink[divHeight] = computedHight(id, flag) + 'px'
        }
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss">
  @import  './../../../assets/css/minin';
  .policy-form{
    margin: 0px 0px 45px;
    .none-input{
      border: none;
    }
    .sub-title{
      text-align:left;
      padding-left:10px;
      .policy-shrink{
        position:absolute;
        right:0;
        display:inline-block;
        &.act span{
          color: #cb5457;
        }
        span{
          display: inline-block;
          font-size: 12px;
          color: #54bfcb;
          cursor: pointer;
        }
      }
    }
    .info-logo{
      img{
        height:100%;
        width:100%;
      }
      height: 90px;
      width:90px;
    }
    .info-logo-btn{
      position: absolute;
      bottom: 0;
      left: 33%;
    }
    .policy-date{
     min-width:440px;
      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 200px;
      }
    }
    .policy-radio{
      padding:2px 0;
      line-height:36px;
      vertical-align: bottom;
    }
    .item-row a{
      /*padding:9px 0;
      line-height:40px;*/
    }
    .service-content{
      width:80%;
      margin:15px auto;
      padding:15px;
      .check-box-group{
        width:25%;
        float:left;
        margin:10px 0;
      }
    }
    .policy-shrink-from{
      @include myTransition(height, .3s);
      overflow:hidden;
      .insurant{
        width:100%;
        margin:20px 0
      }
      .shrink{
        overflow:hidden;
      }
    }
    .policy-shrink-from-hide{
      @include myTransition(height, .3s);
      height:0
    }
  }
</style>
