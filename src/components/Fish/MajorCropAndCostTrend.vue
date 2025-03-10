<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 生成近7天日期（示例：["3/5", "3/6", ..., "3/11"]）
const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - 6 + i)
    return `${d.getMonth() + 1}/${d.getDate()}`
})

// 价格数据（单位：元/公斤）
const priceData = {
    dates: dates,
    大白菜: [2.8, 3.0, 3.2, 3.5, 3.3, 3.1, 2.9],
    黄瓜: [4.5, 4.8, 5.0, 5.2, 5.5, 5.3, 5.0],
    包菜: [3.2, 3.5, 3.8, 4.0, 3.9, 3.7, 3.5],
    西红柿: [5.8, 6.0, 6.2, 6.5, 6.3, 6.1, 5.9]
}

let chartInstance = null

const initChart = () => {
    const chartDom = document.getElementById('price-chart')
    if (!chartDom) return

    chartInstance = echarts.init(chartDom)

    const option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(9,44,88,0.9)',
            borderColor: 'rgba(0,180,255,0.5)',
            formatter: params => `
        <div style="color:#00f7ff;margin-bottom:5px;">${params[0].axisValue}</div>
        ${params.map(item => `
          <div style="display:flex;align-items:center;margin:3px 0;">
            <span style="display:inline-block;width:8px;height:8px;background:${item.color};margin-right:6px;"></span>
            ${item.seriesName}：
            <span style="color:${item.color};">¥${item.value}</span>
          </div>
        `).join('')}
      `
        },
        legend: {
            data: ['大白菜', '黄瓜', '包菜', '西红柿'],
            right: 20,
            textStyle: { color: '#89d8ff' }
        },
        grid: {
            left: 50,
            right: 30,
            bottom: 30,
            top: 50
        },
        xAxis: {
            type: 'category',
            data: priceData.dates,
            axisLine: { lineStyle: { color: 'rgba(137,216,255,0.3)' } },
            axisLabel: { color: '#89d8ff' }
        },
        yAxis: {
            type: 'value',
            splitLine: { lineStyle: { color: 'rgba(137,216,255,0.1)' } },
            axisLabel: { color: '#89d8ff', formatter: '¥{value}' }
        },
        series: [
            {
                name: '大白菜',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { color: '#00f7ff', width: 2 },
                data: priceData.大白菜
            },
            {
                name: '黄瓜',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { color: '#1afa29', width: 2 },
                data: priceData.黄瓜
            },
            {
                name: '包菜',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { color: '#ffdb5c', width: 2 },
                data: priceData.包菜
            },
            {
                name: '西红柿',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { color: '#fb7293', width: 2 },
                data: priceData.西红柿
            }
        ]
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
    <div class="panel-box water-quality-panel">
        <div class="header-row">
            <div class="left-header">
                <svg t="1740987900343" class="icon" viewBox="0 0 1170 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="30351" width="30" height="30">
                    <path
                        d="M959.817 187.173c126.354 24.868 195.73 88.43 207.726 185.307 11.081 89.71-15.36 148.187-81.554 180.37-18.03-136.484-111.982-187.245-204.544-149.065-31.818-39.753-61.44-81.737-96.403-118.308-20.663-21.65-48.018-44.618-75.41-49.738-70.363-13.092-109.166-43.3-122.368-122.148-11.52-68.681 16.53-128 83.09-107.959 67.584 20.297 134.4 28.416 202.387 40.338 62.317 10.972 91.648 70.4 87.076 141.166zM378.405 947.017c-45.349 8.668-91.795 27.648-135.827 22.93-38.729-4.132-86.418-25.417-109.495-55.734-43.812-57.6-39.753-127.781 15.909-177.957 44.763-40.338 96.475-77.093 151.186-100.352 181.54-77.093 362.935-53.723 544.293 17.554-178.14 63.708-330.752 167.022-468.114 295.497l2.048-1.938z"
                        p-id="30352" fill="#1296db"></path>
                    <path
                        d="M654.263 762.039L897.755 660.48l5.084-14.629-186.222-70.473c48.933-38.985 103.278-81.188 156.38-124.964 35.291-29.075 70.912-48.86 116.297-23.625 44.653 24.868 75.556 63.158 69.668 114.834-6.692 58.953 15.068 103.022 41.18 151.588 18.395 34.122 29.33 78.958 26.039 117.395-4.901 57.417-41.07 68.169-90.698 39.607-17.005-9.802-38.034-14.629-57.746-16.53-78.263-7.498-151.04-57.857-235.959-24.394-22.308 8.777-57.49-16.932-86.784-26.843l-0.731-20.407zM537.088 242.688c77.458-15.067 155.685 0 232.448 69.376-99.474 8.192-147.785 81.189-209.774 135.131-30.061 26.186-66.194 67.475-103.68 3.548-3.913-6.693-23.625-6.583-35.328-4.937-60.27 8.594-96.914-25.82-96.292-87.15 0.183-18.578-7.059-41.618-18.944-55.186-45.349-51.603-54.711-112.53-21.724-172.215a160.695 160.695 0 0 1 176.823-79.836c61.111 13.532 116.517 69.852 115.017 128.366-0.548 21.65-25.417 42.642-38.546 62.903z"
                        p-id="30353" fill="#1296db"></path>
                    <path
                        d="M18.578 822.565c68.023 29.22 93.111 78.848 80.823 149.833L18.578 822.565z m357.779 126.39l104.301-43.593c-107.264 124.343-312.612 158.025-350.793 59.392 87.516 27.502 171.374 39.79 248.503-17.7l-2.011 1.901z m222.939-389.851c38.18-63.598 70.254-127.195 112.896-182.199 14.007-18.103 61.257-27.282 82.761-17.079 40.594 19.2 43.41 63.488 19.09 100.974-50.834 78.519-127.597 101.083-214.747 98.267z m90.624 350.647c-74.13 73.508-134.766-39.863-208.823-11.959l-6.144-13.824c43.557-29.733 86.236-61.074 131.401-87.918 9.107-5.412 27.758 6.035 41.948 9.875 36.388 9.837 77.348 35.84 108.251 26.55 84.188-25.234 156.16 23.187 234.752 26.442 44.91 1.828 54.93 34.45 22.492 66.45-20.334 20.004-51.274 38.656-78.154 39.79-69.12 2.852-138.898-2.341-207.872-9.436-12.544-1.28-22.747-26.77-37.851-45.97z m-21.504-536.32c-13.385 87.662-56.247 148.992-136.594 174.007-63.89 19.895-131.145 29.44-193.646 52.809-58.441 21.833-117.029 49.371-167.131 86.455-38.474 28.452-63.854 75.556-101.523 122.404-72.887 1.5-86.381-48.823-50.212-117.504 25.417-48.274 81.664-81.92 128.987-114.834 59.319-41.216 123.575-74.971 197.888-119.186 32.951 11.812 82.871 37.12 135.351 45.348 26.587 4.17 61.074-17.847 86.053-36.388 36.425-27.063 67.474-61.733 100.827-93.111z"
                        p-id="30354" fill="#1296db"></path>
                </svg>
                <div class="title">&nbsp;主要种植作物top5</div>
            </div>
            <div class="right-header">
                <h3 class="title">
                    <svg t="1740987708995" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="27796" width="30" height="30">
                        <path d="M908.2 175.3v-1.4h-1.4l0.4 0.4c0.4 0.3 0.7 0.6 1 1z" p-id="27797" fill="#1296db">
                        </path>
                        <path
                            d="M936.5 704.2H85.9c-11 0-19.9 11.2-19.9 25s8.9 25 19.9 25h850.6c11 0 19.9-11.2 19.9-25-0.1-13.8-9-25-19.9-25zM107.3 532.5l250.2-181L562.6 548l344.3-338.4c0.5-0.5 1-1.1 1.5-1.7l0.6 69.2c0.1 13.7 11.3 24.8 25 24.8h0.2c13.8-0.1 24.9-11.4 24.8-25.2l-1.2-153-163.9 0.3c-13.8 0-25 11.2-25 25s11.2 25 25 25l78-0.1-0.1 0.1-309.7 304.4L362 286.6 78 492c-11.2 8.1-13.7 23.7-5.6 34.9s23.7 13.7 34.9 5.6z m800.9-358.6v1.4c-0.3-0.4-0.6-0.7-1-1l-0.4-0.4h1.4z"
                            p-id="27798" fill="#1296db"></path>
                    </svg>
                    <span>主要蔬菜价格走势</span>
                </h3>
            </div>
        </div>

        <div class="dashboard-layout">
            <!-- 左侧作物列表 -->
            <ul class="crop-list">
                <li class="crop-item">
                    <span class="crop-range">1</span>
                    <img src="@/assets/static/chinese-cabbage.jpg" draggable="false" class="crop-image" />
                    <span class="crop-name">大白菜</span>
                    <span class="crop-line"></span>
                    <span class="crop-value">556</span><span class="crop-unit">亩</span>
                </li>
                <li class="crop-item">
                    <span class="crop-range">2</span>
                    <img src="@/assets/static/cucumber.png" draggable="false" class="crop-image" />
                    <span class="crop-name">黄瓜</span>
                    <span class="crop-line"></span>
                    <span class="crop-value">260</span><span class="crop-unit">亩</span>
                </li>
                <li class="crop-item">
                    <span class="crop-range">3</span>
                    <img src="@/assets/static/cabbage.jpg" draggable="false" class="crop-image" />
                    <span class="crop-name">包菜</span>
                    <span class="crop-line"></span>
                    <span class="crop-value">160</span><span class="crop-unit">亩</span>
                </li>
                <li class="crop-item">
                    <span class="crop-range">4</span>
                    <img src="@/assets/static/tomato.jpg" draggable="false" class="crop-image" />
                    <span class="crop-name">西红柿</span>
                    <span class="crop-line"></span>
                    <span class="crop-value">90</span><span class="crop-unit">亩</span>
                </li>
                <li class="crop-item">
                    <span class="crop-range">5</span>
                    <img src="@/assets/static/spinach.jpg" draggable="false" class="crop-image" />
                    <span class="crop-name">菠菜</span>
                    <span class="crop-line"></span>
                    <span class="crop-value">46</span><span class="crop-unit">亩</span>
                </li>
            </ul>

            <!-- 右侧价格图表 -->
            <div class="price-chart-container">
                <div id="price-chart" style="width:100%;height:300px;"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel-box {
    /* background: rgba(9, 44, 88, 0.7); */
    border: 1px solid rgba(0, 180, 255, 0.2);
    border-radius: 8px;
    padding: 20px;
}

.header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.left-header {
    display: flex;
    align-items: center;
}
.right-header {
    margin-right: 43%;
}

.title {
    color: #00f7ff;
    font-size: 18px;
    margin: 0;
}

.dashboard-layout {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 25px;
}

.crop-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.crop-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 8px 15px;
    background: rgba(0, 180, 255, 0.05);
    border-radius: 4px;
}

.crop-range {
    width: 30px;
    text-align: center;
    color: #1afa29;
    font-family: monospace;
    margin-right: 12px;
}

.crop-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
}

.crop-name {
    color: white;
    min-width: 80px;
}

.crop-line {
    flex-grow: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 247, 255, 0.3));
    margin: 0 15px;
}

.crop-value {
    color: #1afa29;
    font-family: monospace;
}

.crop-unit {
    color: rgba(255, 255, 255, 0.8);
    margin-left: 5px;
}

.price-chart-container {
    background: rgba(9, 44, 88, 0.3);
    border-radius: 8px;
    padding: 15px;
    border: 1px solid rgba(0, 180, 255, 0.2);
}

.price-chart-header {
    margin-bottom: 10px;
}

.price-chart-title {
    color: #00f7ff;
    font-size: 18px;
    text-align: center;
}
</style>