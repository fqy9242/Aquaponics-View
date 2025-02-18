<template>
    <aside class="left-sidebar">
      <WaterQualityPanel />
      <EquipmentStatusPanel />
      <AlarmInfoPanel />
     
    </aside>
  </template>
  
  <script setup>
  import WaterQualityPanel from './WaterQualityPanel.vue';
  import EquipmentStatusPanel from './EquipmentStatusPanel.vue';
  import AlarmInfoPanel from './AlarmInfoPanel.vue';
  import ProductionAnalysisPanel from './ProductionAnalysisPanel.vue';
  </script>