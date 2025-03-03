<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';

onMounted(() => {
    const chartDom = document.getElementById('charts');
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            // text: '折线图示例'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }
        ]
    };
    myChart.setOption(option);
});
</script>

<template>
    <div class="panel-box water-quality-panel">
        <div class="panel-title">种植/养殖词云</div>
        <div id="charts" style="width: 600px; height: 320px;"></div>
    </div>
</template>

<style scoped>

</style>