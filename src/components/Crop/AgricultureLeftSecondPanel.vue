<script setup>
import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

let rankingChart = null
let forecastChart = null

const initRankingChart = () => {
  const rankingDom = document.getElementById('production-ranking')
  if (!rankingDom) return
  rankingChart = echarts.init(rankingDom)

  const option = {
    title: {
      text: '蔬菜产量排行',
      textStyle: {
        color: '#00f7ff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Microsoft YaHei'
      },
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(9,44,88,0.9)',
      borderColor: '#00f7ff',
      borderWidth: 1,
      formatter: params => `
        <div style="color:#00f7ff;margin-bottom:5px;">${params[0].name}</div>
        <div style="display:flex;align-items:center;">
          <span style="display:inline-block;width:8px;height:8px;background:#1afa29;margin-right:6px;"></span>
          产量：<span style="color:#1afa29;">${params[0].value}吨</span>
        </div>
      `
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['大白菜', '黄瓜', '包菜', '西红柿', '菠菜'],
      axisLine: {
        lineStyle: {
          color: '#89d8ff',
          width: 2
        }
      },
      axisLabel: {
        color: '#89d8ff',
        rotate: 45,
        fontSize: 12
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#89d8ff',
          width: 2
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(137,216,255,0.1)',
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'bar',
      data: [600, 500, 450, 400, 350],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#1afa29' },
          { offset: 1, color: '#00b4ff' }
        ]),
        borderRadius: [6, 6, 0, 0]
      },
      barWidth: '40%',
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(26,250,41,0.5)'
        }
      }
    }],
    animationEasing: 'elasticOut',
    animationDuration: 1200
  }
  rankingChart.setOption(option)
}

// 修改动态生成月份，从本月开始，往后6个月，共7个月
const forecastMonths = Array.from({ length: 7 }, (_, i) => {
  const d = new Date()
  d.setMonth(d.getMonth() + i)
  return `${d.getMonth() + 1}月`
})

const initForecastChart = () => {
  const forecastDom = document.getElementById('production-forecast')
  if (!forecastDom) return
  forecastChart = echarts.init(forecastDom)

  const option = {
    title: {
      text: '蔬菜产量预测',
      textStyle: {
        color: '#00f7ff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Microsoft YaHei'
      },
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(9,44,88,0.9)',
      borderColor: '#fb7293',
      borderWidth: 1,
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(251,114,147,0.1)'
        }
      }
    },
    legend: {
      top: '10%',
      data: ['大白菜', '黄瓜', '包菜', '菠菜'],
      textStyle: { color: '#89d8ff' }
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: forecastMonths,
      axisLine: {
        lineStyle: {
          color: '#89d8ff',
          width: 2
        }
      },
      axisLabel: {
        color: '#89d8ff',
        fontSize: 12
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#89d8ff',
          width: 2
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(137,216,255,0.1)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '大白菜',
        type: 'line',
        smooth: true,
        data: [620, 630, 640, 650, 660, 670, 680],
        lineStyle: {
          width: 2,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#fb7293' },
            { offset: 1, color: '#ffdb5c' }
          ])
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#ffdb5c',
          borderColor: '#fb7293',
          borderWidth: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(251,114,147,0.3)' },
            { offset: 1, color: 'rgba(251,114,147,0.01)' }
          ])
        }
      },
      {
        name: '黄瓜',
        type: 'line',
        smooth: true,
        data: [600, 610, 615, 620, 630, 635, 640],
        lineStyle: {
          width: 2,
          color: '#1afa29'
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#1afa29' },
        areaStyle: {
          color: 'rgba(26,250,41,0.2)'
        }
      },
      {
        name: '包菜',
        type: 'line',
        smooth: true,
        data: [580, 585, 590, 595, 600, 605, 610],
        lineStyle: {
          width: 2,
          color: '#ffdb5c'
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#ffdb5c' },
        areaStyle: {
          color: 'rgba(255,219,92,0.2)'
        }
      },
      {
        name: '菠菜',
        type: 'line',
        smooth: true,
        data: [550, 555, 560, 565, 570, 575, 580],
        lineStyle: {
          width: 2,
          color: '#00b4ff'
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#00b4ff' },
        areaStyle: {
          color: 'rgba(0,180,255,0.2)'
        }
      }
    ]
  }
  forecastChart.setOption(option)
}

onMounted(() => {
  initRankingChart()
  initForecastChart()
  window.addEventListener('resize', () => {
    rankingChart?.resize()
    forecastChart?.resize()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    rankingChart?.resize()
    forecastChart?.resize()
  })
  rankingChart?.dispose()
  forecastChart?.dispose()
})
</script>

<template>
  <div class="panel-box">
    <div class="two-col-layout">
      <div id="production-ranking" class="chart-container glow-box"></div>
      <div id="production-forecast" class="chart-container glow-box"></div>
    </div>
  </div>
</template>

<style scoped>
.panel-box {
  background: rgba(9, 44, 88, 0.7);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(0, 180, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.two-col-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.chart-container {
  height: 360px;
  background: rgba(9, 44, 88, 0.4);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.glow-box::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg,
      rgba(0, 247, 255, 0.2) 0%,
      rgba(251, 114, 147, 0.2) 50%,
      rgba(0, 247, 255, 0.2) 100%);
  z-index: -1;
  border-radius: 10px;
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {

  0%,
  100% {
    opacity: 0.4;
  }

  50% {
    opacity: 0.8;
  }
}
</style>