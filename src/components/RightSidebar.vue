<template>
    <aside class="right-sidebar">
      <WeatherStationPanel />
      <AeratorControlPanel />
      <ProductionAnalysisPanel />
    </aside>
  </template>
  
  <script setup>
  import WeatherStationPanel from './WeatherStationPanel.vue';
  import AeratorControlPanel from './AeratorControlPanel.vue';
  import ProductionAnalysisPanel from './ProductionAnalysisPanel.vue';
  </script>