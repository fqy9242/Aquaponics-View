<script setup>
import { getAllYieldInfoApi } from '@/apis/agriculture'
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const yieldInfo = ref([])

onMounted(async () => {
  try {
    const res = await getAllYieldInfoApi()
    yieldInfo.value = res.data
    nextTick(() => initChart())
  } catch (error) {
    console.error('获取产量数据失败:', error)
  }
})

const initChart = () => {
  const chartDom = document.getElementById('yieldChart')
  const myChart = echarts.init(chartDom)

  // 专业渐变配色
  const colorSet = {
    target: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#FF7E5F' },
      { offset: 1, color: '#FF4D4D' }
    ]),
    actual: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#00F2C3' },
      { offset: 1, color: '#00B4A3' }
    ])
  }

  // 处理数据
  const xAxisData = yieldInfo.value.map(item => item.month || '未知月份')
  const targetData = yieldInfo.value.map(item => item.targetYield)
  const actualData = yieldInfo.value.map(item => item.yield)

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: 'rgba(255,255,255,0.2)',
      textStyle: {
        color: '#fff',
        fontSize: 14
      },
      formatter: (params) => {
        const month = params[0].axisValue
        let tooltip = `<div style="margin-bottom:5px;color:#1afa29;font-weight:bold">${month}月</div>`

        params.forEach(item => {
          tooltip += `
            <div style="display:flex;align-items:center;margin:8px 0">
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color};margin-right:8px"></span>
              ${item.seriesName}: 
              <strong style="margin-left:8px;color:${item.color}">${item.value ?? '无数据'}</strong>
            </div>
          `
        })
        return tooltip
      }
    },
    legend: {
      bottom: 10,
      icon: 'roundRect',
      itemWidth: 14,
      itemHeight: 4,
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.3)'
        }
      },
      axisLabel: {
        color: '#fff',
        fontSize: 12
      },
      data: xAxisData
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      axisLabel: {
        color: '#fff',
        fontSize: 12
      }
    },
    series: [
      {
        name: '目标产量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: colorSet.target
        },
        lineStyle: {
          width: 3,
          shadowBlur: 12,
          shadowColor: '#FF7E5F'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255,126,95,0.3)' },
            { offset: 1, color: 'rgba(255,77,77,0)' }
          ])
        },
        data: targetData,
        animationDelay: 200
      },
      {
        name: '实际产量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: colorSet.actual
        },
        lineStyle: {
          width: 3,
          shadowBlur: 12,
          shadowColor: '#00F2C3'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0,242,195,0.3)' },
            { offset: 1, color: 'rgba(0,180,163,0)' }
          ])
        },
        data: actualData,
        animationDelay: 400
      }
    ],
    animationEasing: 'cubicOut',
    animationDuration: 1000
  }

  myChart.setOption(option)
  window.addEventListener('resize', () => myChart.resize())
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
    <div class="chart-container">
      <div id="yieldChart" style="width: 100%; height: 300px;"></div>
      <div class="chart-glow"></div>
    </div>
  </section>
</template>

<style scoped>
.production-analysis-panel {
  border: 1px solid rgba(26, 250, 41, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.production-analysis-panel:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(26, 250, 41, 0.15);
}

.chart-container {
  position: relative;
  padding: 15px;
}

.chart-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  background: radial-gradient(rgba(26, 250, 41, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.panel-header {
  display: flex;
  align-items: center;
  /* padding: 16px 20px 10px; */
}

.panel-title {
  font-size: 1.5rem;
  background: linear-gradient(90deg, #1afa29 0%, #00ffa3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  margin-left: 12px;
}

.icon {
  filter: drop-shadow(0 0 5px rgba(26, 250, 41, 0.3));
  transition: filter 0.3s ease;
}

.icon:hover {
  filter: drop-shadow(0 0 8px rgba(26, 250, 41, 0.5));
}
</style>