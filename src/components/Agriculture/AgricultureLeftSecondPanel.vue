<template>
  <section class="panel-box weather-station-panel">
    <h2 class="panel-title">农产品产量TOP</h2>
    <!-- 柱状图容器 -->
    <div id="bar-chart" style="width: 100%; height: 300px;"></div>
  </section>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, nextTick, onBeforeUnmount } from 'vue';

// 模拟数据库中的数据 
const data = [
  { name: '番茄', perfect_ratio: '100.00', good_ratio: '0.00', worry_ratio: '0.00', avg_weight: '544.17' },
  { name: '胡萝卜', perfect_ratio: '57.14', good_ratio: '42.86', worry_ratio: '0.00', avg_weight: '1328.57' },
  { name: '潘茄', perfect_ratio: '100.00', good_ratio: '0.00', worry_ratio: '0.00', avg_weight: '10' },
  { name: '红柿子', perfect_ratio: '0.00', good_ratio: '100.00', worry_ratio: '0.00', avg_weight: '20' },
  { name: '西瓜', perfect_ratio: '100.00', good_ratio: '0.00', worry_ratio: '0.00', avg_weight: '16000' },
  { name: '西红柿', perfect_ratio: '0.00', good_ratio: '100.00', worry_ratio: '0.00', avg_weight: '3' }
];

// 生成柱状图数据 
const barChartData = {
  xAxis: data.map(item => item.name),
  yAxis: data.map(item => parseFloat(item.avg_weight))
};

let barChart;

const initChart = () => {
  // 初始化柱状图 
  barChart = echarts.init(document.getElementById('bar-chart'));
  const barOption = {
    grid: {
      bottom: '15%' // 调整底部边距
    },
    xAxis: {
      type: 'category',
      data: barChartData.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: barChartData.yAxis,
        type: 'bar',
        itemStyle: {
          color: '#32b885' // 设置柱状图颜色
        }
      }
    ]
  };
  barChart.setOption(barOption);
};

onMounted(() => {
  nextTick(() => {
    initChart();
    window.addEventListener('resize', barChart.resize);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', barChart.resize);
});
</script>

<style scoped>
.panel-box {
  padding: 20px;
  border: 1px solid #ccc;
  margin-top: 20px;
}

.panel-title {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>