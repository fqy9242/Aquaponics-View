<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
import { getPlantingTaskOverviewApi } from '@/apis/agriculture';

const plantingTaskOverviewData = ref({});

// 状态颜色映射
const statusColors = {
    '未分配': '#FF6B6B',
    '已分配': '#4ECDC4',
    '进行中': '#FFD93D',
    '已完成': '#6CEC6C'
};

// 获取数据
const getPlantingTaskOverviewData = async () => {
    const res = await getPlantingTaskOverviewApi("-1");
    plantingTaskOverviewData.value = res.data;
};

// 创建图表函数
const createChart = (id, title, value) => {
    const chartDom = document.getElementById(id);
    const myChart = echarts.init(chartDom);

    const option = {
        title: {
            text: `{value|${value}%}`,
            left: 'center',
            top: 'center',
            textStyle: {
                rich: {
                    value: {
                        fontSize: 15,
                        color: statusColors[title],
                        fontWeight: 'bold',
                        lineHeight: 36
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            radius: ['80%', '95%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            silent: true,
            itemStyle: {
                borderRadius: 10
            },
            label: {
                show: false
            },
            data: [
                {
                    value: value,
                    itemStyle: {
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: `${statusColors[title]}66`
                            }, {
                                offset: 1,
                                color: statusColors[title]
                            }]
                        },
                        shadowBlur: 15,
                        shadowColor: statusColors[title]
                    }
                },
                {
                    value: 100 - value,
                    itemStyle: {
                        color: 'rgba(255,255,255,0.08)'
                    }
                }
            ]
        }],
        animationDuration: 1200,
        animationEasing: 'cubicOut'
    };

    myChart.setOption(option);

    // 添加状态文本
    const statusText = document.createElement('div');
    statusText.innerText = title;
    statusText.style.position = 'absolute';
    statusText.style.bottom = '20px'; // 调整这个值来靠近圆环
    statusText.style.left = '50%';
    statusText.style.transform = 'translateX(-50%)';
    statusText.style.color = statusColors[title];
    statusText.style.fontSize = '14px';
    statusText.style.fontWeight = 'bold';
    chartDom.appendChild(statusText);
};

// 初始化图表
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
  <div class="panel-box task-overview-panel">
    <div class="header-container">
      <svg t="1740017435006" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="13088" width="30" height="30">
        <!-- SVG路径保持不变 -->
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

    <div class="charts-grid">
      <div class="chart-card" v-for="(item, index) in [
        { id: 'non-distribute-chart', title: '未分配' },
        { id: 'distributed-chart', title: '已分配' },
        { id: 'acting-chart', title: '进行中' },
        { id: 'finish-chart', title: '已完成' }
      ]" :key="index">
        <div :id="item.id" class="chart"></div>
        <div class="status-indicator" :style="{ backgroundColor: statusColors[item.title] }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-box {
  background: rgba(16, 32, 24, 0.9);
  border: 1px solid rgba(108, 240, 161, 0.2);
  border-radius: 16px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.header-container {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(108, 240, 161, 0.1);
}

.panel-title {
  color: #8CEA6C;
  font-size: 18px;
  margin-left: 12px;
  letter-spacing: 1px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding-top: 20px;
}

.chart-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 15px;
  transition: all 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(108, 240, 161, 0.15);
}

.chart {
  width: 100%;
  height: 180px;
}

.status-indicator {
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 3px;
  border-radius: 2px;
  opacity: 0.8;
  filter: blur(0.5px);
}


@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* @media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-card {
    padding: 12px;
  }
  
  .chart {
    height: 160px;
  }
} */

/* 加载动画 */
@keyframes chart-loading {
  0% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.3; transform: scale(0.95); }
}

.chart-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    rgba(108, 240, 161, 0) 0%,
    rgba(108, 240, 161, 0.1) 50%,
    rgba(108, 240, 161, 0) 100%
  );
  animation: chart-loading 2s infinite;
  opacity: 0;
}

.chart-card:hover::before {
  opacity: 1;
}
</style>