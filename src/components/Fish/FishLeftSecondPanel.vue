<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';
import { getPickingExcellenceRateTop10Api } from '@/apis/agriculture';

const graphData = ref({ name: [], value: [] });

const getPickingExcellenceRateTop10Data = async () => {
  const res = await getPickingExcellenceRateTop10Api();
  graphData.value = res.data;
};

onMounted(() => {
  getPickingExcellenceRateTop10Data();
});

watch(graphData, (newData) => {
  if (newData.name.length > 0 && newData.value.length > 0) {
    const chartDom = document.getElementById('harvest-chart');
    const myChart = echarts.init(chartDom);
    const option = {
      // title: {
      //   text: '农产品采摘优秀率TOP10'
      // },
      grip: {
        left: '30%',
        right: '1%',
        bottom: '0%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        show: false,
        type: 'value',
        max: 100, // 设置横轴最大值为100
        boundaryGap: [0, 0.01],
        axisLabel: {
          color: '#FFFFFF', // 设置横轴字体颜色为白色
          fontWeight: 'bold' // 设置横轴字体加粗
        }
      },
      yAxis: {
        type: 'category',
        data: newData.name,
        axisLabel: {
          color: '#FFFFFF', // 设置纵轴字体颜色为白色
          fontWeight: 'bold' // 设置纵轴字体加粗
        }
      },
      series: [
        {
          name: '优秀率',
          type: 'bar',
          data: newData.value,
          itemStyle: {
            color: (params) => {
              const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF', '#FF1493', '#00CED1', '#FFD700'];
              return colors[params.dataIndex % colors.length];
            },
            barBorderRadius: [5, 5, 5, 9] // 设置柱形的圆角
          }
        }
      ]
    };
    myChart.setOption(option);
  }
});
</script>

<template>
  <section class="panel-box weather-station-panel">
    <div class="header-container">
      <svg t="1739968727751" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="17474" width="30" height="30">
        <path
          d="M971.932582 859.446327l-147.453199-224.25174c70.347463-78.539308 108.541938-182.473333 93.69422-295.418387C896.567614 164.675527 744.711299 22.137435 559.166024 2.477009 312.898703-23.532097 102.982692 158.838838 102.982692 386.469713c0 95.639783 36.453707 184.111702 99.735705 252.001612L52.705247 879.925937c-3.481534 4.915107-1.740767 13.926135 5.119903 17.202874 1.843165 1.638369 3.583932 1.638369 5.324698 1.638368l170.799955-20.47961c9.523019 0 16.486087 3.276738 21.708388 10.649397l88.471919 128.509559c3.481534 4.915107 13.004553 6.553475 18.226854 3.276737 1.638369-1.638369 3.379136-1.638369 3.379135-3.276737l145.712432-239.816244L657.160962 1017.446525c3.481534 4.915107 11.263786 9.011029 18.226854 4.915106 1.740767-1.638369 3.481534-1.638369 3.481534-3.276738l88.471919-128.509558a27.647475 27.647475 0 0 1 21.605989-10.649398H958.211242c6.963068 0 13.004553-4.915107 13.004553-12.287766 2.559951-4.915107 0.819184-6.553475 0.819185-8.191844z m-611.316385 48.331881c-1.740767 3.276738-5.222301 3.276738-9.625417 1.638369l-1.740767-1.638369-55.499746-81.918443a38.604067 38.604067 0 0 0-24.268339-10.649398h-83.249618c-3.481534 0-6.963068-3.276738-9.523019-6.553475 0-1.535971 0-3.17434 1.740767-3.17434l70.245065-121.956083a437.034896 437.034896 0 0 0 195.170692 84.990385l-83.249618 139.261354z m-189.948391-563.189299C191.454611 200.719642 314.63947 82.859482 467.212571 64.837424 691.976301 36.882755 883.563061 217.820117 854.072421 429.78409 834.1048 575.496522 710.100756 692.537498 557.425257 709.637973 332.866324 735.851875 141.177166 556.65528 170.770204 344.691307z m677.260732 470.621458h-90.110288a24.370737 24.370737 0 0 0-21.708388 10.649398l-55.499745 81.918443c-1.740767 3.276738-5.222301 3.276738-9.523019 1.638369l-1.740767-1.638369-86.731152-140.797325a415.838499 415.838499 0 0 0 193.327526-86.731152l73.7266 126.87119c2.662349 3.17434 0.921582 6.451077-1.740767 8.191844z"
          fill="#1afa29" p-id="17475"></path>
        <path
          d="M664.226428 321.549347l-103.114841-15.359709-46.488717-99.940501C514.62287 204.815565 513.189298 204.815565 511.755725 204.815565l-1.331175 1.433572-46.488716 100.042899-103.114841 15.154913H358.158643v2.867145h1.331175l75.160172 76.798541-17.100475 109.46352c0 1.433573 0 1.433573 1.433573 1.433573h1.331174l92.875036-52.223008 92.977433 52.223008c1.331175 0 1.331175 0 2.764748-1.433573v-1.433573l-19.148437-108.029947 75.160172-76.798541c0.614388-1.433573 0.614388-2.867146-0.716786-2.867145z"
          fill="#1afa29" p-id="17476"></path>
      </svg>
      <h2 class="panel-title">农产品采摘优秀率TOP10</h2>
    </div>
    <div id="harvest-chart" style="width: 100%; height: 330px;"></div>
  </section>
</template>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* 左对齐 */
  margin-bottom: 20px;
}

.panel-box {
  padding: 20px;
  border: 1px solid #ccc;
  margin-top: 20px;
}

.panel-title {
  font-size: 24px;
  margin-left: 10px;
}
</style>