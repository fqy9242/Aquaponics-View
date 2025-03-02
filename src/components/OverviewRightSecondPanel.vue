<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const heatmapChartRef = ref(null);

onMounted(() => {
  const chart = echarts.init(heatmapChartRef.value);
  const option = {
    title: {
      text: '各区域实时能耗强度',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 20
      }
    },
    tooltip: {
      position: 'top',
      formatter: function (params) {
        return `${params.marker} ${params.name}: ${params.value[2]}`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['桂林', '柳州', '南宁', '梧州', '钦州', '北海'],
      axisLine: {
        lineStyle: {
          color: '#8CD3D0'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(58,175,169,0.2)'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      axisLine: {
        lineStyle: {
          color: '#8CD3D0'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(58,175,169,0.2)'
        }
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '能耗强度',
        type: 'heatmap',
        data: [
          [0, 0, 5], [0, 1, 10], [0, 2, 15], [0, 3, 20], [0, 4, 25], [0, 5, 30],
          [1, 0, 35], [1, 1, 40], [1, 2, 45], [1, 3, 50], [1, 4, 55], [1, 5, 60],
          [2, 0, 65], [2, 1, 70], [2, 2, 75], [2, 3, 80], [2, 4, 85], [2, 5, 90],
          [3, 0, 95], [3, 1, 100], [3, 2, 55], [3, 3, 60], [3, 4, 65], [3, 5, 70],
          [4, 0, 75], [4, 1, 80], [4, 2, 85], [4, 3, 90], [4, 4, 95], [4, 5, 100],
          [5, 0, 50], [5, 1, 45], [5, 2, 40], [5, 3, 35], [5, 4, 30], [5, 5, 25]
        ],
        label: {
          show: true,
          formatter: '{c}'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  chart.setOption(option);

  // 自适应窗口
  window.addEventListener('resize', () => chart.resize());
});
</script>

<template>
  <div class="panel-box">
    <div ref="heatmapChartRef" class="chart"></div>
  </div>
</template>

<style scoped>
.panel-box {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>