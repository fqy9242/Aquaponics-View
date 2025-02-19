<template>
  <aside class="left-sidebar">
    <OverviewLeftFirstPanel />
    <OverviewSecondPanel />
    <AlarmInfoPanel />
  </aside>
</template>
  <script setup>
  import OverviewLeftFirstPanel from './OverviewLeftFirstPanel.vue';
  import OverviewSecondPanel from './OverviewLeftSecondPanel.vue';
  import AlarmInfoPanel from './OverViewLeftThirtPanel.vue';
  import ProductionAnalysisPanel from './ProductionAnalysisPanel.vue';
  import { useComponentStore } from '@/stores/component';
  </script>