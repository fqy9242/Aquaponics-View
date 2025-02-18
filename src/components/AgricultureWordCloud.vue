<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from "echarts"
import 'echarts-wordcloud'
// TODO 后面把词云换成真实的数据
const chart = ref(null)

onMounted(() => {
    const container = document.getElementById('container')
    chart.value = echarts.init(container)

    const option = {
        title: {
            // text: '种植/养殖词云',
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
                    color: () => `rgb(${Math.round(Math.random() * 160)}, ${Math.round(Math.random() * 160)}, ${Math.round(Math.random() * 160)})`
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: [
                { name: '鱼', value: 10000 },
                { name: '水', value: 6181 },
                { name: '植物', value: 4386 },
                { name: '养殖', value: 4055 },
                { name: '种植', value: 2467 },
                { name: '生态', value: 2244 },
                { name: '系统', value: 1898 },
                { name: '水质', value: 1484 },
                { name: '循环', value: 1112 },
                { name: '有机', value: 965 }
            ]
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
        <div class="panel-title">种植/养殖词云</div>
        <div id="container" class="wordcloud"></div>
    </div>
</template>

<style scoped>
.wordcloud {
    width: 100%;
    height: 150px;
}
</style>