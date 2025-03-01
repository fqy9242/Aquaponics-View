<script setup>
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import { getDeviceInfoApi } from "@/apis/overView";

const deviceInfo = ref(null);
let totalDeviceChart, onlineDeviceChart, onlineDeviceRateChart;

// 获取设备总览信息
const getDeviceInfo = async () => {
  try {
    const res = await getDeviceInfoApi();
    if (res && res.data) {
      console.log("res.data:", res.data);
      deviceInfo.value = res.data;
    } else {
      console.error("响应数据格式不正确", res);
    }
  } catch (error) {
    console.error("获取设备信息失败", error);
  }
};

const updateCharts = () => {
  if (deviceInfo.value) {
    const totalDeviceOption = {
      title: {
        text: '设备总数',
        subtext: deviceInfo.value.totalDevice || '0',
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: 20,
          color: '#1afa29'
        },
        subtextStyle: {
          fontSize: 16,
          color: '#1afa29'
        }
      },
      series: [{
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [{
          value: deviceInfo.value.totalDevice || 0,
          itemStyle: {
            color: '#1afa29'
          }
        }, {
          value: 0,
          itemStyle: {
            color: '#f0f0f0'
          }
        }]
      }]
    };

    const onlineDeviceOption = {
      title: {
        text: '在线设备',
        subtext: deviceInfo.value.onlineDevice || '0',
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: 20,
          color: '#1afa29'
        },
        subtextStyle: {
          fontSize: 16,
          color: '#1afa29'
        }
      },
      series: [{
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [{
          value: deviceInfo.value.onlineDevice || 0,
          itemStyle: {
            color: '#1afa29'
          }
        }, {
          value: deviceInfo.value.totalDevice - deviceInfo.value.onlineDevice || 0,
          itemStyle: {
            color: '#f0f0f0'
          }
        }]
      }]
    };

    const onlineDeviceRateOption = {
      title: {
        text: '在线率',
        subtext: `${((deviceInfo.value.onlineDevice / deviceInfo.value.totalDevice) * 100).toFixed(2) || '0'}%`,
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: 20,
          color: '#1afa29'
        },
        subtextStyle: {
          fontSize: 16,
          color: '#1afa29'
        }
      },
      series: [{
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [{
          value: deviceInfo.value.onlineDevice || 0,
          itemStyle: {
            color: '#1afa29'
          }
        }, {
          value: deviceInfo.value.totalDevice - deviceInfo.value.onlineDevice || 0,
          itemStyle: {
            color: '#f0f0f0'
          }
        }]
      }]
    };

    totalDeviceChart.setOption(totalDeviceOption);
    onlineDeviceChart.setOption(onlineDeviceOption);
    onlineDeviceRateChart.setOption(onlineDeviceRateOption);
  }
};

onMounted(() => {
  totalDeviceChart = echarts.init(document.getElementById('total_device'));
  onlineDeviceChart = echarts.init(document.getElementById('online_device'));
  onlineDeviceRateChart = echarts.init(document.getElementById('online_device_rate'));
  getDeviceInfo();
});

watch(deviceInfo, (newVal) => {
  if (newVal) {
    updateCharts();
  }
});
</script>

<template>
  <section class="panel-box equipment-status-panel">
    <div class="icon-text-container">
      <svg t="1739694759495" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="14386" width="30" height="30">
        <path
          d="M1200.355556 2.844444H162.133333C73.955556 2.844444 0 76.8 0 164.977778v694.044444C0 950.044444 73.955556 1024 162.133333 1024h1038.222223c88.177778 0 162.133333-73.955556 162.133333-162.133333V164.977778c0-88.177778-71.111111-162.133333-162.133333-162.133334z m99.555555 859.022223c0 54.044444-45.511111 99.555556-99.555555 99.555555H162.133333c-54.044444 0-99.555556-45.511111-99.555555-99.555555v-85.333334h1237.333333v85.333334z m0-147.911111H62.577778V164.977778c0-54.044444 45.511111-99.555556 99.555555-99.555556h1038.222223c54.044444 0 99.555555 45.511111 99.555555 99.555556v548.977778z"
          fill="#1afa29" p-id="14387"></path>
        <path
          d="M1132.088889 423.822222H967.111111l-71.111111-96.711111c-5.688889-8.533333-17.066667-14.222222-28.444444-14.222222s-19.911111 5.688889-25.6 14.222222l-128 190.577778-130.844445-352.711111c-5.688889-14.222222-17.066667-22.755556-31.288889-22.755556-14.222222 0-25.6 8.533333-31.288889 22.755556l-88.177777 256h-227.555556c-19.911111 0-34.133333 14.222222-34.133333 34.133333s14.222222 34.133333 34.133333 34.133333H455.111111c14.222222 0 25.6-8.533333 31.288889-22.755555l65.422222-190.577778 122.311111 329.955556c5.688889 11.377778 14.222222 19.911111 28.444445 22.755555h2.844444c11.377778 0 19.911111-5.688889 28.444445-14.222222l136.533333-204.8 54.044444 73.955556c5.688889 8.533333 17.066667 14.222222 25.6 14.222222h182.044445c17.066667 0 34.133333-14.222222 34.133333-34.133334 0-25.6-14.222222-39.822222-34.133333-39.822222zM187.733333 910.222222h162.133334c11.377778 0 17.066667-11.377778 17.066666-28.444444s-8.533333-28.444444-17.066666-28.444445H187.733333c-8.533333 0-17.066667 11.377778-17.066666 28.444445s8.533333 28.444444 17.066666 28.444444zM472.177778 910.222222h162.133333c11.377778 0 17.066667-11.377778 17.066667-28.444444s-8.533333-28.444444-17.066667-28.444445h-162.133333c-11.377778 0-17.066667 11.377778-17.066667 28.444445s8.533333 28.444444 17.066667 28.444444z"
          fill="#1afa29" p-id="14388"></path>
        <path
          d="M1137.777778 881.777778m-28.444445 0a28.444444 28.444444 0 1 0 56.888889 0 28.444444 28.444444 0 1 0-56.888889 0Z"
          fill="#1afa29" p-id="14389"></path>
      </svg>
      <!-- 设备信息 -->
      <h2 class="panel-title">智能设备</h2>
    </div>
    <div class="device_info_container">
      <div id="total_device" class="device_info_charts"></div>
      <div id="online_device" class="device_info_charts"></div>
      <div id="online_device_rate" class="device_info_charts"></div>
    </div>
    <!-- <div ref=" chartRef" style="width: 100%; height: 210px;"></div> -->
  </section>
</template>

<style scoped>
.icon-text-container {
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.panel-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #D3D3D3;
  /* margin-bottom: 15px; */
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(85, 139, 47, 0.3);
  text-align: center;
  margin-left: 10px;
}
.device_info_container {
  display: flex;
  justify-content: space-between;
}
.device_info_charts {
    width: 33%;
    height: 210px;
}
</style>    