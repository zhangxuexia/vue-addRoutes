<template>
  <div>
    <h1 class="manage-body-tit">
      管理1
      <span>管理1</span>
    </h1>
    <div class="inline manage-top-body mb20">
      <div class="query-div clearfix">
        <div class="fl">
          <input class="item-input" v-model="item.input" :readonly="item.value==='-1'">
        </div>
        <div class="manage-top-btn fl"><div class="inline add btn" @click="query">查询</div></div>
      </div>
    </div>
    <table class="manage-userList">
      <thead>
      <tr>
        <th class="w100">
          日期
        </th>
        <th>
          姓名
        </th>
        <th>
          地址
        </th>
        <th>
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
          <a class="manage-userList-btn manage-userList-edit" @click="upload(item.policyNum)">下载</a>
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
  </div>
</template>

<script>
  import page from '@/components/common/page.vue'
  import { dealList } from '@/common/util'
  import options from '@/common/config'
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
          statusOptions: options.statusOptions // 状态下拉
        }
      }
    },
    components: {
      page
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
        this.apiPost('/list', queryData).then((response) => {
          this.list = dealList(response.data.dataList)
          this.page.count = Number.parseInt(response.data.totalNumber)
        })
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
