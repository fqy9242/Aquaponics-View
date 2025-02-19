<template>
  <aside class="right-sidebar">
    <WeatherStationPanel />
    <ProductionAnalysisPanel />
    <!-- <AeratorControlPanel /> -->
    <AgricultureWordCloud />
  </aside>
</template>

<script setup>
import WeatherStationPanel from '@/components/Fish/WeatherStationPanel.vue';
// import AeratorControlPanel from '@/components/Fish/AeratorControlPanel.vue';
import AgricultureWordCloud from '@/components/Fish/AgricultureWordCloud.vue';
import ProductionAnalysisPanel from '@/components/Fish/ProductionAnalysisPanel.vue';
</script>