<script setup>
/**
 * @description: 农业右侧第三个面板
 * @author: qht
 * @date: 2025-2-20
 */
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from "echarts"
import 'echarts-wordcloud'
import { getWordCloudApi } from '@/apis/overView'

const chart = ref(null)
const wordCloudData = ref([])
// TODO 修复无法随机颜色的Bug 25-2-20

// 颜色配置修复点：明确定义6种颜色
const colorPalette = [
    '#5B8C00', // 绿
    '#F56C6C', // 红
    '#E6A23C', // 橙
    '#409EFF', // 蓝
    '#67C23A', // 浅绿
    '#909399'  // 灰
]

const getWordCloud = async () => {
    const res = await getWordCloudApi()
    wordCloudData.value = res.data.map(item => ({
        name: item.name,
        value: item.count
    }))
}

onMounted(async () => {
    await getWordCloud()
    const container = document.getElementById('container')
    chart.value = echarts.init(container)
    const option = {
        title: {
            left: 'center'
        },
        tooltip: {},
        series: [{
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: 'circle',
            width: '100%',
            height: '100%',
            drawOutOfBound: false,
            textStyle: {
                normal: {
                    color: colorPalette[Math.floor(Math.random() * colorPalette.length)]

                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: wordCloudData.value
        }]
    }

    chart.value.setOption(option)
})

onUnmounted(() => {
    if (chart.value) {
        chart.value.dispose()
    }
})
</script>

<template>
    <div class="panel-box water-quality-panel">
        <div class="panel-header">
            <svg t="1740043777413" class="icon" viewBox="0 0 1088 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="17596" width="30" height="30">
                <path
                    d="M512.512 189.952l13.12 0.32A280.64 280.64 0 0 1 787.84 417.28a210.048 210.048 0 0 1-36.992 416.832H274.304a210.048 210.048 0 0 1-36.992-416.832A280.704 280.704 0 0 1 499.2 190.336l13.312-0.384z m0.064 56.064l-12.288 0.32a224.704 224.704 0 0 0-208 181.504l-7.232 37.632-37.76 6.848a154.048 154.048 0 0 0 27.136 305.664h476.416a154.048 154.048 0 0 0 27.008-305.664l-37.76-6.848-7.296-37.632a224.64 224.64 0 0 0-220.16-181.824z m56 363.968v56h-224v-56h224z m112-112v56h-336v-56h336z"
                    fill="#1afa29" p-id="17597"></path>
            </svg>
            <div class="panel-title">种植/养殖词云</div>
        </div>
        <div id="container" class="wordcloud"></div>
    </div>
</template>

<style scoped>
.wordcloud {
    width: 100%;
    height: 305px;
}

.panel-header {
    display: flex;
    align-items: center;
}

.panel-title {
    margin-left: 10px;
}
</style>