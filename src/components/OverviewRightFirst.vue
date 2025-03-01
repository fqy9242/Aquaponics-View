<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const totalProductionRef = ref(null);
const abnormalEventsRef = ref(null);
const oeeRef = ref(null);

const createChart = (element, title, value, color, isPercentage = true) => {
  if (!element) {
    console.error(`Element for ${title} is not available`);
    return;
  }
  const chart = echarts.init(element);
  const option = {
    title: {
      text: title,
      left: 'center',
      top: 'bottom',
      textStyle: {
        color: '#fff',
        fontSize: 14
      }
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: isPercentage ? '{d}%' : '{c}',
          fontSize: 20,
          color: '#fff'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: value, name: title, itemStyle: { color: color } },
          { value: 100 - value, name: '剩余', itemStyle: { color: '#2c343c' } }
        ]
      }
    ]
  };
  chart.setOption(option);
  return chart;
};

onMounted(() => {
  createChart(totalProductionRef.value, '总产量达成率', 85, '#3AAFA9');
  createChart(abnormalEventsRef.value, '异常事件数量', 10, '#FF6F61', false);
  createChart(oeeRef.value, '设备综合效率（OEE）', 92, '#5AE27C');

  // 自适应窗口
  window.addEventListener('resize', () => {
    echarts.getInstanceByDom(totalProductionRef.value).resize();
    echarts.getInstanceByDom(abnormalEventsRef.value).resize();
    echarts.getInstanceByDom(oeeRef.value).resize();
  });
});

onBeforeUnmount(() => {
  if (totalProductionRef.value) {
    echarts.dispose(totalProductionRef.value);
  }
  if (abnormalEventsRef.value) {
    echarts.dispose(abnormalEventsRef.value);
  }
  if (oeeRef.value) {
    echarts.dispose(oeeRef.value);
  }
});
</script>

<template>
  <div class="panel-box">
    <div ref="totalProductionRef" class="chart"></div>
    <div ref="abnormalEventsRef" class="chart"></div>
    <div ref="oeeRef" class="chart"></div>
  </div>
</template>

<style scoped>
.panel-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 300px;
}

.chart {
  width: 30%;
  height: 100%;
}
</style>