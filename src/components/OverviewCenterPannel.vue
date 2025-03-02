<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import geoData from '@/assets/json/450000.json';

// 地图数据
const mapData = ref({
    bases: [
        { name: '南宁养殖基地', coord: [108.36, 22.82], data: { ph: 7.2, temp: 26, output: 650 } },
        { name: '桂林种植园', coord: [110.28, 25.29], data: { ph: 6.9, temp: 24, output: 920 } },
        { name: '北海育苗中心', coord: [109.12, 21.49], data: { ph: 7.1, temp: 27, output: 380 } }
    ],
    flowPaths: [
        { coords: [[108.36, 22.82], [110.28, 25.29]], effect: { color: '#00ff88', speed: 0.2 } },
        { coords: [[110.28, 25.29], [109.12, 21.49]], effect: { color: '#00e5ff', speed: 0.3 } },
        { coords: [[109.12, 21.49], [111.27, 23.48]], effect: { color: '#00e5ff', speed: 0.3 } },
        { coords: [[111.27, 23.48], [110.28, 25.29]], effect: { color: '#00e5ff', speed: 0.3 } },
        { coords: [[109.33, 22.16], [108.36, 22.82]], effect: { color: '#00e5ff', speed: 0.3 } },
    ],
    buildings: [
        { coord: [108.42, 22.75], type: 'control', name: '智能控制中心' },
        { coord: [109.3, 21.55], type: 'lab', name: '水质实验室' }
    ]
});

// 城市基地数据
const cityBaseCounts = ref([
    { name: '南宁市', coord: [108.36, 22.82], count: 5 },
    { name: '桂林市', coord: [110.28, 25.29], count: 3 },
    { name: '北海市', coord: [109.12, 21.49], count: 2 },
    { name: '柳州市', coord: [109.4, 24.33], count: 1 },
    { name: '梧州市', coord: [111.27, 23.48], count: 2 },
    { name: '钦州市', coord: [109.33, 22.16], count: 2 }
]);

// 指标数据
const indicators = ref({
    totalOutput: 1950,
    energyUsage: 0.76,
    ecoIndex: 94
});

// 鼠标跟随处理
const handleCardHover = (event) => {
    const cards = document.querySelectorAll('.indicator-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
};

// 图表初始化
onMounted(() => {
    const chart = echarts.init(document.getElementById('gx-map'));
    echarts.registerMap('GuangXi', geoData);

    const option = {
        geo: {
            map: 'GuangXi',
            roam: false,
            zoom: 1.3,
            center: [108.5, 23.5],
            label: {
                show: true,
                color: '#89f8ff',
                fontSize: 12
            },
            itemStyle: {
                areaColor: '#082845',
                borderColor: '#00688B',
                borderWidth: 1.2
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#113366',
                    borderColor: '#00e5ff'
                },
                label: {
                    show: true,
                    color: '#fff'
                }
            }
        },
        series: [
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbol: 'circle',
                rippleEffect: {
                    scale: 6,
                    brushType: 'stroke',
                    period: 3
                },
                symbolSize: val => Math.sqrt(val[2]) * 12,
                itemStyle: {
                    color: {
                        type: 'radial',
                        r: 0.8,
                        colorStops: [
                            { offset: 0, color: '#00FF8877' },
                            { offset: 1, color: '#00E5FF' }
                        ]
                    }
                },
                label: {
                    show: true,
                    formatter: params => `${params.name}\n${params.value[2]}个基地`,
                    position: 'top',
                    color: '#00FF88',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textShadowBlur: 10,
                    textShadowColor: 'rgba(0,229,255,0.8)'
                },
                data: cityBaseCounts.value.map(c => ({
                    name: c.name,
                    value: [...c.coord, c.count]
                }))
            },
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: [45, 60],
                itemStyle: {
                    color: ({ data }) => data.data.ph > 7 ? '#00ff88' : '#ffd700'
                },
                data: mapData.value.bases.map(item => ({
                    ...item,
                    symbol: `image://${getSymbol(item.name)}`
                })),
                label: {
                    show: true,
                    formatter: '{b}',
                    color: '#fff',
                    fontSize: 14,
                    offset: [0, 20]
                }
            },
            {
                type: 'lines',
                coordinateSystem: 'geo',
                polyline: true,
                effect: {
                    show: true,
                    period: 4,
                    trailLength: 0.7,
                    symbol: 'arrow',
                    symbolSize: 10,
                    color: ({ data }) => data.effect.color
                },
                lineStyle: {
                    color: ({ data }) => data.effect.color,
                    width: 2,
                    type: 'dashed',
                    curveness: 0.2
                },
                data: mapData.value.flowPaths
            },
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'path://M0 0 L20 0 L20 30 L0 30 Z',
                symbolSize: [25, 30],
                itemStyle: {
                    color: ({ data }) => data.type === 'control' ? '#00e5ff' : '#ffd700',
                    opacity: 0.9
                },
                data: mapData.value.buildings,
                label: {
                    show: true,
                    formatter: '{b}',
                    color: '#fff',
                    fontSize: 12,
                    offset: [0, 15]
                }
            }
        ],
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(8,25,45,0.9)',
            borderColor: '#00e5ff',
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
            formatter: params => {
                if (params.seriesType === 'scatter') {
                    const data = params.data;
                    return `
                        <div class="map-tooltip">
                            <h3>${data.name}</h3>
                            ${data.data ? `
                                <p>PH值：<span class="value">${data.data.ph}</span></p>
                                <p>水温：<span class="value">${data.data.temp}°C</span></p>
                                <p>产量：<span class="value">${data.data.output}吨</span></p>
                            ` : `<p>类型：${data.type === 'control' ? '控制中心' : '实验室'}</p>`}
                        </div>`;
                }
                if (params.seriesType === 'effectScatter') {
                    return `
                        <div class="city-tooltip">
                            <h3>${params.name}</h3>
                            <p>基地总数：<span class="value">${params.value[2]}个</span></p>
                            <p>管辖区域：${params.name}</p>
                        </div>`;
                }
            }
        }
    };

    chart.setOption(option);

    // 数据更新定时器
    setInterval(() => {
        mapData.value.bases.forEach(base => {
            base.data.ph = Math.max(6, Math.min(8, base.data.ph + (Math.random() - 0.5) * 0.1));
        });
        chart.setOption({
            series: [{
                data: mapData.value.bases.map(item => ({
                    ...item,
                    symbol: `image://${getSymbol(item.name)}`
                }))
            }]
        });
    }, 3000);
});

// 获取图标路径
function getSymbol(name) {
    const icons = {
        '南宁养殖基地': '/fish-icon.png',
        '桂林种植园': '/plant-icon.png',
        '北海育苗中心': '/seedling-icon.png'
    };
    return icons[name] || '/default-icon.png';
}
</script>

<template>
    <div class="panel-box">
        <!-- 顶栏 -->
        <div class="header">
            <div class="cyber-border"></div>
            <div class="title-container">
                <div class="title-group">
                    <h1 class="main-title">
                        <span class="gradient-text">鱼菜共生</span>
                        <span class="glow-text">智能监控平台</span>
                    </h1>
                    <div class="decorative-line"></div>
                </div>

                <!-- 指标卡片 -->
                <div class="indicators-container">
                    <div v-for="(value, key) in indicators" :key="key" class="indicator-card"
                        @mousemove="handleCardHover">
                        <div class="card-bg"></div>
                        <div class="card-content">
                            <div class="icon-wrapper">
                                <div class="dynamic-icon" :class="key"></div>
                            </div>
                            <div class="data-display">
                                <span class="value">{{ value }}</span>
                                <span class="label">{{
                                    {
                                        totalOutput: '总产量',
                                        energyUsage: '单位能耗',
                                        ecoIndex: '生态指数'
                                    }[key]
                                }}</span>
                            </div>
                            <div class="unit">{{
                                key === 'totalOutput' ? '吨' :
                                    key === 'energyUsage' ? 'kW·h/kg' : '指数'
                            }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 地图容器 -->
        <div id="gx-map" style="height: 1000px;"></div>

        <!-- 时间显示 -->
        <!-- <div class="time-control">
            <span class="time-label">数据时间：{{ new Date().toLocaleString() }}</span>
        </div> -->
    </div>
</template>

<style scoped>
.panel-box {
    height: 1160px;
    /* background:
        radial-gradient(ellipse at 50% 100%, rgba(0, 229, 255, 0.05) 0%, transparent 70%),
        linear-gradient(15deg, #00090F 0%, #00111C 100%); */
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 60px rgba(0, 229, 255, 0.1);
}

.header {
    position: relative;
    padding: 18px 40px 25px;
    background: rgba(8, 40, 80, 0.25);
    backdrop-filter: blur(12px);
    border-radius: 8px 8px 0 0;
    box-shadow:
        0 4px 30px rgba(0, 229, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(0, 229, 255, 0.15);
    overflow: hidden;
    z-index: 2;
}

.cyber-border {
    position: absolute;
    inset: 0;
    background:
        repeating-linear-gradient(-45deg,
            transparent,
            transparent 1px,
            rgba(0, 229, 255, 0.1) 2px,
            rgba(0, 229, 255, 0.1) 3px),
        linear-gradient(180deg,
            rgba(0, 229, 255, 0.05) 0%,
            transparent 15%,
            transparent 85%,
            rgba(0, 229, 255, 0.05) 100%);
    mask:
        linear-gradient(black, black) content-box,
        linear-gradient(black, black);
    mask-composite: exclude;
    padding: 1px;
    pointer-events: none;
}

.title-group {
    text-align: center;
    margin-bottom: 30px;
    position: relative;
}

.gradient-text {
    background: linear-gradient(135deg, #00e5ff 30%, #00ff88 70%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 34px;
    font-weight: 800;
    letter-spacing: 3px;
    text-shadow:
        0 0 25px rgba(0, 229, 255, 0.3),
        0 4px 12px rgba(0, 0, 0, 0.2);
    display: inline-block;
    padding: 0 15px;
}

.glow-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 28px;
    font-weight: 300;
    position: relative;
    display: inline-block;
    margin-left: 15px;
    padding: 0 15px;

    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 2px;
        background: linear-gradient(90deg,
                transparent,
                rgba(0, 229, 255, 0.8) 50%,
                transparent);
        filter: drop-shadow(0 0 5px rgba(0, 229, 255, 0.5));
    }
}

.decorative-line {
    height: 3px;
    background: linear-gradient(90deg,
            transparent 10%,
            rgba(0, 229, 255, 0.6) 50%,
            transparent 90%);
    margin: 15px auto;
    width: 400px;
    animation: lineFlow 8s infinite linear;
    border-radius: 2px;
}

@keyframes lineFlow {
    0% {
        opacity: 0.5;
        background-position: -400px 0;
    }

    100% {
        opacity: 1;
        background-position: 400px 0;
    }
}

.indicators-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto;
}

.indicator-card {
    position: relative;
    background: rgba(8, 40, 80, 0.3);
    border-radius: 12px;
    padding: 1.5px;
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 12px;
        padding: 1.5px;
        background: linear-gradient(135deg,
                rgba(0, 229, 255, 0.4) 0%,
                transparent 40%,
                transparent 60%,
                rgba(0, 255, 136, 0.4) 100%);
        -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
        mask-composite: exclude;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 229, 255, 0.15);

        .card-bg {
            opacity: 0.6;
        }
    }
}

.card-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(200px circle at var(--x) var(--y),
            rgba(0, 229, 255, 0.15),
            transparent 60%);
    opacity: 0.3;
    transition: opacity 0.3s;
    pointer-events: none;
}

.card-content {
    position: relative;
    padding: 20px;
    display: flex;
    align-items: center;
    background: rgba(8, 25, 45, 0.6);
    border-radius: 12px;
    backdrop-filter: blur(5px);
}

.icon-wrapper {
    width: 56px;
    height: 56px;
    margin-right: 18px;
    background: rgba(0, 40, 80, 0.5);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 10px;
        border: 1px solid rgba(0, 229, 255, 0.2);
        pointer-events: none;
    }
}

.dynamic-icon {
    width: 32px;
    height: 32px;
    filter: drop-shadow(0 0 8px currentColor);

    &.totalOutput {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%2300ff88" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12 6 2.12v4.78zM12 15c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z"/></svg>');
        color: #00ff88;
    }

    &.energyUsage {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%2300e5ff" d="M11 20v-3H7v5h10v-5h-4.5l2.52-2.51c.33.06.66.11 1.01.11 1.66 0 3.15-.83 4.05-2.1 1.22-1.73 1.03-4.08-.5-5.57-1.11-1.08-2.7-1.47-4.16-1.17L13 2h-2v5h2V7.5l3.5 1.5-3.03 3.03c.45.88.21 1.96-.65 2.54l-6 4.27c-.39.28-.92.25-1.27-.08-.31-.29-.45-.72-.38-1.14L9 15.6l-4.3-1.86c-.58-.25-.97-.8-1-1.44-.03-.64.3-1.23.85-1.53l6-3.67.79.42c.87.46 1.91.25 2.53-.49.62-.74.57-1.8-.11-2.48l-.36-.35 2.25-2.26c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-2.12 2.12-1.27-1.27c-.47-.47-1.25-.47-1.72 0l-5.66 5.66c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0l1.27-1.27 2.12 2.12c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-2.12-2.12 1.27-1.27c.47-.47 1.25-.47 1.72 0l1.27 1.27 2.12-2.12c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-2.12 2.12-1.27-1.27c-.47-.47-1.25-.47-1.72 0l-3.54 3.54c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0l1.27-1.27 2.12 2.12c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-2.12-2.12 1.27-1.27c.47-.47 1.25-.47 1.72 0l1.27 1.27 2.12-2.12c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-2.12 2.12-1.27-1.27c-.47-.47-1.25-.47 1.72 0z"/></svg>');
        color: #00e5ff;
    }

    &.ecoIndex {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%233cb371" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12 6 2.12v4.78zM12 15c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z"/></svg>');
        color: #3cb371;
    }
}

.data-display {
    flex: 1;

    .value {
        display: block;
        color: #fff;
        font-size: 32px;
        font-family: 'DS-Digital', sans-serif;
        letter-spacing: 3px;
        text-shadow:
            0 0 12px currentColor,
            0 2px 4px rgba(0, 0, 0, 0.2);
        line-height: 1;
        margin-bottom: 4px;
    }

    .label {
        color: rgba(137, 248, 255, 0.9);
        font-size: 14px;
        letter-spacing: 1px;
    }
}

.unit {
    align-self: flex-end;
    color: rgba(137, 248, 255, 0.6);
    font-size: 12px;
    margin-left: 8px;
    position: relative;
    top: -3px;
}

#gx-map {
    width: 100%;
    height: 1000px;
}

/* .time-control {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 40, 80, 0.8);
    padding: 8px 25px;
    border-radius: 20px;
    color: #00e5ff;
    font-size: 14px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(0, 229, 255, 0.2);
} */

/* 工具提示样式 */
:deep(.map-tooltip) {
    h3 {
        color: #00ff88 !important;
        margin-bottom: 8px;
    }

    .value {
        color: #00e5ff !important;
        font-weight: bold;
    }
}

:deep(.city-tooltip) {
    background: linear-gradient(145deg, #00161f, #000d15) !important;
    border: 1px solid #00e5ff !important;
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.3) !important;

    h3 {
        color: #00ff88 !important;
        border-bottom: 1px solid rgba(0, 229, 255, 0.3) !important;
    }

    .value {
        color: #00e5ff !important;
    }
}
</style>