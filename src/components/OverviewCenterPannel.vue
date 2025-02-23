<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';
import $ from 'jquery'; // 必须确保 jQuery 已安装并正确引入

//定义DOM引用和图表实例
const chartDom = ref(null);
let myChart = null;

var geoCoordMap = {
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
var customerBatteryCityData = [
    { name: '南宁市', value: 70 },
    { name: '百色市', value: 39 },
    { name: '河池市', value: 70 },
    { name: '柳州市', value: 70 },
    { name: '桂林市', value: 89 },
    { name: '崇左市', value: 52 },
    { name: '来宾市', value: 9 },
    { name: '贵港市', value: 70 },
    { name: '贺州市', value: 99 },
    { name: '梧州市', value: 39 },
    { name: '防城港市', value: 70 },
    { name: '钦州市', value: 34 },
    { name: '北海市', value: 62 },
    { name: '玉林市', value: 98 },
];
var mapData = [
    { name: '南宁', value: 70 },
    { name: '百色', value: 39 },
    { name: '河池', value: 70 },
    { name: '柳州', value: 70 },
    { name: '桂林', value: 89 },
    { name: '崇左', value: 52 },
    { name: '来宾', value: 9 },
    { name: '贵港', value: 70 },
    { name: '贺州', value: 99 },
    { name: '梧州', value: 39 },
    { name: '防城港', value: 70 },
    { name: '钦州', value: 34 },
    { name: '北海', value: 62 },
    { name: '玉林', value: 98 },
]
const dataMap = mapData.reduce((map, item) => (map[item.name] = item.value, map), {});

const generateChartData = () => {
    const maxValue = Math.max(...customerBatteryCityData.map(item => item.value));
    const lineMaxHeight = 0.9 / maxValue;

    const lineData = customerBatteryCityData.map(item => ({
        coords: [
            geoCoordMap[item.name],
            [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight]
        ]
    }));

    const scatterData = customerBatteryCityData.map(item => [
        geoCoordMap[item.name][0],
        geoCoordMap[item.name][1] + item.value * lineMaxHeight
    ]);

    const scatterData2 = customerBatteryCityData.map(item => ({
        name: item.name,
        value: geoCoordMap[item.name]
    }));

    return { lineData, scatterData, scatterData2 };
};

// --- 4. 初始化图表（使用 jQuery）---
const initChart = () => {
    if (!chartDom.value) return;

    // 使用 jQuery 加载地图数据
    $.getJSON("https://geojson.cn/api/china/450000.json")
        .done((geoJson) => {
            // 注册地图
            echarts.registerMap('guangxi', geoJson);

            // 生成动态数据
            const { lineData, scatterData, scatterData2 } = generateChartData();

            // 配置项
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
                        if (typeof (params.value)[2] == "undefined") {
                            return params.name + ' : ' + dataMap[params.name];
                        } else {
                            return params.name + ' : ' + params.value[2];
                        }
                    }
                },
                geo: [
                    {
                        map: 'guangxi',
                        aspectScale: 0.9,
                        roam: true, // 是否允许缩放
                        zoom: 1.2, // 默认显示级别
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
                                        color: 'rgba(50, 200, 50, 0.3)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(152, 251, 152, 0.3)' // 50% 处的颜色
                                    }],
                                    global: true // 缺省为 false
                                },
                                borderColor: '#2B5E25',
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
                    }
                ],
                series: [
                    // map
                    {
                        geoIndex: 0,
                        // coordinateSystem: 'geo',
                        showLegendSymbol: true,
                        type: 'map',
                        roam: true,
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            emphasis: {
                                show: false
                            }
                        },

                        itemStyle: {
                            normal: {
                                borderColor: '#2ab8ff',
                                borderWidth: 1.5,
                                areaColor: '#12235c'
                            },
                            emphasis: {
                                areaColor: '#2AB8FF',
                                borderWidth: 0,
                                color: 'red'
                            }
                        },
                        map: 'guangxi', // 使用
                        data: customerBatteryCityData
                        // data: this.difficultData //热力图数据   不同区域 不同的底色
                    },
                    // 柱状体的主干
                    {
                        type: 'lines',
                        zlevel: 5,
                        effect: {
                            show: false,
                            // period: 4, //箭头指向速度，值越小速度越快
                            // trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                            // symbol: 'arrow', //箭头图标
                            // symbol: imgDatUrl,
                            symbolSize: 5 // 图标大小
                        },
                        lineStyle: {
                            width: 20, // 尾迹线条宽度
                            color: 'rgb(22,255,255, .6)',
                            opacity: 1, // 尾迹线条透明度
                            curveness: 0 // 尾迹线条曲直度
                        },
                        label: {
                            show: 0,
                            position: 'end',
                            formatter: '245'
                        },
                        silent: true,
                        data: lineData
                    },
                    // 柱状体的顶部
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        zlevel: 5,
                        label: {
                            show: true,
                            formatter: function (params) {
                                return '顶部坐标'
                            },
                            position: "top"
                        },
                        symbol: 'circle',
                        symbolSize: [20, 10],
                        itemStyle: {
                            color: 'rgb(22,255,255, 1)',
                            opacity: 1
                        },
                        silent: true,
                        data: scatterData
                    },
                    // 柱状体的底部
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        zlevel: 4,
                        label: {
                            // 这儿是处理的
                            formatter: '{b}',
                            position: 'bottom',
                            color: 'black',
                            fontSize: 15,
                            distance: 10,
                            show: true
                        },
                        symbol: 'circle',
                        symbolSize: [20, 10],
                        itemStyle: {
                            // color: '#F7AF21',
                            color: 'rgb(22,255,255, 1)',
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
                        label: {
                            show: false
                        },
                        symbol: 'circle',
                        symbolSize: [40, 20],
                        itemStyle: {
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [
                                    {
                                        offset: 0, color: 'rgb(22,255,255, 0)' // 0% 处的颜色
                                    },
                                    {
                                        offset: .75, color: 'rgb(22,255,255, 0)' // 100% 处的颜色
                                    },
                                    {
                                        offset: .751, color: 'rgb(22,255,255, 1)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 1, color: 'rgb(22,255,255, 1)' // 100% 处的颜色
                                    }
                                ],
                                global: false // 缺省为 false
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

            // 初始化图表
            myChart = echarts.init(chartDom.value);
            myChart.setOption(option);
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error('地图加载失败:', textStatus, errorThrown);
        });
};

// --- 5. 生命周期管理 ---
onMounted(() => {
    initChart();
    window.addEventListener('resize', () => myChart?.resize());
});

onUnmounted(() => {
    window.removeEventListener('resize', () => myChart?.resize());
    myChart?.dispose();
});
</script>

<template>
    <div class="panel-box water-quality-panel">
        <div class="panel-title">种植地块分布</div>
        <div ref="chartDom" class="chart-container"></div>
    </div>
</template>

<style scoped>
.chart-container {
    width: 100%;
    height: 960px;
    /* 必须明确尺寸 */
    /* background-color: #4ad653; */
}
</style>