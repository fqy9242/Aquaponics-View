<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const chartRef = ref(null);

onMounted(() => {
    const chart = echarts.init(chartRef.value);
    const option = {
        title: {
            text: '种植产量统计',
            left: 'center',
            textStyle: {
                color: '#333'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['产量'],
            top: '10%',
            textStyle: {
                color: '#333'
            }
        },
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisLine: {
                lineStyle: {
                    color: '#333'
                }
            },
            axisLabel: {
                color: '#333'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#333'
                }
            },
            axisLabel: {
                color: '#333'
            }
        },
        series: [
            {
                name: '产量',
                type: 'bar',
                data: [120, 200, 150, 80, 70, 110, 130, 220, 180, 190, 230, 210],
                itemStyle: {
                    color: '#32b885'
                }
            }
        ]
    };
    chart.setOption(option);
});
</script>

<template>
    <section class="panel-box water-quality-panel">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <svg t="1739709683698" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1510" width="30" height="30">
                <!-- SVG 内容 -->
            </svg>
            <h2 class="panel-title">种植产量</h2>
        </div>
        <div class="data_grid">
            <div ref="chartRef" style="width: 100%; height: 400px;"></div>
        </div>
    </section>
</template>

<style scoped>
.year-rate-text {
    font-family: '黑体';
    color: #32b885;
    font-size: 20px;
}

.year-rate {
    color: white;
}

.el-divider {
    height: 100px;
    border-color: #46a776;
    border-width: 2px;
    filter: blur(2px);
}

.data_grid {
    display: flex;
    flex-direction: column;
    gap: 20px;

    h1 {
        font-size: 1.2em;
        /* 减小字体大小 */
        color: #ffffff;
        margin-bottom: 15px;
    }
}

img {
    width: 30%;
    height: 30%;
    margin-bottom: 20px;
    /* 调整图片底部间距 */
}

h1 {
    font-size: 1.5em;
    color: #ffffff;
    /* 深色标题 */
    margin-bottom: 15px;
}

.overview {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
}

.breed {
    margin-top: -20px;
    /* 调整 breed 和 plant 之间的间距 */
}

.overview-text {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.icon {
    fill: #1afa29;
}

.chart-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    /* 调整图表背景的透明度 */
    z-index: -1;
    /* 将图表置于内容下方 */
}

.mini-chart {
    width: 100%;
    height: 100%;
}

.data-point-label {
    font-size: 0.3rem;
    /* 更小的字体 */
    fill: #ffffff;
    /* 柔和的文本颜色，与 data-value 颜色一致 */
    opacity: 1;
    /* 稍微降低透明度，使其不那么突出 */
    /* text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);  可以添加可选的文字阴影 */
    /* pointer-events: none;  防止文本标签干扰鼠标事件（如果需要） */
}
</style>