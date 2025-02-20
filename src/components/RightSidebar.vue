<template>
  <aside class="right-sidebar">
    <OverviewRightFirst />
    <ProductionAnalysisPanel />
    <!-- <AeratorControlPanel /> -->
    <AgricultureWordCloud />

  </aside>
</template>
  
  <script setup>
  import OverviewRightFirst from '@/components/OverviewRightFirst.vue';
  // import AeratorControlPanel from './AeratorControlPanel.vue';
  import AgricultureWordCloud from '@/components/OverviewRightThirPanel.vue';
  import ProductionAnalysisPanel from './OverviewRightSecondPanel.vue';
  </script>