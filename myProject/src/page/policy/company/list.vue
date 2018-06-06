<template>
  <div>
    <h1 class="manage-body-tit">
      保单管理
      <span>保单管理</span>
    </h1>
    <div class="inline manage-top-body mb20">
      <div class="query-div clearfix">
        <div class="fl">
          <el-select v-model="item.value" placeholder="请选择">
            <el-option
              v-for="item in item.itemOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="fl query-input">
          <el-select v-if="item.value==='4'" v-model="item.status" placeholder="请选择">
            <el-option
              v-for="item in item.statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-else-if="item.value==='3'" v-model="item.plan" placeholder="请选择">
            <el-option
              v-for="item in item.planOptions"
              :key="item.id"
              :label="item.policyPlan"
              :value="item.id">
            </el-option>
          </el-select>
          <input v-else class="item-input" v-model="item.input" :readonly="item.value==='-1'">
        </div>
        <div class="manage-top-btn fl"><div class="inline add btn" @click="query">查询</div></div>
      </div>
      <div class="manage-top-btn mb20">
        <div class="inline primary btn" @click="add">添加</div>
        <div class="inline add btn" @click="batch">批量添加</div>
      </div>
    </div>
    <table class="manage-userList">
      <thead>
      <tr>
        <th class="w100">
          单号
        </th>
        <th>
          企业
        </th>
        <th>
          网址
        </th>
        <th class="w110">
          保险计划
        </th>
        <th class="w90">
          状态
        </th>
        <th class="w120">
          时间
        </th>
        <th class="w110">
          报告
        </th>
        <th class="w110">
          操作
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in list" :key="index">
        <td>
          {{item.policyNum}}
        </td>
        <td>
          {{item.insurantComName}}
        </td>
        <td>
          {{item.insurantWebsite}}
        </td>
        <td>
          {{item.policyPlan}}
        </td>
        <td>
          <span v-html="item.statusStr"></span>
        </td>
        <td>
          {{item.validityStart}}
        </td>
        <td>
          <a class="manage-userList-btn manage-userList-edit" @click="upload(item.policyNum)">下载</a>
        </td>
        <td>
          <a class="manage-userList-btn manage-userList-see" @click="detail(item.policyNum)" >查看</a>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="fr clearfix">
      <page :page-index="page.currentPage"
            :total="page.count"
            :page-size="page.pageSize"
            @change="pageChange"></page>
    </div>
    <batchAdd v-if="dialog.showDialog" :showDialog="dialog.showDialog" @change="dialogChange">
    </batchAdd>
    <reportUpload v-if="dialog.reportDialog" :reportDialog="dialog.reportDialog" :reportList="reportList" @change="reportDialogChange"></reportUpload>
  </div>
</template>

<script>
import page from '@/components/common/page.vue'
import { dealList } from '@/common/util'
import options from '@/common/config'
import batchAdd from './batchAdd.vue'
import reportUpload from './reportUpload.vue'
export default {
  data () {
    return {
      page: { // 分页数据对象集合
        pageSize: 10, // 每页显示条数据
        currentPage: 1, // 当前页码
        count: 0// 总记录数
      },
      list: [], // 列表list
      item: { // 查询 数据对象集合
        value: '-1',
        plan: '',
        status: '0',
        input: '',
        planFirst: '',
        itemOptions: options.itemOptions, // 查询框下拉
        statusOptions: options.statusOptions, // 状态下拉
        planOptions: [] // 保险计划下拉
      },
      dialog: { // 弹出框 数据对象集合
        showDialog: false, // 批量添加
        reportDialog: false // 报告下载
      },
      reportList: [] // 下载 报告列表
    }
  },
  components: {
    page,
    batchAdd,
    reportUpload
  },
  watch: {
    'item.value': {
      handler: function (curVal, oldVal) {
        this.item.input = ''
        this.item.status = '0'
        this.item.plan = this.planFirst
      },
      deep: true
    }
  },
  created () {
    this.getList()
    this.getPlanList()
  },
  methods: {
    pageChange (page) {
      this.page.currentPage = page
      this.getList()
    },
    // 点击查询
    query () {
      this.page.currentPage = 1
      this.getList()
    },
    getList () {
      let parm = ''
      if (this.item.value === '3') {
        parm = this.item.plan
      } else if (this.item.value === '4') {
        parm = this.item.status
      } else {
        parm = this.item.input
      }
      let queryData = {type: this.item.value, value: parm}
      let pageData = {
        pageSize: this.page.pageSize, // 每页记录数
        pageNo: this.page.currentPage// 第几页
      }
      queryData = Object.assign({}, queryData, pageData)
      this.apiPost('/index.php/api/policy/insurancePolicyList', queryData).then((response) => {
        this.list = dealList(response.data.dataList)
        this.page.count = Number.parseInt(response.data.totalNumber)
      })
    },
    // 获取计划下拉列表
    getPlanList () {
      this.apiPost('/index.php/api/policy/insurancePolicyPlanList').then((response) => {
        this.item.planOptions = response.data
        this.item.plan = response.data[0].id // 默认选择第一个
        this.planFirst = response.data[0].id
      })
    },
    // 批量添加
    batch () {
      this.dialog.showDialog = true
    },
    dialogChange (dialog, flag) {
      this.dialog.showDialog = dialog
      if (flag) {
        this.query()
      }
    },
    // 报告下载
    upload (id) {
      // 根据保单号 获取报告列表
      this.apiPost('/index.php/api/policy/reportDownload', {policyNum: id}).then((response) => {
        this.reportList = response.data
        this.dialog.reportDialog = true
      })
    },
    reportDialogChange (dialog) {
      this.dialog.reportDialog = dialog
    },
    add () {
      this.$router.push('/policy/company/add')
    },
    // 跳转详情
    detail (policyNum) {
      this.$router.push(`/policy/company/detail/${policyNum}`)
    }
  }
}
</script>

<style lang="scss" type="text/scss">
  .query-div{
    margin:20px 0;
    padding-left:20px;
    width:100%;
    .query-input{
      margin-left:15px;
    }
    .item-input{
      display:inline-block;
      width: 200px;
      padding-left: 10px;
      height: 38px;
      line-height: 1.3;
      line-height: 38px\9;
      border: 1px solid #e6e6e6;
      background: #fff;
    }
  }
  .manage-top-btn{
    .add-btn{
      color: #fff!important;
    }
  }
</style>
