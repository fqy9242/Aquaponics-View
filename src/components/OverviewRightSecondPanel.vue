<template>
  <section class="panel-box production-analysis-panel">
    <div class="panel-header">
      <svg t="1740044562165" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="18682" width="30" height="30">
        <path
          d="M448.836 832.527l-52.642 0c-151.843-24.867-268.081-157.088-268.081-315.97 0-53.213 13.669-103.029 36.737-147.191l39.273 54.411c28.576 39.613 90.226 28.569 103.319-18.487l31.278-112.478 43.143-155.122c10.346-37.191-17.623-73.979-56.186-73.917l-152.09 0.211L58.399 64.152c-47.46 0.076-74.915 53.878-47.121 92.389l72.256 100.16C31.188 330.002 0.151 419.56 0.151 516.557c0 224.086 164.321 409.775 378.939 442.944 5.867 0.903 11.549 0.672 17.103-0.052l0 0.775 52.641 0c34.88 0 63.168-28.301 63.168-63.206l0-1.288C512.003 860.828 483.716 832.527 448.836 832.527zM1012.729 867.458l-72.264-100.142c52.348-73.313 83.384-162.885 83.384-259.869 0-224.085-164.308-409.782-378.938-442.957-5.861-0.904-11.55-0.667-17.104 0.07l0-0.788-52.636 0c-34.886 0-63.168 28.294-63.168 63.211l0 1.281c0 34.917 28.281 63.225 63.168 63.225l52.636 0c151.843 24.854 268.087 157.082 268.087 315.957 0 53.201-13.675 103.024-36.736 147.192l-39.268-54.437c-28.582-39.588-90.237-28.557-103.325 18.507l-31.278 112.472-43.149 155.147c-10.345 37.173 17.623 73.955 56.186 73.897l152.092-0.205 115.193-0.173C1013.068 959.777 1040.517 905.964 1012.729 867.458z"
          fill="#1afa29" p-id="18683"></path>
      </svg>
      <h2 class="panel-title">鱼菜共生资源循环</h2>
    </div>
    <div id="echarts" style="width: 100%; height: 280px; margin-top: -20px;"></div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
  const chartDom = document.getElementById('echarts');
  const myChart = echarts.init(chartDom);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '资源循环',
        type: 'pie',
        radius: ['30%', '60%'], // 调整环形图的大小
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          // formatter: '{b}: {c} ({d}%)', // 显示标签的名称、数值和百分比
          fontSize: 10 // 调整标签的字体大小
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 5000, name: '节约水资源 (升)' },
          { value: 200, name: '减少化肥使用 (公斤)' },
          { value: 150, name: '减少农药使用 (公斤)' },
          { value: 3000, name: '提高产量 (公斤)' }
        ]
      }
    ]
  };
  myChart.setOption(option);
});
</script>

<style scoped>
.panel-header {
  display: flex;
  align-items: center;
}

.panel-header .icon {
  margin-right: 10px;
}
</style>