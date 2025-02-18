<template>
  <aside class="right-sidebar">
    <WeatherStationPanel />
    <ProductionAnalysisPanel />
    <!-- <AeratorControlPanel /> -->
    <AgricultureWordCloud />
    
  </aside>
</template>
  
  <script setup>
  import WeatherStationPanel from './WeatherStationPanel.vue';
  // import AeratorControlPanel from './AeratorControlPanel.vue';
  import AgricultureWordCloud from '@/components/AgricultureWordCloud.vue';
  import ProductionAnalysisPanel from './ProductionAnalysisPanel.vue';
  </script>