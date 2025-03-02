<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const selectedPark = ref('所有园区');
const selectedFish = ref('所有鱼种');

const parks = ['所有园区', '南宁-园区A', '南宁-园区B'];
const fishTypes = ['所有鱼种', '罗非鱼', '鲤鱼', '草鱼'];

onMounted(() => {
  const chartDom = document.getElementById('fish-growth-chart');
  const myChart = echarts.init(chartDom, 'dark');
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,40,80,0.9)',
      borderColor: '#00e5ff',
      borderWidth: 1,
      textStyle: {
        color: '#89f8ff',
        fontSize: 14
      },
      axisPointer: {
        type: 'shadow',
        label: {
          backgroundColor: '#003366'
        }
      }
    },
    legend: {
      data: ['鱼体尺寸', '体重预测'],
      right: 20,
      top: 10,
      textStyle: {
        color: '#00e5ff',
        fontSize: 14
      },
      itemStyle: {
        borderColor: '#00e5ff'
      }
    },
    grid: {
      left: 60,
      right: 40,
      bottom: 40,
      top: 80
    },
    xAxis: {
      type: 'category',
      data: ['3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        lineStyle: {
          color: '#00e5ff'
        }
      },
      axisLabel: {
        color: '#89f8ff',
        fontSize: 12
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '体长（cm）',
        nameTextStyle: {
          color: '#00e5ff'
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['rgba(0,229,255,0.1)']
          }
        },
        axisLabel: {
          color: '#89f8ff',
          formatter: '{value} cm'
        }
      },
      {
        type: 'value',
        name: '体重（kg）',
        nameTextStyle: {
          color: '#91CC75'
        },
        splitLine: { show: false },
        axisLabel: {
          color: '#91CC75',
          formatter: '{value} kg'
        }
      }
    ],
    series: [
      {
        name: '鱼体尺寸',
        type: 'line',
        data: [15, 18, 20, 25, 30, 35, 40, 45, 50, 55],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#5470C6',
          borderColor: '#00e5ff',
          borderWidth: 2
        },
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(84,112,198,0.5)',
          shadowBlur: 10,
          shadowOffsetY: 8
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(84,112,198,0.6)' },
            { offset: 1, color: 'rgba(84,112,198,0.1)' }
          ])
        },
        animationDuration: 2000
      },
      {
        name: '体重预测',
        type: 'bar',
        yAxisIndex: 1,
        data: [0.5, 0.8, 1.2, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#91CC75' },
            { offset: 1, color: '#4F9D5D' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(145,204,117,0.5)'
          }
        },
        barWidth: 16
      }
    ]
  };
  myChart.setOption(option);

  // 窗口自适应
  window.addEventListener('resize', () => myChart.resize());
});
</script>

<template>
  <section class="panel-box growth-chart-container">
    <div class="chart-header">
      <select v-model="selectedPark" class="dropdown left-dropdown">
        <option v-for="park in parks" :key="park" :value="park">{{ park }}</option>
      </select>
      <h2 class="panel-title">
        <svg t="1740747369411" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="6920" width="50" height="50">
          <path d="M845.7 641h0.1l-0.1-21.1z" fill="#1296db" p-id="6921"></path>
          <path
            d="M872 246.6l-27.3 101.9-22.2-22.2-225 225c-8.3 8.3-21.6 8.3-29.9 0l-82.9-82.9-302.8 302.8-29.9-30.1 317.6-317.6c8.2-8.2 21.6-8.3 29.9 0l82.9 82.7 210.1-209.9-22.5-22.5 102-27.2z"
            fill="#1296db" p-id="6922"></path>
          <path
            d="M780.5 774.4v-31.6h-61.4c-5.6 0-11-2.2-14.9-6.2L616.3 649 405.8 774.4c-10.5 6.3-24.2 2.3-29.7-8.6L188 393.1l37.7-19.1 177.9 352.2L609 604c8.3-5 18.9-3.6 25.8 3.2l93 93.2h52.7v-31.6l91.5 52.7-91.5 52.9z"
            fill="#1296db" p-id="6923"></path>
        </svg>
        <span>鱼类生长监测仪表</span>
      </h2>

      <select v-model="selectedFish" class="dropdown right-dropdown">
        <option v-for="fish in fishTypes" :key="fish" :value="fish">{{ fish }}</option>
      </select>
    </div>
    <div id="fish-growth-chart" style="width:100%;height:520px;"></div>
  </section>
</template>

<style scoped>
.growth-chart-container {
  background: linear-gradient(180deg, #0a1a2d 0%, #0c2b4d 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 45, 120, 0.3);
  padding: 20px;
  position: relative;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.left-dropdown {
  position: absolute;
  top: 10px;
  left: 10px;
}

.right-dropdown {
  position: absolute;
  top: 10px;
  right: 10px;
}

.dropdown {
  padding: 5px 10px;
  border: 1px solid #00e5ff;
  border-radius: 4px;
  background-color: #0a1a2d;
  color: #00e5ff;
  font-size: 14px;
}

.dropdown:focus {
  outline: none;
  border-color: #00e5ff;
}

.panel-title {
  font-size: 22px;
  color: #00e5ff;
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.6);
  font-family: 'Microsoft YaHei', sans-serif;
  margin: 0 auto;
}

.legend-icon {
  display: inline-block;
  width: 20px;
  height: 12px;
  margin-right: 8px;
  border-radius: 2px;
}

.size-legend .legend-icon {
  background: linear-gradient(90deg, #5470C6 0%, #00e5ff 100%);
  box-shadow: 0 0 8px #5470C6;
}

.weight-legend .legend-icon {
  background: linear-gradient(90deg, #91CC75 0%, #4F9D5D 100%);
  box-shadow: 0 0 8px #91CC75;
}
</style>