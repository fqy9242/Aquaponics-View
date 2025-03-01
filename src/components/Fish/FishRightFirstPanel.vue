<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import * as echarts from 'echarts'
import { ElDialog } from 'element-plus'
import 'element-plus/dist/index.css'

// 传感器连接状态
const senSorConnectStatus = ref(false)

// 响应式数据（修复1：初始化20个数据点）
const waterTemperature = ref(0)
const waterPh = ref(0)
const collectionTime = ref('')
const tempData = ref(Array(20).fill(0)) // 初始20个0
const phData = ref(Array(20).fill(0))  // 初始20个0

// DOM引用
const tempChartRef = ref(null)
const phChartRef = ref(null)
const dialogTempChartRef = ref(null)
let tempChart = null
let phChart = null
let dialogTempChart = null

// 对话框状态
const isDialogVisible = ref(false)

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
    data: Array.from({ length: 20 }, (_, i) => i + 1), // 固定20个点
    axisLabel: {
      color: '#fff',
      fontSize: 12
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#fff',
      fontSize: 12
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255,255,255,0.1)',
        type: 'dashed'
      }
    }
  }
})

// 初始化图表（修复2：增强容错）
const initChart = (chartInstance, data, colorConfig) => {
  if (!chartInstance || chartInstance.isDisposed()) return

  try {
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
        },
        lineStyle: {
          width: 2
        }
      }]
    }, { notMerge: true })
  } catch (e) {
    console.error('图表初始化失败:', e)
  }
}

// 安全初始化图表（修复3：增强实例检查）
const safeInitCharts = async () => {
  await nextTick()

  const cleanChart = (dom) => {
    if (!dom) return
    const exist = echarts.getInstanceByDom(dom)
    if (exist && !exist.isDisposed()) {
      exist.dispose()
    }
    dom.removeAttribute('_echarts_instance_')
  }

  // 主图表
  cleanChart(tempChartRef.value)
  if (tempChartRef.value) {
    tempChart = echarts.init(tempChartRef.value)
    initChart(tempChart, tempData.value, {
      line: '#00F7FF',
      areaStart: 'rgba(0, 247, 255, 0.3)',
      areaEnd: 'rgba(0, 247, 255, 0)'
    })
  }

  cleanChart(phChartRef.value)
  if (phChartRef.value) {
    phChart = echarts.init(phChartRef.value)
    initChart(phChart, phData.value, {
      line: '#1AFA29',
      areaStart: 'rgba(26, 250, 41, 0.3)',
      areaEnd: 'rgba(26, 250, 41, 0)'
    })
  }

  // 对话框图表
  cleanChart(dialogTempChartRef.value)
  if (dialogTempChartRef.value) {
    dialogTempChart = echarts.init(dialogTempChartRef.value)
    initChart(dialogTempChart, tempData.value, {
      line: '#00F7FF',
      areaStart: 'rgba(0, 247, 255, 0.3)',
      areaEnd: 'rgba(0, 247, 255, 0)'
    })
  }
}

// WebSocket连接（修复4：增强数据验证）
const connectWebSocket = () => {
  if (ws) {
    ws.removeEventListener('message', messageHandler)
    ws.close()
  }

  ws = new WebSocket('ws://localhost:9000')
  messageHandler = (event) => {
    try {
      const data = JSON.parse(event.data)
      if (!data?.data?.['08']) return // 数据验证

      senSorConnectStatus.value = true

      // 更新数值
      waterTemperature.value = Number(data.data['08'].temperature) || 0
      waterPh.value = Number(data.data['08'].ph_value) || 0
      collectionTime.value = new Date().toLocaleString()

      // 更新数据队列（修复5：严格保持20个点）
      tempData.value = [...tempData.value.slice(1), waterTemperature.value]
      phData.value = [...phData.value.slice(1), waterPh.value]

      // 更新图表
      const updateChart = (chart, data) => {
        if (chart && !chart.isDisposed()) {
          chart.setOption({
            series: [{
              data: data.value,
              animation: false
            }]
          })
        }
      }

      updateChart(tempChart, tempData)
      updateChart(phChart, phData)
      updateChart(dialogTempChart, tempData)

    } catch (e) {
      console.error('数据处理错误:', e)
    }
  }

  ws.addEventListener('open', () => console.log('WebSocket connected'))
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('error', (e) => console.error('WebSocket error:', e))
  ws.addEventListener('close', () => {
    console.log('WebSocket disconnected')
    senSorConnectStatus.value = false
  })
}

// 窗口resize处理
const resizeHandler = () => {
  [tempChart, phChart, dialogTempChart].forEach(chart => {
    if (chart && !chart.isDisposed()) chart.resize()
  })
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
  [tempChart, phChart, dialogTempChart].forEach(chart => {
    if (chart && !chart.isDisposed()) chart.dispose()
  })

  window.removeEventListener('resize', resizeHandler)
})

// 路由更新处理
onBeforeRouteUpdate(async (to, from, next) => {
  [tempChart, phChart, dialogTempChart].forEach(chart => {
    if (chart && !chart.isDisposed()) chart.dispose()
  })
  await safeInitCharts()
  next()
})

// 点击图表放大处理
const toggleZoom = () => {
  isDialogVisible.value = !isDialogVisible.value
}
</script>

<template>
  <section class="sensor-panel">
    <!-- 标题栏 -->
    <div class="panel-header">
      <svg class="header-icon" viewBox="0 0 24 24">
        <path
          d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm0 15.89C9.27 16.42 5 12.5 5 8.63V6.3l7-2.42 7 2.43v2.3c0 3.87-4.27 7.79-7 9.26z" />
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
            <svg class="data-icon" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path
                d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
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
            <svg class="data-icon" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 13.5c-.83 0-1.5-.67-1.5-1.5S6.17 10.5 7 10.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
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
        <div class="chart-box" @click="toggleZoom">
          <div ref="tempChartRef" class="chart"></div>
        </div>
        <div class="chart-box">
          <div ref="phChartRef" class="chart"></div>
        </div>
      </div>
    </div>

    <!-- 状态栏 -->
    <div class="status-bar">
      <span>最后更新: {{ collectionTime }}</span>
      <div class="status-indicator">
        <div class="led" :style="{ backgroundColor: senSorConnectStatus ? '#1AFA29' : '#ff0000' }"></div>
        <span>{{ senSorConnectStatus ? '实时连接中' : '连接失败' }}</span>
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
  color: #fff;
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
      width: 36px;
      height: 36px;
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
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }

    .chart {
      width: 100%;
      height: 100%;
    }
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
      border-radius: 50%;
      box-shadow: 0 0 10px currentColor;
      margin-right: 8px;
      animation: pulse 1s infinite;
    }
  }
}

.dialog-chart {
  width: 100%;
  height: 400px;
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