<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Crop, Histogram, Warning } from '@element-plus/icons-vue' // 引入 Element Plus 图标
import { getDeviceWarningApi } from '@/apis/overView';
const warningData = ref([]);
// 获取设备告警信息
const getDeviceWarning = async () => {
    const res = await getDeviceWarningApi();
    warningData.value = res.rows;
};
// 轮播表配置
const config = reactive({
  header: ['批次', '分区', '预警信息', '结果'],
  data: warningData,
  index: true,
  columnWidth: [130, 60, 150, 70], // 根据表格列的数量调整宽度
  align: ['center'],
});





onMounted(() => {
  getDeviceWarning()
})

</script>
<template>
  <section class="panel-box alarm-info-panel">
    <div style="display: flex; align-items: center; text-align: center;">
      <svg t="1739712182404" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="4210" width="30" height="30">
        <path
          d="M743.5 598.6c-40.4 0-73.2 32.8-73.2 73.3s32.8 73.3 73.2 73.3c40.4 0 73.2-32.8 73.2-73.3-0.1-40.5-32.8-73.3-73.2-73.3z m0 104.1c-17 0-30.8-13.8-30.8-30.8s13.8-30.8 30.8-30.8 30.8 13.8 30.8 30.8-13.8 30.8-30.8 30.8z"
          p-id="4211" fill="#d81e06"></path>
        <path
          d="M651.6 513.8l-91.2 158.1L651.6 830h182.3L925 672v-0.3l-91.1-158H651.6z m157.9 273.8H676.1l-66.7-115.7 66.7-115.7h133.4l66.7 115.7-66.7 115.7z"
          p-id="4212" fill="#d81e06"></path>
        <path
          d="M473.7 647.9c-20.6 0-37.1 16.5-37.1 37.1s16.5 37.1 37.1 37.1 37.1-16.5 37.1-37.1c-0.1-20.6-16.6-37.1-37.1-37.1z"
          p-id="4213" fill="#d81e06"></path>
        <path
          d="M732.7 491.1L576.9 227.3c-24.7-41.2-65.9-65.9-111.2-65.9s-86.5 24.7-111.2 65.9L119.8 630.9c-12.4 20.6-18.5 43.2-18.5 65.4 0 22.1 6.2 43.8 18.5 62.3 24.7 41.2 65.9 61.8 111.2 61.8h384.9l3.6 0.3-31-53.8H226.8c-24.7 0-49.4-12.4-61.8-32.9-12.4-20.6-12.4-49.4 0-70l234.7-403.6c12.4-20.6 37.1-37.1 61.8-37.1 24.7 0 49.4 12.4 61.8 37.1l131.9 230.8h77.5z"
          p-id="4214" fill="#d81e06"></path>
        <path
          d="M465.4 388.5c-16.5 4.1-28.8 20.6-28.8 41.2 0 12.4 0 24.7 4.1 37.1 4.1 45.3 4.1 86.5 8.2 131.8 0 16.5 12.4 24.7 28.8 24.7 16.5 0 28.8-12.4 28.8-28.8v-28.8c0-28.8 4.1-57.7 4.1-86.5 0-20.6 4.1-37.1 4.1-57.7 0-8.2 0-12.4-4.1-20.6-8.1-8.3-28.7-16.5-45.2-12.4z"
          p-id="4215" fill="#d81e06"></path>
      </svg>
      <h2 class="panel-title">
        告警信息
      </h2>
    </div>

    <div class="alarm-table-container" ref="tableContainer"
      style="overflow: hidden; height: 229px; position: relative;">
      <!-- <el-table :data="warningData" height="300" style="width: 100%" class="custom-alarm-table">
        <el-table-column prop="cropBatch" label="批次" width="130" />
        <el-table-column prop="partitionInfo" label="分区" width="60" />
        <el-table-column prop="thresholdValue" label="预警阈值" width="150" />
        <el-table-column prop="warningStatus" label="结果" width="70" />
      </el-table> -->
      <dv-scroll-board :config="config" style="width:100%;height:220px" />
    </div>
  </section>
</template>
<style scoped>


/* .panel-title {
  font-size: 1.5em;
  color: #333; /* 深色标题 */
  /* margin-bottom: 15px; */
/* } */ 

/* .alarm-table-container {
    overflow-x: auto;
    margin-top: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    background-color: #fff; /* 白色表格容器背景 */
/* } */ 

.custom-alarm-table {
    --el-table-border-color: #e0e0e0; /* 更柔和的边框颜色 */
    --el-table-border: solid 1px var(--el-table-border-color);
    --el-table-text-color: #57cb5c; /* 深色文字 */
    --el-table-header-text-color: #e14911; /* 稍浅的表头文字 */
    --el-table-row-hover-bg-color: #f5f5f5; /* 浅灰色 hover 背景 */
    --el-table-current-row-bg-color: #e8f7ff; /* 更明显的选中行背景 */
    --el-table-header-bg-color: transparent; /* 浅灰色表头背景 */
    --el-table-bg-color: transparent; /* 白色表格背景 */
    --el-table-tr-bg-color: transparent;
    --el-table-expanded-cell-bg-color: transparent;
}

/* 可以根据需要自定义滚动条样式，例如使用 webkit 滚动条 */
/* 示例： */
/*
.alarm-table-container::-webkit-scrollbar {
  width: 8px;
}

.alarm-table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.alarm-table-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.alarm-table-container::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
*/
</style>