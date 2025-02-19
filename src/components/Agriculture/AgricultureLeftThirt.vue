<script setup>
import { ref, onMounted } from 'vue';
import { harvestListApi } from '@/apis/agriculture';

// 获取采摘记录数据
const harvestListData = ref([]);
const getHarvestListData = async () => {
  const res = await harvestListApi();
  harvestListData.value = res.data;
};

onMounted(() => {
  getHarvestListData();
});
</script>

<template>
  <section class="panel-box alarm-info-panel">
    <div class="icon-text-container">
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
      <el-table :data="harvestListData" height="300" style="width: 100%" class="custom-alarm-table">
        <el-table-column prop="name" label="产物名称" width="100" />
        <el-table-column prop="weight" label="重量" width="80" />
        <el-table-column prop="harvestQuality" label="采摘质量" width="80" />
        <el-table-column prop="harvestDataTime" label="采摘时间" width="130" />
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