<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
import { getPlantingTaskOverviewApi } from '@/apis/agriculture';

const plantingTaskOverviewData = ref({});

const getPlantingTaskOverviewData = async () => {
    const res = await getPlantingTaskOverviewApi("-1");
    plantingTaskOverviewData.value = res.data;
};

const createChart = (id, title, value) => {
    const chartDom = document.getElementById(id);
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: title,
            left: 'center',
            bottom: '0%', // 将标题放在图表下面
            textStyle: {
                color: '#FFFFFF',
                fontSize: 14
            }
        },
        series: [{
            type: 'gauge',
            pointer: {
                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z'
            },
            progress: { show: true },
            detail: {
                formatter: '{value}%',
                fontSize: 12,
                color: '#FFFFFF', // 设置标签颜色为白色
                offsetCenter: [0, '70%'] // 将标签放在图表下面
            },
            data: [{ value }],
            axisLine: {
                lineStyle: {
                    color: [
                        [0.2, '#FF0000'],
                        [0.4, '#FF7F00'],
                        [0.6, '#FFFF00'],
                        [0.8, '#00FF00'],
                        [1, '#0000FF']
                    ],
                    borderRadius: 10,
                    width: 10
                }
            },
        }]
    };
    myChart.setOption(option);
};

onMounted(() => {
    getPlantingTaskOverviewData().then(() => {
        const data = plantingTaskOverviewData.value;
        createChart('non-distribute-chart', '未分配', data.nonDistributeRatio);
        createChart('distributed-chart', '已分配', data.distributedRatio);
        createChart('acting-chart', '进行中', data.actingRatio);
        createChart('finish-chart', '已完成', data.finishRatio);
    });
});
</script>

<template>
    <div class="panel-box water-quality-panel">
        <div class="header-container">
            <svg t="1740017435006" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="13088" width="30" height="30">
                <path
                    d="M798.72 256.8192c20.2752 0 36.864 16.5888 36.864 36.864v513.024c0 20.2752-16.5888 36.864-36.864 36.864H225.28c-20.2752 0-36.864-16.5888-36.864-36.864V293.6832c0-20.2752 16.5888-36.864 36.864-36.864h573.44m0-45.056H225.28c-45.2608 0-81.92 36.6592-81.92 81.92v513.024c0 45.2608 36.6592 81.92 81.92 81.92h573.44c45.2608 0 81.92-36.6592 81.92-81.92V293.6832c0-45.2608-36.6592-81.92-81.92-81.92z"
                    fill="#1afa29" p-id="13089"></path>
                <path
                    d="M365.3632 135.3728c-12.4928 0-22.528 10.0352-22.528 22.528v147.456c0 12.4928 10.0352 22.528 22.528 22.528s22.528-10.0352 22.528-22.528v-147.456c0-12.4928-10.0352-22.528-22.528-22.528zM655.7696 135.3728c-12.4928 0-22.528 10.0352-22.528 22.528v147.456c0 12.4928 10.0352 22.528 22.528 22.528s22.528-10.0352 22.528-22.528v-147.456c0-12.4928-10.0352-22.528-22.528-22.528zM880.64 426.8032H143.36v45.056h737.28z"
                    fill="#1afa29" p-id="13090"></path>
                <path d="M328.4992 595.5584m-36.864 0a36.864 36.864 0 1 0 73.728 0 36.864 36.864 0 1 0-73.728 0Z"
                    fill="#1afa29" p-id="13091"></path>
                <path
                    d="M504.677159 631.949463a36.864 36.864 0 1 0 11.811854-72.77567 36.864 36.864 0 1 0-11.811854 72.77567Z"
                    fill="#1afa29" p-id="13092"></path>
                <path d="M692.6336 595.5584m-36.864 0a36.864 36.864 0 1 0 73.728 0 36.864 36.864 0 1 0-73.728 0Z"
                    fill="#1afa29" p-id="13093"></path>
            </svg>
            <div class="panel-title">种植任务概览</div>
        </div>
        <div class="charts-container">
            <div id="non-distribute-chart" class="chart"></div>
            <div id="distributed-chart" class="chart"></div>
            <div id="acting-chart" class="chart"></div>
            <div id="finish-chart" class="chart"></div>
        </div>
    </div>
</template>

<style scoped>
.header-container {
    display: flex;
    align-items: center;
}

.panel-title {
    margin-left: 10px;
}

.charts-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.chart {
    width: 120px;
    height: 120px;
}
</style>