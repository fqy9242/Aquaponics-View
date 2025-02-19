<template>
  <aside class="left-sidebar">
    <AgriculturalOverview />
    <AgricultureLeftSecondPanel />
    <AgricultureLeftThirt />
  </aside>
</template>
<script setup>
import AgriculturalOverview from '@/components/Agriculture/AgriculturalOverview.vue';
import AgricultureLeftSecondPanel from '@/components/Agriculture/AgricultureLeftSecondPanel.vue';
import AgricultureLeftThirt from '@/components/Agriculture/AgricultureLeftThirt.vue';
import ProductionAnalysisPanel from '@/components/Agriculture/ProductionAnalysisPanel.vue';
import { useComponentStore } from '@/stores/component';
</script>