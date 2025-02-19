<template>
  <aside class="right-sidebar">
    <WeatherStationPanel />
    <ProductionAnalysisPanel />
    <!-- <AeratorControlPanel /> -->
    <AgricultureWordCloud />
  </aside>
</template>

<script setup>
import WeatherStationPanel from '@/components/Agriculture/WeatherStationPanel.vue';
// import AeratorControlPanel from '@/components/Agriculture/AeratorControlPanel.vue';
import AgricultureWordCloud from '@/components/Agriculture/AgricultureWordCloud.vue';
import ProductionAnalysisPanel from '@/components/Agriculture/ProductionAnalysisPanel.vue';
</script>