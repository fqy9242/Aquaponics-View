<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { fertilizationLimit7GraphApi } from '@/apis/agriculture'
// 图表容器引用
const chartRef = ref(null);
let chartInstance = null;
const charData = ref(null)

const getFertilizationLimit7Graph = async () => {
    const res = await fertilizationLimit7GraphApi();
    charData.value = res.data;
    updateChart();
}

// 更新图表数据
const updateChart = () => {
    if (charData.value) {
        const category = charData.value.dateList;
        const lineData = charData.value.planWeightList;
        const barData = charData.value.sumWeightList;
        const rateData = charData.value.finishingRate.map(rate => parseFloat(rate) / 100);

        chartInstance.setOption({
            xAxis: {
                data: category
            },
            series: [
                {
                    name: '达成率',
                    data: rateData
                },
                {
                    name: '施肥总量',
                    data: barData
                },
                {
                    name: '预期总量',
                    data: lineData
                }
            ]
        });
    }
}

// 图表配置
const getOption = () => ({
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.1)',
        axisPointer: {
            type: 'shadow',
            label: {
                show: true,
                backgroundColor: '#6E8B3D'
            }
        },
        textStyle: {
            color: '#fff'
        }
    },
    legend: {
        data: ['施肥总量', '预期总量', '达成率'],
        textStyle: {
            color: '#fff'
        },
        top: '7%',
    },
    grid: {
        x: '12%',
        width: '82%',
        y: '12%',
    },
    xAxis: {
        data: [],
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            rotate: 45
        },
        axisTick: {
            show: false,
        },
    },
    yAxis: [
        {
            splitLine: { show: false },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            axisLabel: {
                formatter: '{value} '
            }
        },
        {
            splitLine: { show: false },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }
            },
            axisLabel: {
                formatter: '{value} '
            }
        }
    ],
    series: [
        {
            name: '达成率',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset: 0, color: '#00F2C3' }, // 修改为绿色渐变
                        { offset: 1, color: '#00B4A3' }  // 修改为绿色渐变
                    ]
                )
            },
            data: []
        },
        {
            name: '施肥总量',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                borderRadius: 5,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset: 0, color: '#55FF00' }, // 修改为绿色渐变
                        { offset: 1, color: '#008000' }  // 修改为绿色渐变
                    ]
                )
            },
            data: []
        },
        {
            name: '预期总量',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
                borderRadius: 5,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset: 0, color: 'rgba(192, 255, 192, 0.3)' }, // 修改为浅绿色渐变并增加透明度
                        { offset: 1, color: 'rgba(128, 192, 128, 0.3)' }  // 修改为浅绿色渐变并增加透明度
                    ]
                )
            },
            z: -12,
            data: []
        }
    ]
});

// 初始化图表
onMounted(() => {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(getOption());
    getFertilizationLimit7Graph();
    // 窗口大小变化时自适应
    window.addEventListener('resize', handleResize);
});

// 销毁图表
onUnmounted(() => {
    if (chartInstance) {
        chartInstance.dispose();
        window.removeEventListener('resize', handleResize);
    }
});

// 处理窗口缩放
const handleResize = () => {
    chartInstance?.resize();
};
</script>

<template>
    <div class="panel-box water-quality-panel">
        <div class="panel-title">
            <svg t="1740453248056" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="6607" width="30" height="30">
                <path
                    d="M768 543.904h-32a32 32 0 0 1 0-64h32a32 32 0 0 1 0 64zM768 672h-32a32 32 0 0 1 0-64.032h32a32 32 0 0 1 0 64zM768 800h-96a32 32 0 0 1 0-64h96a32 32 0 0 1 0 64z m-224 0h-32a32 32 0 0 1 0-64h32a32 32 0 0 1 0 64z m-224 0H256a32 32 0 0 1 0-64h64a32 32 0 0 1 0 64z m107.2-101.472a54.72 54.72 0 0 1-38.72-16l-148.16-148.224a55.04 55.04 0 0 1 0-78.08l216-216.096a55.36 55.36 0 0 1 78.08 0l148.16 148.192a32 32 0 0 1-45.12 45.12l-142.08-142.08-203.52 203.584 135.68 135.712 86.72-89.632H416a32 32 0 0 1 0-64h173.44a32 32 0 0 1 23.04 54.4l-145.6 150.784a56 56 0 0 1-39.68 16.32z"
                    fill="#1afa29" p-id="6608"></path>
            </svg>
            近七天施肥情况
        </div>
        <div ref="chartRef" class="chart-container"></div>
    </div>
</template>

<style scoped>
.chart-container {
    width: 100%;
    height: 400px;
}
</style>