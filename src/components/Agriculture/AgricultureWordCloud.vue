<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from "echarts"
import 'echarts-wordcloud'
import { getWordCloudApi } from '@/apis/overView'

const chart = ref(null)
const wordCloudData = ref([])

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
                    color: () => `rgb(${Math.round(Math.random() * 160)}, ${Math.round(Math.random() * 160)}, ${Math.round(Math.random() * 160)})`
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