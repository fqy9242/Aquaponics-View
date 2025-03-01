<script setup>
import { ref, onMounted } from 'vue';
import { getDeviceWarningApi } from '@/apis/overView';

const warningData = ref([]);

const config = ref({
  header: ['批次', '分区', '预警信息', '结果', '预警时间'],
  headerBGC: 'transparent',
  data: warningData.value,
  index: true,
  columnWidth: [50, 110, 60, 250, 70, 120],
  align: ['center'],
});
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${month}-${day} ${hours}: ${minutes}`;
};

const getDeviceWarning = async () => {
  const res = await getDeviceWarningApi();
  warningData.value = res.data.map(item => [
    item.cropBatch,
    item.partitionInfo,
    item.thresholdValue,
    item.warningStatus,
    formatDate(item.startTime)
  ]);
  config.value.data = warningData.value;
};

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
      <h2 class="panel-title">告警信息</h2>
    
    </div>

    <div class="alarm-table-container" ref="tableContainer"
      style="overflow: hidden; height: 365px; position: relative;">
      <dv-scroll-board :config="config" style="width:100%;height:360px" />
    </div>
  </section>
</template>

<style scoped>
/* 核心修改部分 */
:deep(.dv-scroll-board) {
  /* 表头橙色 */
  --dv-scroll-board-header-text-color: #FFA500;
  /* 数据行绿色 */
  --dv-scroll-board-text-color: #00FF00;

  /* 原有样式 */
  --dv-scroll-board-border-color: transparent;
}

/* 以下为原有样式（保持功能不变） */
:deep(.dv-scroll-board .header-column) {
  background-color: transparent !important;
  font-size: 16px;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
}

:deep(.dv-scroll-board .row-item:hover) {
  background-color: rgba(255, 255, 255, 0.9) !important;
  color: #333 !important;
}

:deep(.dv-scroll-board .rows .row-item) {
  background-color: transparent !important;
  transition: all 0.3s ease;
}

:deep(.dv-scroll-board .index) {
  background-color: rgba(225, 73, 17, 0.3) !important;
}

:deep(.dv-scroll-board ::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

:deep(.dv-scroll-board ::-webkit-scrollbar-thumb) {
  background-color: rgba(0, 255, 0, 0.3);
  border-radius: 3px;
}

:deep(.dv-scroll-board ::-webkit-scrollbar-track) {
  background-color: transparent;
}

.icon {
  margin-right: 8px;
}

.panel-title {
  color: #00ff00;
  margin: 12px 0;
}
</style>