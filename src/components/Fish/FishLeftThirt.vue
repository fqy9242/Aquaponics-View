<script setup>
import { ref, onMounted } from 'vue';
import { listFishingRecordApi } from '@/apis/fish';

// 获取捕捞记录数据
const listFishingRecord = ref([]);
const getListFishingRecord = async () => {
  const res = await listFishingRecordApi();
  listFishingRecord.value = res.data;
};

onMounted(() => {
  getListFishingRecord();
});
</script>

<template>
  <section class="panel-box alarm-info-panel">
    <div class="icon-text-container">
      <svg t="1740103472165" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="23346" width="30" height="30">
        <path d="M296.82 591.22m-26.9 0a26.9 26.9 0 1 0 53.8 0 26.9 26.9 0 1 0-53.8 0Z" p-id="23347" fill="#1afa29">
        </path>
        <path
          d="M902.16 490.56c19.87-39.22 25.85-52 19.38-60.14a12.23 12.23 0 0 0-9-4.54c-14-1-35.9 18.94-74.85 58l-2.78 2.78a366.24 366.24 0 0 0-66.72 91.92 366.17 366.17 0 0 0-66.74-91.92c-40.21-40.21-123.17-74.6-163-91.12-5.4-2.24-10.61-4.39-13.91-5.85 0.38-4 1.18-10.5 1.92-16.42 5.38-43.26 7-65.35 1.38-73.9-2.94-4.52-9.15-6.59-20.14-6.71h-0.94c-41.25 0-147.89 27.76-206.26 111.46a367.5 367.5 0 0 0-125.71 82.54C167.08 494.27 100 562.39 100 596.9s67.12 102.62 74.77 110.27a370.31 370.31 0 0 0 171.87 97.37c28 39.52 71.38 58.78 103.06 63.62a93.43 93.43 0 0 0 13.72 1.15c6.7 0 13.09-1 17.09-4.21 10.45-8.28 7-23.19 3.63-37.6-1.11-4.79-2.26-9.69-2.86-14.18a372.26 372.26 0 0 0 220.13-106.15 366.46 366.46 0 0 0 67.12-92.67c18.85 32.91 64.22 103.91 82.4 103.91a5.81 5.81 0 0 0 2-0.32c9.84-3.47 8.62-16.72 5.68-48.75-1.88-20.45-4.22-45.91-2-62.84 4.46-34.79 28.21-81.69 45.55-115.94zM690 695.81a356.3 356.3 0 0 1-218 102.33 8 8 0 0 0-7.25 8.75c-0.09 7.83 1.85 16.17 3.74 24.24 1.59 6.77 4.52 19.39 2.32 21.16-8.44 4.38-74.65-3.52-112.43-59l-1.3-1.53-4-2.17a354.33 354.33 0 0 1-167-93.77 545.98 545.98 0 0 1-24.4-26.07c18.53-1.75 50.86-7.5 78.63-26.23a8 8 0 1 0-9-13.33C199 652 158 654.19 148.79 654.4 129.88 630.93 116 608.77 116 596.9c0-18.9 35.29-64.1 70.1-98.9a351.76 351.76 0 0 1 122.47-79.83l2.34-0.9 1.4-2.07c56.77-83.43 161.54-106.67 194.53-106.67a33.12 33.12 0 0 1 7.79 0.7c2.34 9.65-2.2 46-4.17 62-2.59 20.79-2.86 23.57-1.29 26.75 1.74 3.5 3 4 23.07 12.34C568.1 425.21 652.08 460 690 498a352 352 0 0 1 69.23 98.92A352.3 352.3 0 0 1 690 695.81z m150.57-91.38c-2.42 18.7-0.09 44 2 66.39 0.78 8.5 1.68 18.26 2 25.45-16.79-18.27-52.38-68.34-67.57-99.4A351.72 351.72 0 0 1 846.25 498l2.68-2.69c11.35-11.37 42.91-43 57.52-51.33-3.33 9.13-11.65 25.54-18.63 39.34-17.82 35.26-42.34 83.58-47.2 121.1zM154.87 409.58a37.09 37.09 0 1 0-37.09-37.1 37.14 37.14 0 0 0 37.09 37.1z m0-58.11a21 21 0 1 1-21 21 21 21 0 0 1 21-21.01zM252 260.34a52.83 52.83 0 1 0-52.83-52.83A52.89 52.89 0 0 0 252 260.34z m0-89.58a36.76 36.76 0 1 1-36.76 36.75A36.79 36.79 0 0 1 252 170.76z"
          p-id="23348" fill="#1afa29"></path>
        <path
          d="M477.95 522.23a8 8 0 0 0-10.36 12.28c0.2 0.18 21 18.88 21 69.69 0 51.17-21.06 72-21.22 72.15a8 8 0 1 0 10.92 11.79c1.08-1 26.37-25.14 26.37-83.93-0.03-59.04-25.66-81.07-26.71-81.98z"
          p-id="23349" fill="#1afa29"></path>
      </svg>
      <h2 class="panel-title">捕捞记录</h2>
    </div>

    <div class="alarm-table-container" ref="tableContainer"
      style="overflow: hidden; height: 300px; position: relative;">
      <el-table :data="listFishingRecord" height="310" style="width: 100%" class="custom-alarm-table">
        <el-table-column prop="fishName" label="鱼种名称" width="100" />
        <el-table-column prop="weight" label="重量" width="80" />
        <el-table-column prop="quality" label="总体质量" width="80" />
        <el-table-column prop="fishingTime" label="捕捞时间" width="130" />
      </el-table>
    </div>
  </section>
</template>

<style scoped>
.icon-text-container {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  text-align: center;
}

.panel-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-left: 10px;
}

.alarm-table-container {
  overflow: hidden;
  height: 229px;
  position: relative;
}

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
</style>