<template>
  <aside class="right-sidebar">
    <WeatherStationPanel />
    <ProductionAnalysisPanel />
    <!-- <AeratorControlPanel /> -->
    <AgricultureWordCloud />
  </aside>
</template>

<script setup>
import WeatherStationPanel from '@/components/Agriculture/AgricultureRightFirstPanel.vue';
// import AeratorControlPanel from '@/components/Agriculture/AeratorControlPanel.vue';
import AgricultureWordCloud from '@/components/Agriculture/AgricultureWordCloud.vue';
import ProductionAnalysisPanel from '@/components/Agriculture/AgricultureRightSecondPanel.vue';
</script>