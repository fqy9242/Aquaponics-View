<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import * as echarts from 'echarts'

// 响应式数据
const waterTemperature = ref(0)
const waterPh = ref(0)
const collectionTime = ref('')
const tempData = ref([])
const phData = ref([])

// DOM引用
const tempChartRef = ref(null)
const phChartRef = ref(null)
let tempChart = null
let phChart = null

// WebSocket实例
let ws = null
let messageHandler = null

// 图表基础配置
const getBaseOption = () => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 32, 64, 0.9)',
    borderColor: '#00F7FF',
    axisPointer: { type: 'line' }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: Array.from({ length: 20 }, (_, i) => i + 1),
    axisLabel: { color: '#fff' }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#fff' },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
  }
})

// 初始化图表
const initChart = (chartInstance, data, colorConfig) => {
  if (!chartInstance) return

  chartInstance.setOption({
    ...getBaseOption(),
    series: [{
      data,
      type: 'line',
      smooth: true,
      symbol: 'none',
      itemStyle: { color: colorConfig.line },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: colorConfig.areaStart },
          { offset: 1, color: colorConfig.areaEnd }
        ])
      }
    }]
  })
}

// 安全初始化图表
const safeInitCharts = async () => {
  await nextTick()

  // 清理残留实例
  const cleanChart = (dom) => {
    if (!dom) return
    const exist = echarts.getInstanceByDom(dom)
    if (exist) echarts.dispose(exist)
    dom.removeAttribute('_echarts_instance_')
  }

  cleanChart(tempChartRef.value)
  cleanChart(phChartRef.value)

  // 初始化新实例
  if (tempChartRef.value) {
    tempChart = echarts.init(tempChartRef.value)
    initChart(tempChart, tempData.value, {
      line: '#00F7FF',
      areaStart: 'rgba(0, 247, 255, 0.3)',
      areaEnd: 'rgba(0, 247, 255, 0)'
    })
  }

  if (phChartRef.value) {
    phChart = echarts.init(phChartRef.value)
    initChart(phChart, phData.value, {
      line: '#1AFA29',
      areaStart: 'rgba(26, 250, 41, 0.3)',
      areaEnd: 'rgba(26, 250, 41, 0)'
    })
  }
}

// WebSocket连接
const connectWebSocket = () => {
  // 关闭旧连接
  if (ws) {
    ws.removeEventListener('message', messageHandler)
    ws.close()
  }

  ws = new WebSocket('ws://localhost:9000')

  messageHandler = (event) => {
    try {
      const data = JSON.parse(event.data)
      if (data.data['08']) {
        waterTemperature.value = data.data['08'].temperature || 0
        waterPh.value = data.data['08'].ph_value || 0
        collectionTime.value = new Date().toLocaleString()

        // 更新数据队列
        tempData.value = [...tempData.value.slice(-19), waterTemperature.value]
        phData.value = [...phData.value.slice(-19), waterPh.value]

        // 安全更新图表
        if (tempChart && !tempChart.isDisposed()) {
          tempChart.setOption({ series: [{ data: tempData.value }] })
        }
        if (phChart && !phChart.isDisposed()) {
          phChart.setOption({ series: [{ data: phData.value }] })
        }
      }
    } catch (e) {
      console.error('数据解析失败:', e)
    }
  }

  ws.addEventListener('open', () => console.log('WebSocket connected'))
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('error', console.error)
  ws.addEventListener('close', () => console.log('WebSocket disconnected'))
}

// 窗口resize处理
const resizeHandler = () => {
  if (tempChart && !tempChart.isDisposed()) tempChart.resize()
  if (phChart && !phChart.isDisposed()) phChart.resize()
}

// 生命周期
onMounted(async () => {
  await safeInitCharts()
  connectWebSocket()
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  // 清理WebSocket
  if (ws) {
    ws.removeEventListener('message', messageHandler)
    ws.close()
    ws = null
  }

  // 销毁图表
  if (tempChart && !tempChart.isDisposed()) {
    tempChart.dispose()
    tempChart = null
  }
  if (phChart && !phChart.isDisposed()) {
    phChart.dispose()
    phChart = null
  }

  // 移除事件监听
  window.removeEventListener('resize', resizeHandler)
})

// 路由更新处理
onBeforeRouteUpdate(async (to, from, next) => {
  // 销毁旧实例
  if (tempChart) tempChart.dispose()
  if (phChart) phChart.dispose()

  // 重新初始化
  await safeInitCharts()
  next()
})
</script>

<template>
  <section class="sensor-panel">
    <!-- 标题栏 -->
    <div class="panel-header">
      <svg class="header-icon" viewBox="0 0 24 24">
        <!-- 传感器图标路径 -->
      </svg>
      <h2>水质实时监测系统</h2>
      <div class="decorative-line"></div>
    </div>

    <!-- 数据展示区 -->
    <div class="data-container">
      <!-- 实时数据 -->
      <div class="realtime-data">
        <div class="data-card">
          <div class="data-header">
            <svg class="data-icon" viewBox="0 0 1024 1024">
              <!-- 水温图标路径 -->
            </svg>
            <span class="data-title">水温监测</span>
          </div>
          <div class="data-value">
            {{ waterTemperature.toFixed(1) }}
            <span class="data-unit">°C</span>
          </div>
        </div>

        <div class="data-card">
          <div class="data-header">
            <svg class="data-icon" viewBox="0 0 1024 1024">
              <!-- PH值图标路径 -->
            </svg>
            <span class="data-title">PH值监测</span>
          </div>
          <div class="data-value">
            {{ waterPh.toFixed(1) }}
            <span class="data-unit">pH</span>
          </div>
        </div>
      </div>

      <!-- 图表区 -->
      <div class="chart-container">
        <div class="chart-box">
          <div ref="tempChartRef" class="chart-container"></div>
        </div>
        <div class="chart-box">
          <div ref="phChartRef" class="chart-container"></div>
        </div>
      </div>
    </div>

    <!-- 状态栏 -->
    <div class="status-bar">
      <span>最后更新: {{ collectionTime }}</span>
      <div class="status-indicator">
        <div class="led"></div>
        <span>实时连接中</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sensor-panel {
  background: linear-gradient(145deg, #0a1a2d 0%, #0c2b4d 100%);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 45, 120, 0.3);
  min-height: 80vh;
}

.panel-header {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(26, 250, 41, 0.3);

  h2 {
    margin: 0 15px;
    color: #00F7FF;
    font-size: 1.4em;
    text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
  }

  .header-icon {
    width: 32px;
    height: 32px;
    fill: #1AFA29;
  }

  .decorative-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg,
        rgba(26, 250, 41, 0.3) 0%,
        rgba(0, 247, 255, 0.3) 100%);
  }
}

.data-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  margin: 20px 0;
  min-height: 60vh;
}

.realtime-data {
  display: grid;
  gap: 15px;
}

.data-card {
  background: rgba(0, 32, 64, 0.3);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(26, 250, 41, 0.2);
  backdrop-filter: blur(5px);

  .data-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .data-icon {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      fill: #00F7FF;
    }

    .data-title {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.1em;
    }
  }

  .data-value {
    font-size: 2.2em;
    color: #1AFA29;
    text-shadow: 0 0 15px rgba(26, 250, 41, 0.3);

    .data-unit {
      font-size: 0.6em;
      color: rgba(255, 255, 255, 0.7);
      margin-left: 5px;
    }
  }
}

.chart-container {
  display: grid;
  gap: 20px;

  .chart-box {
    background: rgba(0, 20, 40, 0.8);
    border-radius: 12px;
    padding: 15px;
    border: 1px solid rgba(0, 247, 255, 0.2);
    height: 300px;
  }
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid rgba(26, 250, 41, 0.3);

  span {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9em;
  }

  .status-indicator {
    display: flex;
    align-items: center;

    .led {
      width: 12px;
      height: 12px;
      background: #1AFA29;
      border-radius: 50%;
      box-shadow: 0 0 10px #1AFA29;
      margin-right: 8px;
      animation: pulse 1s infinite;
    }
  }
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.6;
  }
}
</style>