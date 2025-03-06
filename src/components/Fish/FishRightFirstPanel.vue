<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import * as echarts from 'echarts'
import 'element-plus/dist/index.css'
import { startWarningLightApi, endWarningLightApi } from '@/apis/common'
import { ElNotification } from 'element-plus'
import { useSensorData } from '@/common/GetSenSorData'

const sensorData = useSensorData()

// 用 computed 包装公共传感器数据中的字段
const waterTemperature = computed(() => Number(sensorData.waterTemperature) || 0)
const waterPh = computed(() => Number(sensorData.waterPhValue) || 0)
const collectionTime = computed(() => sensorData.collectionTime)

// 图表数据（用于本组件显示历史趋势记录）
const tempData = ref(Array(20).fill(0))
const phData = ref(Array(20).fill(0))
const timeData = ref(Array(20).fill(new Date().getSeconds()))

// 水温报警状态及阈值
const isTempWarning = ref(false)
const tempThreshold = 35
// 关闭水温报警阈值
const closeTempThreshold = 33
let warningNotification = null
// 折线图边框颜色
const chartBorderColor = {
  normal: 'rgba(0, 247, 255, 0.2)', // 正常状态 => 蓝色
  warning: '#ff0000'  // 报警颜色 => 红色
}

// 传感器连接状态
const senSorConnectStatus = ref(true)

// DOM 引用以及图表实例
const tempChartRef = ref(null)
const phChartRef = ref(null)
const dialogTempChartRef = ref(null)
let tempChart = null
let phChart = null
let dialogTempChart = null

// 对话框状态
const isDialogVisible = ref(false)
const dialogChartType = ref('temperature')

// 图表颜色配置
const tempNormalColor = {
  line: '#00F7FF',
  areaStart: 'rgba(0, 247, 255, 0.3)',
  areaEnd: 'rgba(0, 247, 255, 0)'
}
const tempWarningColor = {
  line: '#ff0000',
  areaStart: 'rgba(255, 0, 0, 0.3)',
  areaEnd: 'rgba(255, 0, 0, 0)'
}

// 基础图表配置
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
    bottom: '5%', // 修改由 '10%' -> '5%'
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: timeData.value,
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

// 对话框专用图表配置
const getDialogOption = () => ({
  yAxis: {
    type: 'value',
    min: 10,
    interval: 1,
    axisLabel: {
      color: '#fff',
      fontSize: 14
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255,255,255,0.2)',
        type: 'dashed'
      }
    }
  }
})

// 更新图表颜色
const updateChartColor = (chart, colorConfig) => {
  if (!chart || chart.isDisposed()) return
  chart.setOption({
    series: [{
      itemStyle: { color: colorConfig.line },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: colorConfig.areaStart },
          { offset: 1, color: colorConfig.areaEnd }
        ])
      }
    }]
  }, false)
}

// 水温报警处理
const waterTemperatureWarning = async () => {
  waterTemperatureWarningMessage()
  await startWarningLightApi()
  updateChartColor(tempChart, tempWarningColor)
  if (dialogChartType.value === 'temperature' && dialogTempChart) {
    updateChartColor(dialogTempChart, tempWarningColor)
  }
}
const closeWaterTemperatureWarningMessage = () => {
  if (warningNotification) {
    warningNotification.close()
    warningNotification = null
  }
  endWarningLightApi()
  updateChartColor(tempChart, tempNormalColor)
  if (dialogChartType.value === 'temperature' && dialogTempChart) {
    updateChartColor(dialogTempChart, tempNormalColor)
  }
}
const waterTemperatureWarningMessage = () => {
  warningNotification = ElNotification({
    title: 'Warning',
    message: '当前水温超过阈值，请及时处理',
    position: 'bottom-right',
    type: 'warning',
    duration: 0,
    showClose: false,
  })
}

// 初始化图表
const initChart = (chartInstance, data, colorConfig, isDialog = false) => {
  if (!chartInstance || chartInstance.isDisposed()) return
  const baseOption = isDialog ? { ...getBaseOption(), ...getDialogOption() } : getBaseOption()
  const labelOption = isDialog ? { show: true, position: 'top', fontSize: 12, color: '#fff', fontWeight: 'bold' } : { show: false }
  chartInstance.setOption({
    ...baseOption,
    series: [{
      data,
      type: 'line',
      label: labelOption, // 根据是否对话框显示标签
      smooth: true,
      symbol: 'circle',
      itemStyle: { color: colorConfig.line },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: colorConfig.areaStart },
          { offset: 1, color: colorConfig.areaEnd }
        ])
      },
      lineStyle: { width: 2 }
    }]
  }, true)
}

// 安全初始化图表，处理重绘前清理旧实例
const safeInitCharts = async () => {
  await nextTick()
  const cleanChart = (dom) => {
    if (!dom) return
    const exist = echarts.getInstanceByDom(dom)
    if (exist && !exist.isDisposed()) exist.dispose()
    dom.removeAttribute('_echarts_instance_')
  }
  cleanChart(tempChartRef.value)
  if (tempChartRef.value) {
    tempChart = echarts.init(tempChartRef.value)
    initChart(tempChart, tempData.value, isTempWarning.value ? tempWarningColor : tempNormalColor)
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
  cleanChart(dialogTempChartRef.value)
  if (dialogTempChartRef.value) {
    dialogTempChart = echarts.init(dialogTempChartRef.value)
    const isTemp = dialogChartType.value === 'temperature'
    const colorConfig = isTemp ? (isTempWarning.value ? tempWarningColor : tempNormalColor) : {
      line: '#1AFA29',
      areaStart: 'rgba(26, 250, 41, 0.3)',
      areaEnd: 'rgba(26, 250, 41, 0)'
    }
    initChart(dialogTempChart, isTemp ? tempData.value : phData.value, colorConfig, true)
  }
}

// 每次传感器数据更新时更新图表数据
const updateCharts = () => {
  const currentTemp = waterTemperature.value
  const currentPH = waterPh.value
  const second = new Date().getSeconds()
  tempData.value = [...tempData.value.slice(1), currentTemp]
  phData.value = [...phData.value.slice(1), currentPH]
  timeData.value = [...timeData.value.slice(1), second]

  const updateChart = (chart, data) => {
    if (chart && !chart.isDisposed()) {
      chart.setOption({
        series: [{ data: data.value, animation: false }],
        xAxis: { data: timeData.value }
      })
    }
  }
  updateChart(tempChart, tempData)
  updateChart(phChart, phData)

  if (currentTemp > tempThreshold && !isTempWarning.value) {
    isTempWarning.value = true
    waterTemperatureWarning()
  }
  if (currentTemp <= closeTempThreshold && isTempWarning.value) {
    isTempWarning.value = false
    closeWaterTemperatureWarningMessage()
  }
  if (tempChart && !tempChart.isDisposed()) {
    updateChartColor(tempChart, isTempWarning.value ? tempWarningColor : tempNormalColor)
  }
  if (dialogTempChart && !dialogTempChart.isDisposed() && dialogChartType.value === 'temperature') {
    updateChartColor(dialogTempChart, isTempWarning.value ? tempWarningColor : tempNormalColor)
  }
  if (dialogTempChart && !dialogTempChart.isDisposed()) {
    dialogTempChart.setOption({
      series: [{
        data: dialogChartType.value === 'temperature' ? tempData.value : phData.value,
        animation: false
      }],
      xAxis: { data: timeData.value }
    })
  }
}

// 监听 collectionTime 的变化来触发图表更新
watch(collectionTime, () => {
  updateCharts()
}, { immediate: true })

// 处理窗口 resize
const resizeHandler = () => {
  [tempChart, phChart, dialogTempChart].forEach(chart => {
    if (chart && !chart.isDisposed()) chart.resize()
  })
}

// 生命周期
onMounted(async () => {
  await safeInitCharts()
  window.addEventListener('resize', resizeHandler)
})
onUnmounted(() => {
  [tempChart, phChart, dialogTempChart].forEach(chart => {
    if (chart && !chart.isDisposed()) chart.dispose()
  })
  window.removeEventListener('resize', resizeHandler)
})
onBeforeRouteUpdate(async (to, from, next) => {
  [tempChart, phChart, dialogTempChart].forEach(chart => {
    if (chart && !chart.isDisposed()) chart.dispose()
  })
  await safeInitCharts()
  next()
})
// 默认图表颜色配置
const defaultChartColor = {
  line: '#1AFA29',
  areaStart: 'rgba(26, 250, 41, 0.3)',
  areaEnd: 'rgba(26, 250, 41, 0)'
}


// 点击图表时显示对话框
const handleChartClick = (type) => {
  dialogChartType.value = type
  isDialogVisible.value = true
  nextTick(() => {
    if (dialogTempChart && !dialogTempChart.isDisposed()) {
      const colorConfig =  defaultChartColor
      if (type === 'temp') {
        colorConfig = isTempWarning.value ? tempWarningColor: tempNormalColor
      }
      updateChartColor(dialogTempChart, colorConfig)
    }
  })
}

// 监听对话框显示状态以初始化对话框图表
watch(isDialogVisible, async (visible) => {
  if (visible) {
    await nextTick()
    if (dialogTempChartRef.value) {
      if (dialogTempChart && !dialogTempChart.isDisposed()) dialogTempChart.dispose()
      dialogTempChart = echarts.init(dialogTempChartRef.value)
      const isTemp = dialogChartType.value === 'temperature'
      const colorConfig = isTemp
        ? (isTempWarning.value ? tempWarningColor : tempNormalColor)
        : { line: '#1AFA29', areaStart: 'rgba(26, 250, 41, 0.3)', areaEnd: 'rgba(26, 250, 41, 0)' }
      initChart(dialogTempChart, isTemp ? tempData.value : phData.value, colorConfig, true)
    }
  }
})
</script>

<template>
  <section class="sensor-panel">
    <div class="panel-header">
      <svg t="1740887531303" class="header-icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="16416" width="50" height="50">
        <path
          d="M867.584 160.192c-149.632-16.928-262.208-57.408-334.592-120.352l-19.04-16.544-20.544 14.656C379.968 118.944 267.776 160 160 160H128v448c0 137.344 121.088 261.92 370.208 380.864l13.088 6.24 13.344-5.728C771.072 883.52 896 755.232 896 608V163.424l-28.416-3.232zM832 608c0 116.8-107.392 223.36-319.328 316.8C299.872 821.024 192 714.464 192 608V222.976c104.672-6.784 211.584-46.688 318.496-118.944C587.232 162.528 695.168 201.536 832 220.256V608z"
          p-id="16417" fill="#1296db"></path>
        <path
          d="M359.776 468.672a32 32 0 1 0-47.968 42.4l121.792 137.824c12.608 14.24 30.176 21.568 47.904 21.568a64.384 64.384 0 0 0 49.696-23.52l197.6-242.72a32 32 0 0 0-49.632-40.416l-197.6 242.688-121.792-137.824z"
          p-id="16418" fill="#1296db"></path>
      </svg>
      <h2>水质实时监测系统</h2>
      <div class="decorative-line"></div>
    </div>

    <div class="data-container">
      <div class="realtime-data">
        <!-- ph值卡片 -->
        <div class="data-card">
          <div class="data-header">
            <svg t="1740890043989" class="data-icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="19646" width="50" height="50">
              <path
                d="M648 144s-10.64 7.85-24 24.39C592 208 552 288 528 368l-31.25-39.1C474.86 301.63 438.7 263.4 424 248c-57.8 60.52-184 242.28-184 408 0 115.6 87.58 210.74 200 222.72 7.89 0.84 15.89 1.28 24 1.28 123.71 0 224-100.29 224-224 0-12.3-0.79-24.6-2.27-36.85l2.27 4.66c89.07-4.18 160-77.71 160-167.81 0-156-200-312-200-312z"
                fill="#1296db" opacity=".3" p-id="19647"></path>
              <path
                d="M788.44 335.11c-14.39-33.4-34.39-68.04-59.45-102.94-42.45-59.12-84.35-98.26-86.11-99.89-6.35-5.9-16.24-5.67-22.3 0.52-6.07 6.18-6.12 16.07-0.11 22.31 20.61 21.4 53.65 67.15 80.99 121.12C724.52 321.74 752 389.88 752 456c0 35.06-11.6 67.99-33.54 95.24-17.67 21.95-41.22 38.59-67.5 47.98-5.67-32.9-16.12-67.12-31.27-102.29-19.04-44.19-45.51-90.03-78.7-136.25-56.29-78.4-111.78-130.23-114.11-132.39-6.37-5.91-16.29-5.66-22.35 0.57-6.06 6.23-6.04 16.16 0.05 22.36 21.41 21.82 69.21 79.83 112.61 158.84C579.02 522.6 592 605.92 592 656c0 52.97-19.92 103.43-56.09 142.08-36 38.47-84.67 61.69-137.04 65.39-8.38 0.59-14.87 7.56-14.87 15.96 0 8.4 6.49 15.37 14.87 15.96 5.77 0.41 11.53 0.62 17.13 0.62 64.11 0 124.38-24.96 169.71-70.29S656 720.11 656 656c0-5.78-0.17-11.61-0.5-17.5 41.66-5.3 80.1-24.62 109.46-55.31C797.87 548.79 816 503.62 816 456c0-37.77-9.27-78.45-27.56-120.89z"
                fill="#1296db" opacity=".3" p-id="19648"></path>
              <path
                d="M788.44 335.11c-14.39-33.4-34.39-68.04-59.45-102.94-42.45-59.12-84.35-98.26-86.11-99.89-6.14-5.7-15.64-5.7-21.77 0-3.38 3.14-77.84 72.87-128.13 166.83-36.25-42.97-64.44-69.3-66.09-70.83-6.14-5.7-15.64-5.7-21.77 0-2.33 2.17-57.82 53.99-114.11 132.39-33.19 46.22-59.66 92.06-78.7 136.25C188.21 552.84 176 606.37 176 656c0 64.11 24.96 124.38 70.29 169.71S351.89 896 416 896s124.38-24.96 169.71-70.29S656 720.11 656 656c0-5.78-0.17-11.61-0.5-17.5 41.66-5.3 80.1-24.62 109.46-55.31C797.87 548.79 816 503.62 816 456c0-37.77-9.27-78.45-27.56-120.89zM416 864c-114.69 0-208-93.31-208-208 0-45.16 11.29-94.32 33.56-146.11 18.06-42.01 43.32-85.77 75.08-130.06 40.04-55.85 80.54-98.58 99.37-117.47 18.76 18.81 59.01 61.27 99 116.97 31.84 44.35 57.18 88.17 75.3 130.25C612.66 561.48 624 610.75 624 656c0 114.69-93.31 208-208 208z m325.84-302.93c-24.09 25.18-55.55 41.08-89.67 45.6-5.32-35.18-16.18-71.91-32.47-109.75-19.04-44.19-45.51-90.03-78.7-136.25a972.393 972.393 0 0 0-25.98-34.53c37.01-74.07 93.46-135.69 116.99-159.67 15 15.26 43.33 45.76 71.35 84.86C740.15 302.67 784 379.85 784 456c0 39.34-14.97 76.65-42.16 105.07z"
                fill="#1296db" p-id="19649"></path>
              <path
                d="M344 624h-32c-8.84 0-16 7.16-16 16v112c0 8.84 7.16 16 16 16s16-7.16 16-16v-32h16c26.47 0 48-21.53 48-48s-21.53-48-48-48z m0 64h-16v-32h16c8.82 0 16 7.18 16 16s-7.18 16-16 16zM536 528c-8.84 0-16 7.16-16 16v64h-64v-64c0-8.84-7.16-16-16-16s-16 7.16-16 16v160c0 8.84 7.16 16 16 16s16-7.16 16-16v-64h64v64c0 8.84 7.16 16 16 16s16-7.16 16-16V544c0-8.84-7.16-16-16-16z"
                fill="#1296db" p-id="19650"></path>
            </svg>
            <span class="data-title">PH值监测</span>
          </div>
          <div class="data-value">
            {{ waterPh.toFixed(1) }}
            <span class="data-unit">pH</span>
          </div>
        </div>
        <!-- 水温卡片 -->
        <div class="data-card" :class="{ 'warning-active': isTempWarning }">
          <div class="data-header">
            <svg t="1740889995163" class="data-icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="17508" width="50" height="50">
              <path
                d="M511.996 804.211c68.808 0 124.587-55.781 124.587-124.589 0-46.114-25.055-86.374-62.292-107.917v-37.437h41.53c22.935 0 41.53-18.593 41.53-41.53s-18.595-41.53-41.53-41.53h-41.53v-41.53h20.763c22.937 0 41.53-18.593 41.53-41.53s-18.593-41.53-41.53-41.53h-20.763v-41.53h20.763c22.937 0 41.53-18.593 41.53-41.53s-18.593-41.53-41.53-41.53h-20.763v-41.53c0-34.405-27.891-62.294-62.294-62.294-34.405 0-62.294 27.889-62.294 62.294v411.203c-37.239 21.542-62.294 61.802-62.294 107.917-0.002 68.813 55.779 124.593 124.587 124.593z m311.473-145.354c-11.471 0-20.767 9.296-20.767 20.765 0 22.935-18.593 41.53-41.528 41.53-22.937 0-41.53-18.595-41.53-41.53 0-11.468-9.298-20.765-20.767-20.765-11.468 0-20.763 9.296-20.763 20.765 0 45.872 37.186 83.059 83.059 83.059 45.872 0 83.057-37.188 83.057-83.059 0.001-11.468-9.295-20.765-20.761-20.765z m-519.123 83.058c0 11.468 9.296 20.767 20.765 20.767 11.468 0 20.765-9.298 20.765-20.767 0-45.872-37.188-83.057-83.059-83.057-45.872 0-83.059 37.186-83.059 83.057 0 11.468 9.296 20.767 20.765 20.767 11.47 0 20.765-9.298 20.765-20.767 0-22.935 18.593-41.528 41.53-41.528s41.528 18.593 41.528 41.528z m421.337 129.479c-16.066 17.156-42.115 17.156-58.179 0l-29.089 31.066c32.129 34.31 84.224 34.312 116.356-0.002 8.034-8.578 8.034-22.486 0-31.064-8.035-8.58-21.056-8.578-29.088 0z m-349.071 0.002v-0.002l-0.002 0.002c-16.066 17.158-42.113 17.158-58.179 0-8.034-8.578-21.055-8.578-29.089 0-8.032 8.578-8.034 22.486 0 31.064 32.131 34.314 84.226 34.314 116.358 0v-0.002c16.066-17.154 42.113-17.154 58.179 0.002l15.023-16.043 14.065-15.022c-32.132-34.313-84.226-34.311-116.355 0.001z m174.534-0.002c-16.066 17.156-42.113 17.156-58.179 0l-0.001 0.001 0.001 0.001-14.066 15.021-15.021 16.043c32.129 34.31 84.224 34.312 116.356-0.002v0.002c16.066-17.158 42.113-17.16 58.179-0.002l29.089-31.064c-32.132-34.314-84.226-34.314-116.358 0z"
                fill="#5E9DF3" p-id="17509"></path>
              <path
                d="M511.996 98.228c34.403 0 62.294 27.889 62.294 62.294s-27.891 62.294-62.294 62.294c-34.405 0-62.294-27.889-62.294-62.294s27.889-62.294 62.294-62.294z"
                fill="#3080EE" p-id="17510"></path>
            </svg>
            <span class="data-title">水温监测</span>
          </div>
          <div class="data-value" :style="{ color: isTempWarning ? '#ff0000' : '#1AFA29' }">
            {{ waterTemperature.toFixed(1) }}
            <span class="data-unit">°C</span>
          </div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-box" @click="handleChartClick('ph')">
          <div ref="phChartRef" class="chart"></div>
        </div>

        <div class="chart-box" @click="handleChartClick('temp')"
          :style="{ borderColor: isTempWarning ? chartBorderColor.warning : chartBorderColor.normal }">
          <div ref="tempChartRef" class="chart"></div>
        </div>
        
      </div>
    </div>

    <div class="status-bar">
      <span>最后更新: {{ collectionTime }}</span>
      <div class="status-indicator">
        <div class="led" :style="{ backgroundColor: senSorConnectStatus ? '#1AFA29' : '#ff0000' }"></div>
        <span>{{ senSorConnectStatus ? '实时连接中' : '连接失败' }}</span>
      </div>
    </div>

    <el-dialog v-model="isDialogVisible" width="70%" :title="dialogChartType === 'temperature' ? '水温趋势详情' : 'PH值趋势详情'"
      center>
      <div ref="dialogTempChartRef" class="dialog-chart"></div>
      <template #footer>
        <div class="dialog-footer">
          <span class="time-range">最近20秒数据记录</span>
        </div>
      </template>
    </el-dialog>
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
}

.panel-header h2 {
  margin: 0 15px;
  color: #00F7FF;
  font-size: 1.4em;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
}

.panel-header .header-icon {
  width: 32px;
  height: 32px;
  fill: #1AFA29;
}

.panel-header .decorative-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg,
      rgba(26, 250, 41, 0.3) 0%,
      rgba(0, 247, 255, 0.3) 100%);
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
}

.data-card.warning-active {
  border-color: #ff0000 !important;
  background: rgba(255, 0, 0, 0.1) !important;
  animation: pulseWarning 1s infinite;
}

@keyframes pulseWarning {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.2);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}

.data-card .data-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.data-card .data-header .data-icon {
  width: 36px;
  height: 36px;
  margin-right: 10px;
  fill: #00F7FF;
}

.data-card .data-header .data-title {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1em;
}

.data-card .data-value {
  font-size: 2.2em;
  color: #1AFA29;
  text-shadow: 0 0 15px rgba(26, 250, 41, 0.3);
}

.data-card .data-value .data-unit {
  font-size: 0.6em;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 5px;
}

.chart-container {
  display: grid;
  gap: 20px;
}

.chart-box {
  background: rgba(0, 20, 40, 0.8);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(0, 247, 255, 0.2);
  height: 300px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.chart-box:hover {
  transform: translateY(-3px);
}

.chart {
  width: 100%;
  height: 100%;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid rgba(26, 250, 41, 0.3);
}

.status-bar span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9em;
}

.status-indicator {
  display: flex;
  align-items: center;
}

.status-indicator .led {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 0 10px currentColor;
  margin-right: 8px;
  animation: pulse 1s infinite;
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

.dialog-chart {
  width: 100%;
  height: 400px;
}

:deep(.el-dialog) {
  background: linear-gradient(145deg, #0a1a2d, #0c2b4d) !important;
  border-radius: 12px !important;
  border: 1px solid rgba(0, 247, 255, 0.3) !important;
}

:deep(.el-dialog__header) {
  color: #00F7FF !important;
  border-bottom: 1px solid rgba(0, 247, 255, 0.2) !important;
  padding: 20px !important;
}

:deep(.el-dialog__title) {
  color: white;
  font-size: 1.2em !important;
  text-shadow: 0 0 8px rgba(0, 247, 255, 0.3) !important;
}

:deep(.el-dialog__body) {
  padding: 15px 20px !important;
}

.dialog-footer {
  padding: 10px;
  text-align: center;
}

.dialog-footer .time-range {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9em;
}
</style>