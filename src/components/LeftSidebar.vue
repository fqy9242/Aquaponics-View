<template>
    <aside class="left-sidebar">
      <AgriculturalOverview />
      <EquipmentStatusPanel />
      <AlarmInfoPanel />
    </aside>
  </template>
  <script setup>
  import AgriculturalOverview from './AgriculturalOverview.vue';
  import EquipmentStatusPanel from './EquipmentStatusPanel.vue';
  import AlarmInfoPanel from './AlarmInfoPanel.vue';
  import ProductionAnalysisPanel from './ProductionAnalysisPanel.vue';
  </script>