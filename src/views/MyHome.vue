<template>
  <el-row>
  <el-col :span="8" style="padding-right: 10px"><div class="grid-content bg-purple" ></div>
    <el-card class="box-card">
      <div class="user">
        <img src="../assets/user.jpeg" alt="">
        <div class="userinfo">
          <p class="username">Admin</p>
          <p class="access">超级管理员</p>
        </div>
      </div>
      <div class="login-info">
        <p>上次登录时间： <span>2021-7-19</span></p>
        <p>上次登录地点： <span>武汉</span></p>
      </div>
    </el-card>
    <el-card class="box-card-2" style="height: 550px; margin-top: 20px;" >
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
      </el-table>
    </el-card>
  </el-col>
  <el-col :span="16" style="padding-left: 10px"><div class="num">
    <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex',padding: 0}" class="cardItem">
      <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color}"></i>
      <div class="detail">
        <p class="price">￥{{item.value}}</p>
        <p class="desc">{{item.name}}</p>
      </div>
    </el-card>
  </div>
  <el-card style="height: 320px">
    <div ref="echart1" style="height: 320px"></div>
  </el-card>
  <div class="graph">
    <el-card style="height: 310px;width: 48%">
      <div ref="echart2" style="height: 310px"></div>
    </el-card>
    <el-card style="height: 310px;width: 48%">
      <div ref="echart3" style="height: 310px"></div>>
    </el-card>
  </div>
</el-col>
</el-row>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'

export default {
  data() {
        return {
          tableLabel: {
            name: '课程',
            todayBuy: '今日购买',
            monthBuy: '本月购买',
            totalBuy: '总购买'
          },
          tableData: [],
          countData: [
            {
              name: "今日支付订单",
              value: 210,
              icon: "star-on",
              color: "#ffb980"
            },
            {
              name: "今日收藏订单",
              value: 210,
              icon: "star-on",
              color: "#ffb980"
            },
            {
              name: "今日未支付订单",
              value: 210,
              icon: "star-on",
              color: "#ffb980"
            },
            {
              name: "本月支付订单",
              value: 210,
              icon: "star-on",
              color: "#ffb980"
            },
            {
              name: "本月收藏订单",
              value: 210,
              icon: "star-on",
              color: "#ffb980"
            },
            {
              name: "本月未支付订单",
              value: 210,
              icon: "star-on",
              color: "#ffb980"
            }
          ]
        }
    },
  methods: {

  },
  computed: {

  },
  mounted() {
    getData().then(({data})=>{
      const { tableData} = data.data
      this.tableData = tableData

      const {orderData,userData,videoData} = data.data

      const echart1 =  echarts.init(this.$refs.echart1)

      var chart1Option = {}
      echart1.setOption({})
      const items = Object.keys(orderData.data[0])
      const yAxis = {}
      const xAxis = {data: items}
      const legend = {data: items}
      chart1Option.series = []
      const series= [
      items.forEach(
          key => {
            chart1Option.series.push({
              name: key,
              data: orderData.data.map(item => item[key]),
              type: 'line'
            })
          }
        )
      ]
      chart1Option.yAxis=yAxis
      chart1Option.xAxis=xAxis
      chart1Option.legend=legend
      echart1.setOption(chart1Option)

      const echarts2 = echarts.init(this.$refs.echart2)
      echarts2.setOption({
        legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: '新增',
              data: userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃',
              data: userData.map(item => item.active),
              type: 'bar'
            }
          ],
      })
      const echarts3 = echarts.init(this.$refs.echart3)
      const echcart3Option = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: videoData,
              type: 'pie'
            }
          ],
        }
      echarts3.setOption(echcart3Option)
    })
      
  },
  created() {

  },


}

</script>

<style lang="less" scoped>
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      height: 150px;
      width: 150px;
      margin-right: 80px;
      border-radius: 50%;
    }
    .username {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }

  .login-info {
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999999;
      span {
        margin-left: 130px;
        color: #666666;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .cardItem {
      width: 32%;
      margin-bottom: 20px;
    }

    .icon {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;
    }
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;;
    }
  }
  .graph {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
</style>