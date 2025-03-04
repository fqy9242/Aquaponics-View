<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import guangxiGeoJSON from '@/assets/json/450000.json'
// SVG图标定义
const icons = {
    city: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V21h8v-6.26c1.81-1.27 3-3.36 3-5.74c0-3.87-3.13-7-7-7zm2 15h-4v-4h4v4z"/>`,
    base: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-4h4v4zm0-6H7V7h4v4zm6 6h-4v-4h4v4zm0-6h-4V7h4v4z"/>`,
    fish: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 8l-4.08 1.85c-.62.28-1.31.43-2.02.43H8.5c-1.5 0-2.81-.68-3.71-1.75L2 6.5V15l2.79-2.25c.6-.48 1.34-.75 2.11-.75h5.4c.71 0 1.4.15 2.02.43L20 12v-4z"/>`,
    vegetable: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 10c-.73 0-1.41.2-2 .54V7.5C15.5 6.12 14.38 5 13 5h-2V3h-2v2H7C5.62 5 4.5 6.12 4.5 7.5v5.04c-.59-.34-1.27-.54-2-.54C1.12 12 0 13.12 0 14.5S1.12 17 2.5 17c.73 0 1.41-.2 2-.54v2.04c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5v-5.04c.59.34 1.27.54 2 .54s1.41-.2 2-.54V16c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5c-.73 0-1.41.2-2 .54V9.54c.59-.34 1.27-.54 2-.54c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5z"/>`
}

const mapData = ref(
    Array.from({ length: 15 }, (_, i) => ({
        name: `基地${i + 1}`,
        value: [
            108.3 + Math.random() * 2, // 经度
            22.8 + Math.random(),    // 纬度
            Math.floor(Math.random() * 5 + 1) // 规模等级
        ]
    }))
)

const indicators = ref({
    cities: 5,
    bases: 15,
    fishTypes: 18,
    vegTypes: 19,
    area: '2,000',
    seedlings: '500',
    planting: '8,00',
    waterSave: '9,000',
    fertilizerReduce: '2,000',
    economy: '6,000',
    fishOutput: '900',
    vegOutput: '300'
})

let chartInstance = null

onMounted(() => {
    initMap()
    window.addEventListener('resize', () => chartInstance?.resize())
})

const initMap = () => {
    const chartDom = document.querySelector('.map-container')
    chartInstance = echarts.init(chartDom)

    echarts.registerMap('guangxi', guangxiGeoJSON)

    // 定义城市数据：包含名称、坐标、基地数量与部分基地信息
    const citiesData = [
        { name: '南宁', value: [108.37, 22.82, 3.5], baseCount: 5, info: '基地信息：类型A、类型B' },
        { name: '桂林', value: [110.29, 25.28, 3.5], baseCount: 2, info: '基地信息：类型C、类型D' },
        { name: '柳州', value: [109.43, 24.33, 3.5], baseCount: 3, info: '基地信息：类型E、类型F' },
        { name: '梧州', value: [111.27, 23.47, 3.5], baseCount: 3, info: '基地信息：类型A、类型B' },
        { name: '钦州', value: [109.55, 22.26, 3.5], baseCount: 2, info: '基地信息：类型E、类型F' }
    ]
    
    // 定义城市之间的连接 (顺序连接)
    const connections = [
      { from: citiesData[0].value, to: citiesData[1].value },
      { from: citiesData[1].value, to: citiesData[2].value },
      { from: citiesData[2].value, to: citiesData[3].value },
      { from: citiesData[3].value, to: citiesData[4].value }
    ]

    const option = {
        tooltip: {
            formatter: params => {
                if (params.data && params.data.info) {
                    // 针对城市数据
                    return `<strong>${params.name}</strong><br>
                            基地数量：${params.data.baseCount}<br>
                            ${params.data.info}`
                }
                return `
                <strong>${params.name}</strong><br>
                规模等级：${params.value[2]}级<br>
                经度：${params.value[0].toFixed(2)}<br>
                纬度：${params.value[1].toFixed(2)}
                `
            }
        },
        geo3D: {
            map: 'guangxi',
            shading: 'realistic', 
            environment: '#000',    // 背景颜色 
            realisticMaterial: { 
                roughness: 0.6,
                metalness: 0
            },
            postEffect: { 
                enable: true,
                bloom: { enable: true, intensity: 0.8 }
            },
            viewControl: {
                distance: 120,
                alpha: 40,
                beta: 10,
                autoRotate: true
            },
            label: { // 地图区域名称
                show: true,
                color: '#3244AE',
                fontSize: 16,
                fontWeight: 'bold',
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: 4,
                padding: [3, 5],
            },
            itemStyle: {
                color: '#5ce77f', // 地图板块的颜色
                areaColor: '#66cc66',  
                borderColor: '#339933', // 区域边界的线颜色
                borderWidth: 1, // 区域边界的线宽
                opacity: 1 
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#66cc66'
                }
            },
            regionHeight: 3.5   // 区域厚度
        },
        series: [
            {
                // 更新的城市信息系列
                name: '城市信息',
                type: 'scatter3D',
                coordinateSystem: 'geo3D',
                symbol: 'circle',
                symbolSize: 20,
                itemStyle: {
                    color: 'rgba(255, 215, 0, 0.9)', // 金黄色
                    borderWidth: 2,
                    borderColor: '#fff',
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                },
                label: {
                    show: true,
                    formatter: params => `${params.name}\n基地: ${params.data.baseCount}`,
                    fontSize: 16,
                    color: '#000', // 修改字体颜色为黑色
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: [5, 7],
                    borderRadius: 4,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 5
                },
                emphasis: {
                    scale: true,
                    itemStyle: {
                        borderColor: '#ff0',
                        borderWidth: 3
                    },
                    label: {
                        color: '#000', // 修改 emphasis 下的字体颜色为黑色
                        fontSize: 18
                    }
                },
                data: citiesData
            },
            {
                // 新增连接线系列 - 使用 lines3D
                name: '基地连接',
                type: 'lines3D',
                coordinateSystem: 'geo3D',
                blendMode: 'lighter',
                effect: {
                  show: true,
                  trailWidth: 2,
                  trailLength: 0.3,
                  trailOpacity: 1,
                  constantSpeed: 5
                },
                lineStyle: {
                  width: 2,
                  color: '#ff0',
                  opacity: 0.6,
                  curveness: 0.2
                },
                data: connections.map(item => ({
                  coords: [item.from, item.to]
                }))
              }
        ]
    }

    chartInstance.setOption(option)
}
</script>

<template>
    <div class="panel-box">
        <div class="map-container"></div>

        <!-- 指标看板 -->
        <div class="indicator-board">

            <div class="grid-container">
                <!-- 第一行 -->
                <div class="indicator-card">
                    <div class="icon-wrapper" v-html="icons.city"></div>
                    <div class="content">
                        <div class="label">接入城市</div>
                        <div class="value">{{ indicators.cities }}</div>
                        <div class="unit">个</div>
                    </div>
                </div>

                <div class="indicator-card">
                    <div class="icon-wrapper" v-html="icons.base"></div>
                    <div class="content">
                        <div class="label">基地数量</div>
                        <div class="value">{{ indicators.bases }}</div>
                        <div class="unit">个</div>
                    </div>
                </div>

                <!-- 第二行 -->
                <div class="indicator-card">
                    <div class="icon-wrapper" v-html="icons.fish"></div>
                    <div class="content">
                        <div class="label">鱼类品种</div>
                        <div class="value">{{ indicators.fishTypes }}</div>
                        <div class="unit">种</div>
                    </div>
                </div>

                <div class="indicator-card">
                    <div class="icon-wrapper" v-html="icons.vegetable"></div>
                    <div class="content">
                        <div class="label">蔬菜品种</div>
                        <div class="value">{{ indicators.vegTypes }}</div>
                        <div class="unit">种</div>
                    </div>
                </div>

                <!-- 其他指标项 -->
                <div class="indicator-card">
                    <div class="content">
                        <div class="label">养殖面积</div>
                        <div class="value">{{ indicators.area }}</div>
                        <div class="unit">亩</div>
                    </div>
                </div>

                <div class="indicator-card">
                    <div class="content">
                        <div class="label">育苗总数</div>
                        <div class="value">{{ indicators.seedlings }}</div>
                        <div class="unit">万尾</div>
                    </div>
                </div>

                <div class="indicator-card">
                    <div class="content">
                        <div class="label">种植规模</div>
                        <div class="value">{{ indicators.planting }}</div>
                        <div class="unit">亩</div>
                    </div>
                </div>

                <div class="indicator-card">
                    <div class="content">
                        <div class="label">年度节水量</div>
                        <div class="value">{{ indicators.waterSave }}</div>
                        <div class="unit">立方米</div>
                    </div>
                </div>

                <!-- 经济指标 -->
                <div class="economy-card">
                    <div class="economy-item">
                        <div class="economy-label">鱼预计产值</div>
                        <div class="economy-value">¥ {{ indicators.fishOutput }}万</div>
                    </div>
                    <div class="economy-item">
                        <div class="economy-label">菜预计产值</div>
                        <div class="economy-value">¥ {{ indicators.vegOutput }}万</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel-box {
    height: 1150px;
    position: relative;
    /* background: radial-gradient(circle at 50% 30%, #001529, #000716); */
}

.map-container {
    width: 100%;
    height: 100%;
}

.indicator-board {
    position: absolute;
    top: 30px;
    left: 30px;
    right: 30px;
    pointer-events: none;
}


.title {
    color: #fff;
    font-size: 32px;
    font-weight: 500;
    letter-spacing: 2px;
    margin-bottom: 8px;
}

.subtitle {
    color: #7ab9e6;
    font-size: 16px;
    letter-spacing: 1px;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.indicator-card {
    background: rgba(9, 44, 88, 0.7);
    border: 1px solid rgba(0, 180, 255, 0.2);
    border-radius: 8px;
    padding: 20px;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    min-height: 120px;
    display: flex;
    align-items: center;
}

.indicator-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 180, 255, 0.15);
    background: rgba(16, 72, 128, 0.8);
}

.icon-wrapper {
    width: 48px;
    height: 48px;
    margin-right: 15px;
    color: #00f7ff;
    filter: drop-shadow(0 0 8px rgba(0, 247, 255, 0.6));
}

.content {
    flex: 1;
}

.label {
    color: #89d8ff;
    font-size: 14px;
    margin-bottom: 6px;
}

.value {
    color: #fff;
    font-size: 28px;
    font-family: 'DIN Alternate';
    letter-spacing: 1px;
    background: linear-gradient(90deg, #00f7ff, #00b4ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.unit {
    color: #6a9ebd;
    font-size: 12px;
    margin-top: 4px;
}

.economy-card {
    grid-column: span 4;
    background: rgba(0, 72, 122, 0.6);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    justify-content: space-around;
}

.economy-item {
    text-align: center;
    padding: 15px 30px;
}

.economy-label {
    color: #89d8ff;
    font-size: 16px;
    margin-bottom: 10px;
}

.economy-value {
    color: #00ffd0;
    font-size: 28px;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(0, 255, 208, 0.3);
}
</style>