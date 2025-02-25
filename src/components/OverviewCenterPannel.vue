<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';
import $ from 'jquery';
import { getBaseInfoApi } from '@/apis/overView'

// 定义DOM引用和图表实例
const chartDom = ref(null);
let myChart = null;

// 城市坐标映射（保留原结构）
const geoCoordMap = {
    '南宁市': [108.320004, 22.82402],
    '百色市': [106.616285, 23.897742],
    '河池市': [108.062105, 24.695899],
    '柳州市': [109.411703, 24.314617],
    '桂林市': [110.299121, 25.274215],
    '崇左市': [107.353926, 22.404108],
    '来宾市': [109.229772, 23.733766],
    '贵港市': [109.602146, 23.0936],
    '贺州市': [111.552056, 24.414141],
    '梧州市': [111.297604, 23.474803],
    '防城港市': [108.000478, 21.914631],
    '钦州市': [108.624175, 21.967127],
    '北海市': [109.339254, 21.653343],
    '玉林市': [110.154393, 22.63136],
}

// 响应式数据
const customerBatteryCityData = ref([]);
const mapData = ref([]);
const dataMap = ref({});

// 获取后端数据
const getBaseInfo = async () => {
    try {
        const res = await getBaseInfoApi();

        customerBatteryCityData.value = res.data.map(item => ({
            name: item.city,
            value: item.cnt
        }));

        mapData.value = res.data.map(item => ({
            name: item.city.replace(/市$/, ''),
            value: item.cnt
        }));

        // 生成数据映射
        dataMap.value = mapData.value.reduce((map, item) => {
            map[item.name] = item.value;
            return map;
        }, {});

    } catch (error) {
        console.error('数据获取失败:', error);
    }
};

// 生成图表数据
const generateChartData = () => {
    const maxValue = Math.max(...customerBatteryCityData.value.map(item => item.value));
    const lineMaxHeight = 0.9 / maxValue;

    const lineData = customerBatteryCityData.value.map(item => ({
        coords: [
            geoCoordMap[item.name],
            [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight]
        ]
    }));

    const scatterData = customerBatteryCityData.value.map(item => [
        geoCoordMap[item.name][0],
        geoCoordMap[item.name][1] + item.value * lineMaxHeight,
        item.value
    ]);

    const scatterData2 = customerBatteryCityData.value.map(item => ({
        name: item.name,
        value: geoCoordMap[item.name]
    }));

    return { lineData, scatterData, scatterData2 };
};

// 初始化图表
const initChart = async () => {
    if (!chartDom.value) return;

    try {
        // 加载地图数据
        const geoJson = await $.getJSON("src/assets/json/450000.json");
        echarts.registerMap('guangxi', geoJson);

        // 等待数据加载
        await getBaseInfo();

        // 生成动态数据
        const { lineData, scatterData, scatterData2 } = generateChartData();

        // 完整配置项
        const option = {
            tooltip: {
                trigger: 'item',
                show: true,
                enterable: true,
                textStyle: {
                    fontSize: 20,
                    color: '#fff'
                },
                backgroundColor: 'rgba(0,2,89,0.8)',
                formatter: function (params) {
                    if (params.seriesType === 'scatter' && params.value.length > 2) {
                        return `${params.name} : ${params.value[2]}`;
                    } else if (params.seriesType === 'map' && dataMap.value[params.name] !== undefined) {
                        return `${params.name} : ${dataMap.value[params.name]}`;
                    } else {
                        return `${params.name} : 0`;
                    }
                }
            },
            geo: [{
                map: 'guangxi',
                aspectScale: 0.9,
                roam: true,
                zoom: 1.2,
                layoutSize: '95%',
                layoutCenter: ['55%', '50%'],
                itemStyle: {
                    normal: {
                        areaColor: {
                            type: 'linear-gradient',
                            x: 0,
                            y: 300,
                            x2: 0,
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(50, 200, 50, 0.3)'
                            }, {
                                offset: 1,
                                color: 'rgba(152, 251, 152, 0.3)'
                            }],
                            global: true
                        },
                        borderColor: '#FFFACD',
                        borderWidth: 1
                    },
                    emphasis: {
                        areaColor: '#C0FF3E'
                    },
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#0160AD',
                    },
                    label: {
                        show: 0,
                        color: '#fff'
                    }
                },
                zlevel: 3
            }],
            series: [
                // 地图系列
                {
                    geoIndex: 0,
                    type: 'map',
                    roam: true,
                    label: {
                        normal: {
                            show: false,
                            textStyle: { color: '#fff' }
                        },
                        emphasis: { show: false }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#2ab8ff',
                            borderWidth: 1.5,
                            areaColor: '#12235c'
                        },
                        emphasis: {
                            areaColor: '#2AB8FF',
                            borderWidth: 0
                        }
                    },
                    map: 'guangxi',
                    data: customerBatteryCityData.value
                },
                // 柱状体主干
                {
                    type: 'lines',
                    zlevel: 5,
                    effect: {
                        show: false,
                        symbolSize: 5
                    },
                    lineStyle: {
                        width: 20,
                        color: 'rgba(22,255,255,0.6)',
                        opacity: 1,
                        curveness: 0
                    },
                    silent: true,
                    data: lineData
                },
                // 柱状体顶部
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    geoIndex: 0,
                    zlevel: 5,
                    label: {
                        show: true,
                        formatter: params => params.value[2],
                        position: "top"
                    },
                    symbol: 'circle',
                    symbolSize: [20, 10],
                    itemStyle: {
                        color: 'rgba(22,255,255,1)',
                        opacity: 1
                    },
                    silent: true,
                    data: scatterData
                },
                // 柱状体底部
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    geoIndex: 0,
                    zlevel: 4,
                    label: {
                        formatter: '{b}',
                        position: 'bottom',
                        color: '#fff',
                        fontSize: 15,
                        distance: 10,
                        show: true
                    },
                    symbol: 'circle',
                    symbolSize: [20, 10],
                    itemStyle: {
                        color: 'rgba(22,255,255,1)',
                        opacity: 1
                    },
                    silent: true,
                    data: scatterData2
                },
                // 底部外框
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    geoIndex: 0,
                    zlevel: 4,
                    symbol: 'circle',
                    symbolSize: [40, 20],
                    itemStyle: {
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                { offset: 0, color: 'rgba(22,255,255,0)' },
                                { offset: 0.75, color: 'rgba(22,255,255,0)' },
                                { offset: 0.751, color: 'rgba(22,255,255,1)' },
                                { offset: 1, color: 'rgba(22,255,255,1)' }
                            ]
                        },
                        opacity: 1
                    },
                    silent: true,
                    data: scatterData2
                }
            ]
        };

        // 销毁旧实例
        if (myChart) myChart.dispose();

        // 初始化新图表
        myChart = echarts.init(chartDom.value);
        myChart.setOption(option);

    } catch (error) {
        console.error('图表初始化失败:', error);
    }
};

// 生命周期管理
onMounted(async () => {
    await initChart();
    window.addEventListener('resize', () => myChart?.resize());
});

onUnmounted(() => {
    window.removeEventListener('resize', () => myChart?.resize());
    myChart?.dispose();
});
</script>

<template>
    <div class="panel-box water-quality-panel">
        <div class="panel-title">鱼菜共生运营基地</div>
        <div ref="chartDom" class="chart-container"></div>
    </div>
</template>

<style scoped>
.chart-container {
    width: 100%;
    height: 960px;
}

.panel-title .icon {
    margin-right: 10px;
    filter: drop-shadow(0 0 5px #1afa29);
}
</style>