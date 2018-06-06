<template>
    <div class="chart-info">
      <div class="layui-row">
        <div class="layui-col-xs6">
          <div class="grid-demo grid-demo-bg1">
            <div class="grid-pre-header">预保单概览</div>
            <div class="grid-pre-body tc">
              <div id="prepolicyfan" class="grid-pre pei-pre"></div>
            </div>
          </div>
        </div>
        <div class="layui-col-xs6">
          <div class="grid-demo grid-demo-bg1">
            <div class="grid-pre-header">保单概览</div>
            <div class="grid-pre-body tc">
              <div id="policyfan" class="grid-pre pei-pre"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="layui-row">
        <div class="layui-col-xs6">
          <div class="grid-demo grid-demo-bg1">
            <div class="grid-pre-header">预保单增长折线图</div>
            <div class="grid-pre-body tc">
              <div id="prepolicyFoldLine" class="grid-pre"></div>
            </div>
          </div>
        </div>
        <div class="layui-col-xs6">
          <div class="grid-demo grid-demo-bg1">
            <div class="grid-pre-header">保单增长折线图</div>
            <div class="grid-pre-body tc">
              <div id="policyFoldLine" class="grid-pre"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chartData: {}
    }
  },
  created () {
    this.getChart()
  },
  methods: {
    getChart () {
      // 概况总览
      this.apiPost('/index.php/api/overview/insuranceChart').then((response) => {
        let a = response.data
        this.chartData = a
        this.drawLine()
      })
    },
    // 画图表
    drawLine () {
      // 预报单概览
      this.loadChart(this.retoption1(this.chartData.prepolicyfan), 'prepolicyfan')
      this.loadChart(this.retoption2(this.chartData.servicefan), 'policyfan')
      this.loadChart(this.retoption3(this.chartData.prepolicyFoldLine), 'prepolicyFoldLine')
      this.loadChart(this.retoption4(this.chartData.policyFoldLine), 'policyFoldLine')
    },
    loadChart (opt, id) {
      let myChart = echarts.init(document.getElementById(id))
      myChart.setOption(opt)
    },
    retoption1 (chdata) {
      let option3 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}个 ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: '30',
          y: 'center',
          data: [{
            name: '体检中',
            icon: 'bar',
            textStyle: {fontWeight: 'bold', color: '#838484'}
          }, {
            name: '未通过',
            icon: 'bar',
            textStyle: {color: '#838484'}}, {
            name: '已通过',
            icon: 'bar',
            textStyle: {color: '#838484'}
          }, {
            name: '未完成',
            icon: 'bar',
            textStyle: {color: '#838484'}
          }, {
            name: '已完成',
            icon: 'bar',
            textStyle: {color: '#838484'}
          }]

        },
        calculable: false,
        series: [
          {
            name: '数量',
            type: 'pie',
            radius: '75%',
            center: ['53%', '60%'],
            data: [
              {value: chdata.checking, name: '体检中'},
              {value: chdata.notPassed, name: '未通过'},
              {value: chdata.passed, name: '已通过'},
              {value: chdata.unfinished, name: '未完成'},
              {value: chdata.finished, name: '已完成'}
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{c}',
                  position: 'inner'
                },
                labelLine: {show: false}
              }
            }
          }
        ],
        color: ['#f6e35d', '#cd494d', '#3cccb9', '#f4925e', '#009688']
      }
      return option3
    },
    retoption2 (chdata) {
      let option3 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: '30',
          y: 'center',
          data: [{
            name: '服务中',
            icon: 'bar',
            textStyle: {fontWeight: 'bold', color: '#838484'}
          }, {
            name: '已完成',
            icon: 'bar',
            textStyle: {color: '#838484'}}, {
            name: '异常',
            icon: 'bar',
            textStyle: {color: '#838484'}
          }]

        },
        calculable: false,
        series: [
          {
            name: '数量',
            type: 'pie',
            radius: '75%',
            center: ['53%', '60%'],
            data: [
              {value: chdata.inservice, name: '服务中'},
              {value: chdata.finished, name: '已完成'},
              {value: chdata.abnormal, name: '异常'}
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{c}',
                  position: 'inner'
                },
                labelLine: {show: false}
              }
            }
          }
        ],
        color: ['#e69341', '#f3cd4f', '#c55f5d']
      }
      return option3
    },
    retoption3 (chdata) {
      let arr = []
      let arr2 = []
      for (let i = 0; i < chdata.length; i++) {
        if (chdata[i].amount != null) {
          arr.push(chdata[i].amount)
        }
        if (chdata[i].time != null) {
          arr2.push(chdata[i].time)
        }
      }
      let option1 = {
        tooltip: {
          trigger: 'axis'
        },
        calculable: true,
        xAxis: [
          {
            show: true,
            type: 'category',
            boundaryGap: false,
            data: arr2,
            axisLine: {
              lineStyle: {
                color: '#009688'
              }
            },
            axisLabel: {
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            show: true,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#009688'
              }
            },
            min: 0,
            max: 100
          }
        ],
        series: [
          {
            name: '预保单增长',
            type: 'line',
            stack: '数量',
            data: arr
          }
        ]
      }
      return option1
    },
    retoption4 (chdata) {
      let arr = []
      let arr2 = []
      for (let i = 0; i < chdata.length; i++) {
        if (chdata[i].amount != null) {
          arr.push(chdata[i].amount)
        }
        if (chdata[i].time != null) {
          arr2.push(chdata[i].time)
        }
      }
      let option1 = {
        tooltip: {
          trigger: 'axis'
        },
        calculable: true,
        xAxis: [
          {
            show: true,
            type: 'category',
            boundaryGap: false,
            nameRotate: 90,
            data: arr2,
            axisLine: {
              lineStyle: {
                color: '#009688'
              }
            }
          }
        ],
        yAxis: [
          {
            show: true,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#009688'
              }
            }
          }
        ],
        series: [
          {
            name: '保单增长',
            type: 'line',
            stack: '数量',
            data: arr
          }
        ]
      }
      return option1
    }

  }
}
</script>

<style lang="scss" scoped="" type="text/scss">
.chart-info{
.layui-row{
    .grid-demo{
      padding:0 20px;
      margin:10px 0;
      height:304px;
      position:relative;
      .grid-pre-header{
        padding:0px 20px;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        line-height: 42px;
        font-weight: bold;
      }
      .grid-pre-body, .grid-pre{
        position:relative;
        height:100%;
        margin:10px auto
      }
      .pei-pre{
        height:80%;
        width:70%;
        min-width:392px;
      }
      }
  }
}

</style>
