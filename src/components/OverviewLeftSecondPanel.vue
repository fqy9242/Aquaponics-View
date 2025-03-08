<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
// 固定数据
const vegetableYieldForecast = ref([72, 85, 88, 71, 63, 112, 98, 147, 158, 162])
const fishYieldForecast = ref([37, 30, 31, 42, 47, 33, 36, 51, 54, 65])

// 图表实例和监听器引用
let myChart = null
let resizeListener = null

// 图表初始化函数
const initYieldChart = () => {
    const chartDom = document.getElementById('yieldChart')

    // 清理已有实例
    if (myChart) {
        myChart.dispose()
        myChart = null
    }

    // 初始化echarts实例
    myChart = echarts.init(chartDom)

    // 深色主题配色方案
    const colorPalette = [
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#36D1DC' },
            { offset: 1, color: '#5B86E5' }
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#F09819' },
            { offset: 1, color: '#EDDE5D' }
        ])
    ]

    // 完整配置项
    const chartOption = {
        backgroundColor: '#1a1f2c',
        title: {
            show: false
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(30, 41, 59, 0.98)',
            borderColor: '#475569',
            borderWidth: 1,
            padding: [12, 16],
            textStyle: {
                color: '#f1f5f9',
                fontSize: 13
            },
            formatter: (params) => {
                return `
          <div style="margin-bottom:8px;font-weight:600;color:#e2e8f0">${params[0].axisValue}</div>
          ${params.map(item => `
            <div style="display:flex;align-items:center;margin:6px 0">
              <span style="
                display:inline-block;
                width:10px;
                height:10px;
                border-radius:2px;
                background:${item.color};
                margin-right:10px
              "></span>
              <span style="flex:1;color:#cbd5e1">${item.seriesName}</span>
              <span style="font-weight:600;color:#f8fafc">${item.value} 吨</span>
            </div>
          `).join('')}`
            }
        },
        legend: {
            top: 24,
            icon: 'rect',
            itemWidth: 16,
            itemHeight: 8,
            itemGap: 20,
            textStyle: {
                color: '#cbd5e1',
                fontSize: 13,
                fontWeight: 500
            }
        },
        grid: {
            top: 72,
            left: 44,
            right: 36,
            bottom: 36,
            containLabel: false
        },
        xAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#94a3b8',
                fontSize: 12,
                margin: 12
            },
            data: ['3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
            type: 'value',
            nameTextStyle: {
                color: '#94a3b8',
                fontSize: 12,
                padding: [0, 0, 8, -40]
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#94a3b8',
                fontSize: 12,
                margin: 8
            },
            splitLine: {
                lineStyle: {
                    color: '#475569',
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '蔬菜收成预测',
                type: 'bar',
                barWidth: 24,
                itemStyle: {
                    borderRadius: [6, 6, 0, 0],
                    color: colorPalette[0]
                },
                label: {
                    show: true,
                    position: 'top',
                    color: '#f8fafc',
                    fontSize: 12,
                    fontWeight: 500,
                    formatter: '{c} 吨'
                },
                data: vegetableYieldForecast.value
            },
            {
                name: '鱼收成预测',
                type: 'bar',
                barWidth: 24,
                itemStyle: {
                    borderRadius: [6, 6, 0, 0],
                    color: colorPalette[1]
                },
                label: {
                    show: true,
                    position: 'top',
                    color: '#f8fafc',
                    fontSize: 12,
                    fontWeight: 500,
                    formatter: '{c} 吨'
                },
                data: fishYieldForecast.value
            }
        ],
        animationDuration: 1200,
        animationEasing: 'cubicOut'
    }

    // 应用配置
    myChart.setOption(chartOption)

    // 响应式处理
    resizeListener = () => myChart.resize()
    window.addEventListener('resize', resizeListener)
}

// 生命周期钩子
onMounted(() => {
    initYieldChart()
})

onBeforeUnmount(() => {
    if (myChart) {
        myChart.dispose()
        myChart = null
    }
    if (resizeListener) {
        window.removeEventListener('resize', resizeListener)
    }
})
</script>

<template>
    <div class="panel-box">
        <div class="chart-header">
            <div class="title-container">
                <h1 class="dynamic-title">
                    <span class="title-text">
                        <svg t="1740803065411" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="11299" width="50" height="50">
                            <path
                                d="M192 672c19.2 0 32 12.8 32 32v128c0 19.2-12.8 32-32 32s-32-12.8-32-32v-128c0-19.2 12.8-32 32-32zM416 480c19.2 0 32 12.8 32 32v320c0 19.2-12.8 32-32 32s-32-12.8-32-32V512c0-19.2 12.8-32 32-32zM608 608c19.2 0 32 12.8 32 32v192c0 19.2-12.8 32-32 32s-32-12.8-32-32v-192c0-19.2 12.8-32 32-32zM832 448c19.2 0 32 12.8 32 32v352c0 19.2-12.8 32-32 32s-32-12.8-32-32V480c0-19.2 12.8-32 32-32z"
                                fill="#597EF7" p-id="11300"></path>
                            <path
                                d="M419.2 323.2l-246.4 246.4c-12.8 12.8-32 12.8-44.8 0-12.8-12.8-12.8-32 0-44.8l291.2-291.2 192 192 217.6-217.6c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8l-262.4 262.4-192-192z"
                                fill="#50E3C2" p-id="11301"></path>
                        </svg>
                        <span>鱼菜收成预测</span>
                    </span>
                    <span class="unit-tag">单位：吨（公制）</span>
                </h1>
                <div class="title-underline"></div>
            </div>
        </div>
        <div id="yieldChart" class="chart-wrapper" style="width: 100%; height: 520px;"></div>
    </div>
</template>

<style scoped>
/* 容器样式 */
.panel-box {
    background: linear-gradient(152deg,
            #1a1f2c 0%,
            #2d3547 100%);
    border-radius: 16px;
    /* padding: 32px; */
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.4),
        0 10px 15px -3px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.panel-box:hover {
    transform: translateY(-3px);
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.5),
        0 20px 25px -5px rgba(0, 0, 0, 0.25);
}

.chart-header {
    margin-bottom: 16px;
    position: relative;
    /* padding-left: 52px; */
}

.title-container {
    position: relative;
    z-index: 1;
}

/* 动态标题 */
.dynamic-title {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin: 0;
    font-family: 'Segoe UI', system-ui, sans-serif;
}

.title-text {
    font-size: 2rem;
    background: linear-gradient(135deg,
            #5B86E5 25%,
            #36D1DC 75%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: -0.8px;
    text-shadow:
        0 2px 4px rgba(91, 134, 229, 0.2),
        0 4px 8px rgba(54, 209, 220, 0.15);
    position: relative;
    padding-right: 16px;
}

/* 单位标签 */
.unit-tag {
    font-size: 0.95rem;
    color: #94a3b8;
    font-weight: 400;
    padding: 6px 12px;
    border-radius: 8px;
    background: rgba(148, 163, 184, 0.1);
    border: 1px solid rgba(148, 163, 184, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.unit-tag:hover {
    background: rgba(148, 163, 184, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(148, 163, 184, 0.1);
}

/* 标题下划线 */
.title-underline {
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 120px;
    height: 2px;
    background: linear-gradient(90deg,
            rgba(91, 134, 229, 0.8) 0%,
            rgba(54, 209, 220, 0) 90%);
    opacity: 0.6;
    transition: width 0.3s ease;
}

.dynamic-title:hover~.title-underline {
    width: 140px;
}

/* 图表容器 */
.chart-wrapper {
    background: rgba(30, 41, 59, 0.6);
    border-radius: 12px;
    padding: 1px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
        inset 0 2px 4px rgba(0, 0, 0, 0.2),
        inset 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 动画效果 */
@keyframes lineGlow {
    from {
        opacity: 0.8;
        box-shadow:
            0 0 8px rgba(91, 134, 229, 0.4),
            0 0 12px rgba(54, 209, 220, 0.3);
    }

    to {
        opacity: 1;
        box-shadow:
            0 0 12px rgba(91, 134, 229, 0.6),
            0 0 16px rgba(54, 209, 220, 0.4);
    }
}
</style>