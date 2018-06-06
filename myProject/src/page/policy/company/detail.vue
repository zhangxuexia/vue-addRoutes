<template>
  <div class="policy-form">
    <h1 class="manage-body-tit">
      保单管理
      <span>保单详情</span>
    </h1>
   <!-- <div class="slide-tit act mb20 sub-title">
      基本信息
      <div :class="[{'act':!shrink1},'policy-shrink']" @click="shrink1= !shrink1">
        <span v-if="shrink1">收起</span>
        <span v-else>展开</span></div>
    </div>-->
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink1},'policy-shrink-from']" >
      <div v-show="shrink.shrink1">
        <div class="item-row">
          <div class="item-label inline"><label>保单号：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.policyNum" name="company"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>保单验证码：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.polIdentifyCode" name="company"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>保险公司：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.policyCompany" name="company"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>保险计划：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.policyPlan" name="company"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>有效期：</label></div>
          <div class="inline item-input-block policy-date">
            <div class="policy-date-row fl"> <input type="text" class="item-input none-input" readonly :value="reportData.validityStart" name="company"></div>
            <span class="posicy-date-span fl">至</span>
            <div class="policy-date-row fl"><input type="text" class="item-input none-input layui-col-md6" readonly :value="reportData.validityEnd" name="company"></div>
          </div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>保单状态：</label></div>
          <div class="inline item-input-block policy-radio">
            <el-radio disabled v-model="reportData.status" label="0">服务中</el-radio>
            <el-radio disabled v-model="reportData.status" label="1">事故中</el-radio>
            <el-radio disabled v-model="reportData.status" label="2">已完成</el-radio>
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
      <div id="shrink2" class="shrink">
        <div class="item-row">
          <div class="item-label inline"><label>企业名称：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.holderComName" name="company"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业组织代码：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.holderOrgCode" name="website"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>营业执照代码：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.holderLicense" name="address"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业地址：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.holderAddress" name="address"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业联系人：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.holderContact" name="phone"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>手机号：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.holderMobile" name="businessLicense"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业电话：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.holderPhone" name="orgCode"></div>
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
        <div class="item-row">
          <div class="item-label inline"><label>企业名称：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insurantComName" name="company"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业组织代码：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insurantOrgCode" name="website"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>营业执照代码：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insurantLicense" name="address"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业地址：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insurantAddress" name="address"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业联系人：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insurantContact" name="phone"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>手机号：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insurantMobile" name="businessLicense"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>企业电话：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insurantPhone" name="orgCode"></div>
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
          <div class="item-label inline"><label>系统名称：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insurantSysName" name="address"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>系统域名：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insurantWebsite" name="address"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>IP地址及端口号：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insurantIP" name="address"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>所属行业：</label></div>
          <div class="inline item-input-block"><input type="text" class="item-input none-input" readonly :value="reportData.insIndustry" name="address"></div>
        </div>
        <div class="item-row">
          <div class="item-label inline"><label>网站其他信息：</label></div>
          <div class="inline item-input-block">
            <div class="inline item-input-block">
              <el-upload
                class="upload-demo"
                :action="uploadOther"
                :on-success="handleFileSuccess"
                :show-file-list="true"
                :file-list="fileList"
                :on-exceed="handleExceed"
                :limit="5"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforeFileUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">最多只能上传5个文件</div>
              </el-upload>
            </div>
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
        <div class="service-content">
          <el-checkbox-group v-model="serviceList.serviceId">
            <div v-for="(item, index) in serviceList.allList.dailyList" :key="index" class="check-box-group"><el-checkbox  :label="String(item.id)" disabled>{{item.name}}服务</el-checkbox></div>
          </el-checkbox-group>
        </div>      </div>
    </div>
    <div class="slide-tit act mb20 sub-title">
      理赔服务
      <div :class="[{'act':!shrink.shrink6},'policy-shrink']" @click="getHeight('shrink6')">
        <span v-if="shrink.shrink6">收起</span>
        <span v-else>展开</span></div>
    </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink6},'policy-shrink-from mb20']" :style="{height:shrink.shrink6Height}">
      <div id="shrink6" class="shrink">
        <div class="service-content">
          <el-checkbox-group v-model="serviceList.serviceId">
            <div v-for="(item, index) in serviceList.allList.claimList" :key="index" class="check-box-group"><el-checkbox  :label="String(item.id)" disabled>{{item.name}}服务</el-checkbox></div>
          </el-checkbox-group>
        </div>
      </div>
    </div>
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
import {computedHight, getFileType} from 'common/util'
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
      reportData: {},
      // 服务列表
      serviceList: {
        allList: {},
        serviceId: {}
      },
      // 保单号
      policyNum: '',
      // 上传列表
      fileList: [],
      // 上传接口
      uploadOther: config.uploadOther
    }
  },
  mounted () {
    this.getHeight('shrink2', true)
    this.getHeight('shrink3', true)
    this.getHeight('shrink5', true)
    this.getHeight('shrink6', true)
  },
  created () {
    this.policyNum = this.$route.params.policyNum
    this.apiPost('/index.php/api/policy/insurancePolicyDetail', {policyNum: this.policyNum}).then((response) => {
      this.reportData = response.data
      if (response.data.insOther !== null && response.data.insOther !== '') {
        let a = JSON.parse(response.data.insOther)
        this.fileList = this.fileList.concat(a)
      }
      if (response.data.service !== null && response.data.service !== '') {
        this.serviceList.serviceId = response.data.service.split(',')
      }
      this.$nextTick().then(() => {
        this.getHeight('shrink4', true)
      })
    })
    this.allService()
  },
  methods: {
    allService () {
      this.apiPost('/index.php/api/policy/serviceList').then((response) => {
        this.serviceList.allList = response.data
        this.$nextTick().then(() => {
          this.getHeight('shrink5', true)
          this.getHeight('shrink6', true)
        })
      })
    },
    // 返回
    back () {
      this.$router.push('/policy/company/list')
    },
    submit () {
      let file = this.fileList
      file = JSON.stringify(file)
      let query = {policyNum: this.policyNum, insOther: file}
      this.apiPost('/index.php/api/policy/updateInsOther', query).then((response) => {
        this.messageBox('操作成功', 'success')
      })
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
    handlePreview (file) {
      window.open(file.response.data, '_self')
    },
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
      .el-date-editor .el-range-separator{
        padding:0
      }
      .posicy-date-span{
        line-height:40px;
        margin:0 5px;
      }
      .policy-date-row{
        width:110px
      }
    }
    .policy-radio{
      padding:2px 0;
      line-height:36px;
      vertical-align: bottom;
    }
    .item-row a{
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
