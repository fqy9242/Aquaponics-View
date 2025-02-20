<script setup>
import { getAllYieldInfoApi } from '@/apis/agriculture'
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const yieldInfo = ref([])

onMounted(async () => {
  const res = await getAllYieldInfoApi()
  yieldInfo.value = res.data
  nextTick(() => {
    initChart()
  })
})

const initChart = () => {
  const chartDom = document.getElementById('yieldChart')
  const myChart = echarts.init(chartDom)
  const option = {
    // title: {
    //   text: '产量分析',
    //   left: 'center',
    //   textStyle: {
    //     color: '#fff',
    //     fontSize: 18
    //   }
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['目标产量', '实际产量'],
      bottom: 0,
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: yieldInfo.value.map(item => item.month),
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisLabel: {
        color: '#fff'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisLabel: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '目标产量',
        type: 'line',
        data: yieldInfo.value.map(item => item.targetYield),
        itemStyle: {
          color: '#FF5733'
        },
        lineStyle: {
          width: 3
        }
      },
      {
        name: '实际产量',
        type: 'line',
        data: yieldInfo.value.map(item => item.yield),
        itemStyle: {
          color: '#33FF57'
        },
        lineStyle: {
          width: 3
        }
      }
    ]
  }
  myChart.setOption(option)
}
</script>

<template>
  <section class="panel-box production-analysis-panel">
    <div class="panel-header">
      <svg t="1740041936520" class="icon" viewBox="0 0 1268 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="16474" width="30" height="30">
        <path
          d="M1109.598 194.972c0-211.352-105.676-105.676-105.676-105.676a115.715 115.715 0 0 1-158.514-52.838C792.57-69.218 686.894 89.296 634.056 89.296s0-52.838-105.676-52.838-52.838 158.514-105.676 105.676-52.838 0-105.676 0-105.676 0-105.676 52.838A163.798 163.798 0 0 0 0 300.648h1268.111c-52.838-369.866-158.513 105.676-158.513-105.676zM105.676 934.704h81.899a191.802 191.802 0 0 1-2.642-26.42 194.972 194.972 0 0 1 389.944 0 191.802 191.802 0 0 1-2.642 26.42h124.17a191.802 191.802 0 0 1-2.642-26.42 194.972 194.972 0 0 1 389.944 0 191.802 191.802 0 0 1-2.642 26.42h81.37l105.676-581.218H0z m417.948-505.131l264.19 105.676 105.676-70.803-40.157-49.14 228.789-38.571-80.842 217.164-39.629-48.083-161.156 105.676-264.19-105.676-245.168 146.362-52.838-90.353z"
          p-id="16475" fill="#1afa29"></path>
        <path
          d="M379.905 792.57A114.658 114.658 0 1 0 495.62 908.285 115.715 115.715 0 0 0 379.905 792.57z m508.301 0a114.658 114.658 0 1 0 115.716 115.715A115.715 115.715 0 0 0 888.206 792.57z"
          p-id="16476" fill="#1afa29"></path>
      </svg>
      <h2 class="panel-title">产量分析</h2>
    </div>
    <div id="yieldChart" style="width: 100%; height: 300px;"></div>
  </section>
</template>

<style scoped>
.panel-box {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.panel-header {
  display: flex;
  align-items: center;
}

.panel-title {
  font-size: 24px;
  margin-left: 10px;
  color: #fff;
}
</style>