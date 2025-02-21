<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import guangxiMap from '@/assets/json/guangXiMap.json';
import { getFishPastureGeoHeatApi } from '@/apis/overView';

const landGeoData = ref([]);

const getGodistribution = async () => {
    const res = await getFishPastureGeoHeatApi();
    // 将数据转换为 ECharts 所需的格式
    landGeoData.value = res.data.map(item => ({
        name: item.landName,
        value: [item.longitude, item.latitude, item.heatValue]
    }));
};

onMounted(async () => {
    await getGodistribution(); // 获取数据

    const chartDom = document.getElementById('FishMap');
    const myChart = echarts.init(chartDom);

    // 注册广西地图
    echarts.registerMap('guangxi', guangxiMap);

    const option = {
        title: {
            // text: '广西地块分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        geo: {
            map: 'guangxi',
            roam: true, // 开启缩放和平移
            zoom: 3.9, // 调整缩放比例
            label: {
                show: true, // 是否显示标签
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                areaColor: '#ffeb3b',
                borderColor: '#111'
            }
        },
        visualMap: {
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            inRange: {
                color: ['#50a3ba', '#eac736', '#d94e5d']
            }
        },
        series: [
            {
                name: '鱼棚',
                type: 'heatmap',
                coordinateSystem: 'geo',
                data: landGeoData.value, // 使用获取到的数据
                pointSize: 10,
                blurSize: 20,
                label: {
                    formatter: params => params.name, // 标签内容为地块名称
                    position: 'right',
                    show: true // 显示地块名称
                },
                itemStyle: {
                    color: '#ff5722'
                }
            }
        ]
    };

    myChart.setOption(option);
});
</script>

<template>
    <div class="panel-box water-quality-panel">
        <div class="panel-title">养殖鱼棚分布</div>
        <div id="FishMap" style="height: 450px;"></div>
    </div>
</template>

<style scoped></style>