<template>
  <div class="policy-form">
    <div class="slide-tit act mb20 sub-title">
      基本信息
      <div :class="[{'act':!shrink.shrink1},'policy-shrink']" @click="getHeight('shrink1')">
        <span v-if="shrink.shrink1">收起</span>
        <span v-else>展开</span></div>
    </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink1},'policy-shrink-from']" :style="{height:shrink.shrink1Height}">
      <div id="shrink1" class="shrink">
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
        <div :class="[{'act':!shrink.shrink2},'policy-shrink']" @click="getHeight('shrink2')" >
          <span v-if="shrink.shrink2">收起</span>
          <span v-else>展开</span></div>
      </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink2},'policy-shrink-from']"  :style="{height:shrink.shrink2Height}">
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
          <ul class="el-upload-list el-upload-list--text">
            <li tabindex="0" class="el-upload-list__item is-success" v-for="(item, index) in insOther" :key="index">
              <a class="el-upload-list__item-name" :href="item.url">
                <i class="el-icon-document"></i>{{item.name}}
              </a>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </div>
      <div class="slide-tit act mb20 sub-title">
        日常服务报告
        <div :class="[{'act':!shrink.shrink5},'policy-shrink']" @click="getHeight('shrink5')">
          <span v-if="shrink.shrink5">收起</span>
          <span v-else>展开</span></div>
      </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink5},'policy-shrink-from']" :style="{height:shrink.shrink5Height}">
      <div id="shrink5" class="shrink">
        <table class="policy-report-table">
          <thead>
          <tr>
            <th class="w50">序号</th>
            <th>报告类型</th>
            <th>报告时间</th>
            <th>服务商</th>
            <th class="w110">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in reportData.dailyReport" :key="index">
            <td>{{index}}</td>
            <td>{{item.reportTypeName}}</td>
            <td>{{item.reportTime}}</td>
            <td>{{item.serviceProvider}}</td>
            <td><a :href="item.download" class="manage-userList-btn manage-userList-edit">下载</a><a :href="item.preview" class="manage-userList-btn manage-userList-see" target="_blank">预览</a></td>
          </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div class="slide-tit act mb20 sub-title" >
        理赔服务报告
        <div :class="[{'act':!shrink.shrink6},'policy-shrink']" @click="getHeight('shrink6')">
          <span v-if="shrink.shrink6">收起</span>
          <span v-else>展开</span></div>
      </div>
    <div :class="[{'policy-shrink-from-hide': !shrink.shrink6},'policy-shrink-from']" :style="{height:shrink.shrink6Height}">
      <div id="shrink6" class="shrink">
        <table class="policy-report-table">
          <thead>
          <tr>
            <th class="w50">序号</th>
            <th>报告类型</th>
            <th>报告时间</th>
            <th>服务商</th>
            <th class="w110">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in reportData.claimReport" :key="index">
            <td>{{index}}</td>
            <td>{{item.reportTypeName}}</td>
            <td>{{item.reportTime}}</td>
            <td>{{item.serviceProvider}}</td>
            <td><a :href="item.download" class="manage-userList-btn manage-userList-edit">下载</a><a :href="item.preview" class="manage-userList-btn manage-userList-see" target="_blank">预览</a></td>
          </tr>
          </tbody>
        </table>
      </div>
      </div>

    </div>
</template>

<script>
import {computedHight} from 'common/util'
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
      insOther: {}
    }
  },
  mounted () {
    this.getHeight('shrink1', true)
    this.getHeight('shrink2', true)
    this.getHeight('shrink3', true)
  },
  created () {
    this.apiPost('/index.php/api/policy/insurantPolicy').then((response) => {
      this.reportData = response.data
      if (response.data.insOther !== null && response.data.insOther !== '') {
        this.insOther = JSON.parse(response.data.insOther)
      }
      this.$nextTick().then(() => {
        this.getHeight('shrink4', true)
        this.getHeight('shrink5', true)
        this.getHeight('shrink6', true)
      })
    })
  },
  methods: {
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
     /* padding:9px 0;
      line-height:40px;*/
    }
    .policy-report-table{
      width:70%;
      margin:auto;
      text-align:center;
      border:1px solid #e6e6e6;
      thead{
        border-bottom: 1px solid #e6e6e6;
        th{
          padding:10px 2px;
        }
      }
      tbody{
        tr{
          border-bottom: 1px solid #e6e6e6;
          td{
            padding: 8px 0px;
          }
        }
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
