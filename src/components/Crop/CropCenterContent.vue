<template>
  <main class="center-content">
    <CropCenterHeader />
    <centerFirstPanel />
    <MajorCropAndCostTrend />
  </main>
</template>
  
  <script setup>
  import CropCenterHeader from '@/components/Crop/CropCenterHeader.vue'
  import centerFirstPanel from '@/components/Crop/CropCenterFirstPanel.vue';
  import MajorCropAndCostTrend from '@/components/Fish/MajorCropAndCostTrend.vue'
  </script>