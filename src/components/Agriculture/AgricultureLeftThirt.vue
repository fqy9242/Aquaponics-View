<script setup>
import { ref, onMounted, watch } from 'vue';
import { harvestListApi } from '@/apis/agriculture';

// 获取采摘记录数据
const harvestListData = ref([]);

const config = ref({
  header: ['产品名称', '重量', '采摘质量', '描述', '采摘时间'],
  headerBGC: 'transparent',
  data: [],
  index: true,
  columnWidth: [50, 110, 100, 120, 150, 200],
  align: ['center'],
});

const fetchHarvestListData = async () => {
  const res = await harvestListApi();
  harvestListData.value = res.data.map(item => [
    item.name,
    item.weight,
    item.harvestQuality,
    item.description,
    item.harvestDataTime
  ]);
};

// 监听 harvestListData 的变化，并更新 config.data
watch(harvestListData, (newData) => {
  config.value.data = newData;
});

onMounted(() => {
  fetchHarvestListData();
});
</script>

<template>
  <section class="panel-box alarm-info-panel">
    <div style="display: flex; align-items: center; text-align: center;">
      <svg t="1739963094340" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="6400" width="20" height="30">
        <path
          d="M970.86577778 401.18044445H840.81777778C808.61866667 249.17333333 673.45066667 134.82666667 512 134.82666667S215.38133333 249.17333333 183.18222222 401.18044445H53.13422222c-30.83377778 0-51.54133333 31.63022222-39.25333333 59.8471111l175.21777778 402.432c6.82666667 15.58755555 22.18666667 25.71377778 39.25333333 25.71377778h567.296c17.06666667 0 32.42666667-10.12622222 39.25333333-25.71377778l175.21777778-402.432c12.288-28.21688889-8.41955555-59.84711111-39.25333333-59.8471111zM512 214.47111111c117.19111111 0 216.29155555 79.07555555 246.784 186.70933334H265.216C295.70844445 293.54666667 394.80888889 214.47111111 512 214.47111111zM342.12977778 754.00533333c-49.83466667 0-90.112-40.39111111-90.112-90.112s40.39111111-90.112 90.112-90.112c49.83466667 0 90.112 40.39111111 90.112 90.112s-40.39111111 90.112-90.112 90.112z m339.74044444-1.25155555c-49.83466667 0-90.112-40.39111111-90.112-90.112 0-49.83466667 40.39111111-90.112 90.112-90.112 49.83466667 0 90.112 40.39111111 90.112 90.112 0.11377778 49.72088889-40.27733333 90.112-90.112 90.112z"
          fill="#4CD392" p-id="6401"></path>
      </svg>
      <h2 class="panel-title">采摘记录</h2>
    </div>

    <div class="alarm-table-container" ref="tableContainer"
      style="overflow: hidden; height: 229px; position: relative;">
      <dv-scroll-board :config="config" style="width:100%;height:220px" />
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