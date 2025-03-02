<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'

// 城市列表
const cities = ['钦州', '南宁', '梧州', '柳州', '桂林']

// 生成模拟数据（最近7天）
const generateData = () => {
  const dates = []
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    dates.push(`${date.getMonth() + 1}/${date.getDate()}`)
  }

  return {
    dates,
    series: cities.map(city => ({
      name: city,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 5000 + 2000)),
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: getCityColor(city, 0.6) },
          { offset: 1, color: getCityColor(city, 0.1) }
        ])
      }
    }))
  }
}

// 获取城市颜色
const getCityColor = (city, opacity = 1) => {
  const colors = {
    南宁: `rgba(0, 247, 255, ${opacity})`,
    柳州: `rgba(0, 180, 255, ${opacity})`,
    桂林: `rgba(0, 212, 142, ${opacity})`,
    梧州: `rgba(255, 150, 0, ${opacity})`,
    钦州: `rgba(255, 80, 120, ${opacity})`
  }
  return colors[city]
}

let chartInstance = null
const chartData = ref(generateData())

const initChart = () => {
  const chartDom = document.getElementById('sales-chart')
  if (!chartDom) return

  chartInstance = echarts.init(chartDom)

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.9)',
      borderColor: 'rgba(0,180,255,0.5)',
      borderWidth: 1,
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0,180,255,0.1)'
        }
      },
      formatter: (params) => {
        const data = Array.isArray(params) ? params[0] : params
        let html = `<div style="margin-bottom:5px;color:#00f7ff;">${data.axisValue}</div>`
        params.forEach(item => {
          html += `
        <div style="display:flex;align-items:center;margin:3px 0;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;
            background:${getCityColor(item.seriesName)};margin-right:6px;"></span>
          ${item.seriesName}：
          <span style="color:${getCityColor(item.seriesName)};margin-left:5px;">
            ¥${item.value.toLocaleString()}
          </span>
        </div>
      `
        })
        return html
      }
    },
    legend: {
      data: cities,
      right: 20,
      top: 10,
      textStyle: {
        color: '#89d8ff'
      },
      itemStyle: {
        borderWidth: 0
      }
    },
    grid: {
      left: 50,
      right: 30,
      bottom: 30,
      top: 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.value.dates,
      axisLine: {
        lineStyle: {
          color: 'rgba(137, 216, 255, 0.3)'
        }
      },
      axisLabel: {
        color: '#89d8ff'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(137, 216, 255, 0.1)'
        }
      },
      axisLabel: {
        color: '#89d8ff',
        formatter: '¥{value}'
      }
    },
    series: chartData.value.series,
    animationDuration: 1500
  }

  chartInstance.setOption(option)
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chartInstance?.resize())
})

onUnmounted(() => {
  window.removeEventListener('resize', () => chartInstance?.resize())
  chartInstance?.dispose()
})
</script>

<template>
  <div class="panel-box">
    <div class="chart-title">
      <svg t="1740921961793" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="23082" width="50" height="50">
        <path
          d="M147.2 640 51.2 640C19.2 640 0 665.6 0 691.2l0 211.2C0 934.4 19.2 960 51.2 960l96 0C172.8 960 192 934.4 192 908.8l0-217.6C192 665.6 172.8 640 147.2 640zM128 876.8C128 889.6 115.2 896 96 896S64 889.6 64 876.8l0-153.6C64 710.4 76.8 704 96 704S128 710.4 128 723.2L128 876.8zM403.2 448 307.2 448C275.2 448 256 473.6 256 499.2l0 403.2C256 934.4 275.2 960 307.2 960l96 0c25.6 0 51.2-25.6 51.2-51.2L454.4 499.2C448 473.6 428.8 448 403.2 448zM384 876.8C384 889.6 371.2 896 352 896S320 889.6 320 876.8L320 531.2C320 518.4 332.8 512 352 512S384 518.4 384 531.2L384 876.8zM908.8 384l-96 0c-32 0-51.2 25.6-51.2 51.2l0 467.2c0 32 19.2 57.6 51.2 57.6l96 0c25.6 0 51.2-25.6 51.2-51.2L960 435.2C953.6 409.6 934.4 384 908.8 384zM889.6 876.8c0 12.8-12.8 19.2-32 19.2-19.2 0-32-6.4-32-19.2L825.6 467.2c0-12.8 12.8-19.2 32-19.2 19.2 0 32 6.4 32 19.2L889.6 876.8zM659.2 576 563.2 576C531.2 576 512 601.6 512 627.2l0 275.2C512 934.4 531.2 960 563.2 960l96 0c25.6 0 44.8-25.6 44.8-51.2L704 627.2C704 601.6 684.8 576 659.2 576zM640 876.8c0 12.8-12.8 19.2-32 19.2S576 889.6 576 876.8l0-217.6C576 646.4 588.8 640 608 640s32 6.4 32 19.2L640 876.8zM64 588.8l288-249.6 204.8 140.8c19.2 25.6 44.8 6.4 44.8 0L896 166.4l0 57.6C896 243.2 908.8 256 928 256S960 243.2 960 224l0-128C960 76.8 947.2 64 928 64l-128 0C780.8 64 768 76.8 768 96S780.8 128 800 128l44.8 0L576 409.6 371.2 268.8c0 0 0 0 0 0C358.4 256 339.2 256 326.4 268.8L19.2 537.6C6.4 550.4 6.4 576 19.2 588.8 32 595.2 51.2 595.2 64 588.8z"
          fill="#1296db" p-id="23083"></path>
      </svg>
      <span>各城市实时销售趋势</span>
    </div>
    <div id="sales-chart" class="chart-container"></div>
  </div>
</template>

<style scoped>
.panel-box {
  height: 520px;
  background: rgba(9, 44, 88, 0.7);
  border: 1px solid rgba(0, 180, 255, 0.2);
  border-radius: 8px;
  padding: 15px;
}

.chart-container {
  width: 100%;
  height: 100%;
}

/* 图表动画 */
#sales-chart canvas {
  animation: chartScale 0.6s ease-out;
}

@keyframes chartScale {
  from {
    opacity: 0;
    transform: scale(0.98);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 图例点样式 */
::v-deep .echarts-legend-item {
  transition: transform 0.3s;
}

::v-deep .echarts-legend-item:hover {
  transform: translateX(3px);
}
.chart-title {
  /* text-align: center; */
  color: #89d8ff;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>