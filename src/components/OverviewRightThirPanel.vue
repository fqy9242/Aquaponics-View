<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);

onMounted(() => {
    const chart = echarts.init(chartRef.value, 'dark');
    const option = {
        title: {
            text: '碳汇效益分析',
            left: 'center',
            textStyle: {
                color: '#B6F7C1',
                fontSize: 18,
                fontWeight: 'bolder',
                fontFamily: 'Microsoft YaHei',
                textShadow: '0 2px 4px rgba(58,175,169,0.8)'
            },
            subtext: '单位：万吨/年',
            subtextStyle: {
                color: '#8CD3D0',
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(58,175,169,0.12)'
                }
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#3AAFA9',
            borderWidth: 1,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        legend: {
            data: ['节水', '节肥', '碳减排'],
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: '#B6F7C1',
                fontSize: 12,
                padding: [2, 0, 0, 0]
            },
            top: 50,
            itemGap: 20
        },
        grid: {
            left: '10%',
            right: '8%',
            bottom: '15%',
            top: '30%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['累计节水', '累计节肥', '碳减排'],
            axisLabel: {
                color: '#8CD3D0',
                fontSize: 14,
                interval: 0
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(58,175,169,0.6)',
                    width: 2
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#8CD3D0',
                fontSize: 12
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(58,175,169,0.15)',
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '节水',
                type: 'bar',
                data: [90, 0, 0],
                barWidth: 40,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#3AAFA9' },
                        { offset: 1, color: '#2B7A78' }
                    ]),
                    borderRadius: [6, 6, 0, 0],
                    shadowColor: 'rgba(58,175,169,0.5)',
                    shadowBlur: 8
                },
                emphasis: {
                    itemStyle: {
                        shadowColor: 'rgba(58,175,169,0.8)',
                        shadowBlur: 12
                    }
                }
            },
            {
                name: '节肥',
                type: 'bar',
                data: [0, 100, 0],
                barWidth: 40,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#5AE27C' },
                        { offset: 1, color: '#2E8540' }
                    ]),
                    borderRadius: [6, 6, 0, 0],
                    shadowColor: 'rgba(90,226,124,0.5)',
                    shadowBlur: 8
                },
                emphasis: {
                    itemStyle: {
                        shadowColor: 'rgba(90,226,124,0.8)',
                        shadowBlur: 12
                    }
                }
            },
            {
                name: '碳减排',
                type: 'bar',
                data: [0, 0, 50],
                barWidth: 40,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#FFD700' },
                        { offset: 1, color: '#FFA500' }
                    ]),
                    borderRadius: [6, 6, 0, 0],
                    shadowColor: 'rgba(255,215,0,0.5)',
                    shadowBlur: 8
                },
                emphasis: {
                    itemStyle: {
                        shadowColor: 'rgba(255,215,0,0.8)',
                        shadowBlur: 12
                    }
                }
            }
        ],
        backgroundColor: 'rgba(8,23,38,0.9)',
        animationDuration: 1500,
        animationEasing: 'cubicOut'
    };
    chart.setOption(option);

    // // 增加自适应逻辑
    // const resizeHandler = () => {
    //     chart.resize({
    //         width: chartRef.value.clientWidth,
    //         height: chartRef.value.clientHeight
    //     });
    // };
    // window.addEventListener('resize', resizeHandler);
});
</script>

<template>
    <div class="panel-box">
        <div ref="chartRef" class="chart"></div>
    </div>
</template>

<style scoped>
.panel-box {
    height: 310px;
    background: linear-gradient(145deg, rgba(8, 23, 38, 0.9) 0%, rgba(18, 44, 67, 0.9) 100%);
    border: 1px solid rgba(58, 175, 169, 0.3);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    position: relative;
}

.chart {
    width: 100%;
    height: 100%;
}

/* 增加流光边框效果 */
.panel-box::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg,
            rgba(58, 175, 169, 0) 30%,
            rgba(58, 175, 169, 0.6) 50%,
            rgba(58, 175, 169, 0) 70%);
    animation: shine 4s infinite;
    z-index: -1;
}

@keyframes shine {
    0% {
        transform: translateX(-150%) skew(-25deg);
    }

    100% {
        transform: translateX(150%) skew(-25deg);
    }
}
</style>