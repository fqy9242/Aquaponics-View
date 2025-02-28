<template>
  <aside class="right-sidebar">
    <FishRightFirstPanel />
    <ProductionAnalysisPanel />
    <!-- <AeratorControlPanel /> -->
  </aside>
</template>

<script setup>
import FishRightFirstPanel  from '@/components/Fish/FishRightFirstPanel.vue';
// import AeratorControlPanel from '@/components/Agriculture/AeratorControlPanel.vue';
import AgricultureWordCloud from '@/components/Agriculture/AgricultureRightThirdPanel.vue';
import ProductionAnalysisPanel from '@/components/Agriculture/AgricultureRightSecondPanel.vue';
</script>