<script setup>
import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useSensorData } from '@/common/GetSenSorData'
import { Bold } from 'lucide-vue-next'
let cropChart = null
// 传感器数据
const sensorData = useSensorData()
const initCropChart = () => {
  const dom = document.getElementById('crop-stats')
  if (!dom) return
  cropChart = echarts.init(dom)
  const option = {
    title: {
      text: '种植结构分析',
      textStyle: {
        color: '#00f7ff',
        fontSize: 16,
        fontWeight: 'bold'
      },
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: ({ name, value, percent }) => `
        <div class="chart-tooltip">
          <div class="crop-name">${name}</div>
          <div class="crop-stats">
            <span>${value}亩</span>
            <span>(${percent}%)</span>
          </div>
        </div>
      `,
      backgroundColor: 'rgba(9,44,88,0.9)',
      borderColor: '#00f7ff',
      borderWidth: 1
    },
    legend: {
      orient: 'vertical',
      right: 20,
      top: 50,
      textStyle: { color: '#89d8ff' },
      itemGap: 15,
      formatter: name => {
        const data = cropData.find(item => item.name === name)
        return `{rate|${data?.percent}%} ${name}`
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        rich: {
          rate: {
            color: '#1afa29',
            padding: [0, 5]
          }
        }
      }
    },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '55%'],
      itemStyle: {
        borderRadius: 8,
        borderColor: '#0a1a2d',
        borderWidth: 4
      },
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data: cropData.map(item => ({
        ...item,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: item.color[0] },
            { offset: 1, color: item.color[1] }
          ])
        }
      }))
    }]
  }
  cropChart.setOption(option)
}

// 模拟数据
const cropData = [
  { name: '水稻', value: 320, percent: 35, color: ['#1afa29', '#00b4ff'] },
  { name: '玉米', value: 240, percent: 26, color: ['#ffdb5c', '#ff9f43'] },
  { name: '小麦', value: 180, percent: 20, color: ['#fb7293', '#ff0066'] },
  { name: '蔬菜', value: 160, percent: 18, color: ['#9a5dff', '#6a1b9a'] }
]

onMounted(() => {
  initCropChart()
  window.addEventListener('resize', () => cropChart?.resize())
})

onUnmounted(() => {
  window.removeEventListener('resize', () => cropChart?.resize())
  cropChart?.dispose()
})
</script>

<template>
  <div class="panel-box">
    <div id="crop-stats" class="crop-chart"></div>

    <div class="weather-indicator">
      <div class="weather-item">
        <div class="weather-icon temp">
          <div class="wave"></div>
          <span>🌡️</span>
        </div>
        <div class="weather-info">
          <div class="value">{{ sensorData.airTemperature }}℃</div>
          <div class="label">实时温度</div>
        </div>
      </div>

      <div class="weather-item">
        <div class="weather-icon humidity">
          <div class="droplet"></div>
          <span>💧</span>
        </div>
        <div class="weather-info">
          <div class="value">{{ sensorData.airHumidity }}%</div>
          <div class="label">空气湿度</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-box {
  height: 433px;
  /* background: linear-gradient(152deg, #0a1a2d 0%, #0c2b4d 100%); */
  border-radius: 12px;
  padding: 20px;
  display: flex;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 180, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 45, 120, 0.3);
}

.crop-chart {
  width: 60%;
  height: 100%;
}

.weather-indicator {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 30px;
}

.weather-item {
  background: rgba(9, 44, 88, 0.6);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.weather-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 180, 255, 0.2);
}

.weather-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.weather-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg,
      rgba(26, 250, 41, 0.2) 0%,
      rgba(0, 180, 255, 0.2) 100%);
  border-radius: 50%;
}

.temp .wave {
  position: absolute;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle at 50% 0%,
      rgba(255, 219, 92, 0.4) 0%,
      transparent 60%);
  animation: pulse 3s infinite;
}

.humidity .droplet {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(0, 247, 255, 0.6);
  border-radius: 50%;
  animation: drop 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
}

@keyframes drop {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: translateY(20px);
    opacity: 0;
  }
}

.weather-info .value {
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, #1afa29, #00f7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 5px;
}

.weather-info .label {
  color: #89d8ff;
  font-size: 14px;
}
</style>