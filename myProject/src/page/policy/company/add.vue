<template>
  <div class="policy-form">
    <h1 class="manage-body-tit">
      保单管理
      <span>添加保单</span>
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
          <div class="item-label inline"><label><em>*</em>保单号：</label></div>
          <div :class="[{'error': errors.has('policyNum')},'inline item-input-block']">
            <input type="text" class="item-input"   name="policyNum" data-vv-as="保单号"  v-validate="'required|max:20'" placeholder="长度不能超过20">
            <span class="auThen-error">{{ errors.first('policyNum') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>保单验证码：</label></div>
          <div :class="[{'error': errors.has('polIdentifyCode')},'inline item-input-block']">
            <input type="text" class="item-input "  name="polIdentifyCode" data-vv-as="保单验证码"  v-validate="'required'">
            <span class="auThen-error">{{ errors.first('polIdentifyCode') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>保险公司：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="userInfo.company" name="company"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>保险计划：</label></div>
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
          <div class="item-label inline"><label><em>*</em>保单状态：</label></div>
          <div class="inline item-input-block policy-radio">
            <el-radio  v-model="option.status" label="0">服务中</el-radio>
            <el-radio  v-model="option.status" label="1">事故中</el-radio>
            <el-radio  v-model="option.status" label="2">已完成</el-radio>
            <input class="none" :value="option.status" name="status">
          </div>
        </div>
      </div>
    </div>
    <div class="slide-tit act mb20 sub-title">
      投保人企业信息
      <div :class="[{'act':!shrink.shrink2},'policy-shrink']" @click="getHeight('shrink2')">
        <span v-if="shrink.shrink2">收起</span>
        <span v-else>展开</span></div>
    </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink2},'policy-shrink-from']" :style="{height:shrink.shrink2Height}">
      <div  id="shrink2"  class="shrink">
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>企业名称：</label></div>
          <div :class="[{'error': errors.has('holderComName')},'inline item-input-block']">
            <input type="text" class="item-input " v-model="company.holderComName"  name="holderComName" data-vv-as="企业名称"  v-validate="'required'">
            <span class="auThen-error">{{ errors.first('holderComName') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业组织代码：</label></div>
          <div class="inline item-input-block">
            <input type="text" class="item-input" v-model="company.holderOrgCode"  name="holderOrgCode" >
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>营业执照代码：</label></div>
          <div class='inline item-input-block'>
            <input type="text" class="item-input" v-model="company.holderLicense" name="holderLicense" >
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业地址：</label></div>
          <div class="inline item-input-block">
            <input type="text" class="item-input" v-model="company.holderAddress"  name="holderAddress" >
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>企业联系人：</label></div>
          <div :class="[{'error': errors.has('holderContact')},'inline item-input-block']">
            <input type="text" class="item-input" v-model="company.holderContact" name="holderContact" data-vv-as="企业联系人"  v-validate="'required'">
            <span class="auThen-error">{{ errors.first('holderContact') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>手机号：</label></div>
          <div :class="[{'error': errors.has('holderMobile')},'inline item-input-block']">
            <input type="text" class="item-input " v-model="company.holderMobile"  name="holderMobile" data-vv-as="手机号"  v-validate="'required|phone'">
            <span class="auThen-error">{{ errors.first('holderMobile') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业电话：</label></div>
          <div class="inline item-input-block">
            <input type="text" class="item-input " v-model="company.holderPhone" name="holderPhone" >
          </div>
        </div>
      </div>
    </div>
    <div class="slide-tit act mb20 sub-title">
      被保险人企业信息
      <div :class="[{'act':!shrink.shrink3},'policy-shrink']" @click="getHeight('shrink3')">
        <span v-if="shrink.shrink3">收起</span>
        <span v-else>展开</span></div>
    </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink3},'policy-shrink-from']" :style="{height:shrink.shrink3Height}">
      <div id="shrink3" class="shrink">
        <div class="inline manage-top-btn tc insurant">
          <div class="inline add btn" @click="insurantCompany">同步投保人企业信息</div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>企业名称：</label></div>
          <div :class="[{'error': errors.has('insurantComName')},'inline item-input-block']">
            <input type="text" class="item-input " v-model="insurant.holderComName"  name="insurantComName" data-vv-as="企业名称"  v-validate="'required'">
            <span class="auThen-error">{{ errors.first('insurantComName') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业组织代码：</label></div>
          <div class="inline item-input-block">
            <input type="text" class="item-input" v-model="insurant.holderOrgCode"  name="insurantOrgCode" >
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>营业执照代码：</label></div>
          <div class='inline item-input-block'>
            <input type="text" class="item-input " v-model="insurant.holderLicense" name="insurantLicense" >
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业地址：</label></div>
          <div class="inline item-input-block">
            <input type="text" class="item-input " v-model="insurant.holderAddress"  name="insurantAddress" >
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>企业联系人：</label></div>
          <div :class="[{'error': errors.has('insurantContact')},'inline item-input-block']">
            <input type="text" class="item-input" v-model="insurant.holderContact" name="insurantContact" data-vv-as="企业联系人"  v-validate="'required'">
            <span class="auThen-error">{{ errors.first('insurantContact') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>手机号：</label></div>
          <div :class="[{'error': errors.has('insurantMobile')},'inline item-input-block']">
            <input type="text" class="item-input " v-model="insurant.holderMobile"  name="insurantMobile" data-vv-as="手机号"  v-validate="'required|phone'">
            <span class="auThen-error">{{ errors.first('insurantMobile') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业电话：</label></div>
          <div class="inline item-input-block">
            <input type="text" class="item-input "  name="insurantPhone"  v-model="insurant.holderPhone">
          </div>
        </div>
      </div>
    </div>
    <div class="slide-tit act mb20 sub-title">
      被保险网站信息
      <div :class="[{'act':!shrink.shrink4},'policy-shrink']" @click="getHeight('shrink4')">
        <span v-if="shrink.shrink4">收起</span>
        <span v-else>展开</span></div>
    </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink4},'policy-shrink-from']" :style="{height:shrink.shrink4Height}">
      <div id="shrink4" class="shrink">
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>系统名称：</label></div>
          <div :class="[{'error': errors.has('insurantSysName')},'inline item-input-block']">
            <input type="text" class="item-input "  name="insurantSysName" data-vv-as="系统名称"  v-validate="'required'">
            <span class="auThen-error">{{ errors.first('insurantSysName') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label><em>*</em>系统域名：</label></div>
          <div :class="[{'error': errors.has('insurantWebsite')},'inline item-input-block']">
            <input type="text" class="item-input "  name="insurantWebsite" data-vv-as="系统域名"  v-validate="'required'">
            <span class="auThen-error">{{ errors.first('insurantWebsite') }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>IP地址及端口号：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input "  name="insurantIP"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>所属行业：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input "  name="insIndustry"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>网站其他信息：</label></div>
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
      日常服务
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
    <div class="slide-tit act mb20 sub-title">
      理赔服务
      <div :class="[{'act':!shrink.shrink6},'policy-shrink']" @click="getHeight('shrink6')">
        <span v-if="shrink.shrink6">收起</span>
        <span v-else>展开</span></div>
    </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink6},'policy-shrink-from']" :style="{height:shrink.shrink6Height}">
      <div id="shrink6" class="shrink">
        <div class="service-content">
        <el-checkbox-group v-model="serviceList.serviceId" class="clearfix">
          <div class="check-box-group" v-for="(item, index) in serviceList.allList.claimList" :key="index" ><el-checkbox  :label="String(item.id)" :disabled="option.plan!=0">{{item.name}}服务</el-checkbox></div>
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
        shrink1Height: '',
        shrink2: true,
        shrink2Height: '',
        shrink3: true,
        shrink3Height: '',
        shrink4: true,
        shrink4Height: '',
        shrink5: true,
        shrink5Height: '',
        shrink6: true,
        shrink6Height: ''
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
      // 投保人企业信息
      company: {
      },
      // 被保险人企业信息
      insurant: {
      },
      // 上传列表
      fileList: [],
      // input 值 上传列表
      fileListV: '',
      // 服务列表
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
    // 保险公司名称
    this.userInfo = Object.assign({}, this.userInfo, this.$store.state.userInfo)
    // 保险计划下拉列表
    this.plan()
    // 所有服务列表
    this.allService()
  },
  mounted () {
    this.getHeight('shrink2', true)
    this.getHeight('shrink3', true)
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
    // 同步投保人信息
    insurantCompany () {
      this.insurant = Object.assign({}, this.company)
      // 同步投保人 错误提示去掉
      let t = null
      clearTimeout(t)
      t = setTimeout(() => {
        this.$validator.validate()
      }, 100)
    },
    // 保险计划下拉列表
    plan () {
      this.apiPost('/index.php/api/policy/insurancePolicyPlanList').then((response) => {
        this.option.plan = response.data[0].id
        this.option.reportData = this.option.reportData.concat(response.data)
      })
    },
    // 所有服务列表
    allService () {
      this.apiPost('/index.php/api/policy/serviceList').then((response) => {
        this.serviceList.allList = response.data
        this.$nextTick().then(() => {
          this.getHeight('shrink5', true)
          this.getHeight('shrink6', true)
        })
      })
    },
    // 保险公司计划对应的服务
    service () {
      if (this.option.plan === '0') {
        this.serviceList.serviceId = []
      } else {
        this.apiPost('/index.php/api/policy/planService', {planId: this.option.plan}).then((response) => {
          this.serviceList.serviceId = response.data.serviceId.split(',')
        })
      }
    },
    // 提交
    submit () {
      this.$validator.validate().then(result => {
        if (result) {
          let query = getForm('policy')
          let service = this.serviceList.serviceId.join(',')
          query.service = service
          this.apiPost('/index.php/api/policy/insurancePolicyAdd', query).then((response) => {
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
