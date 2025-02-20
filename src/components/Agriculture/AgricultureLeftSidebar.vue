<template>
  <aside class="left-sidebar">
    <AgricultureLeftFirstPanel />
    <AgricultureLeftSecondPanel />
    <AgricultureLeftThirt />
  </aside>
</template>
<script setup>
import AgricultureLeftFirstPanel from '@/components/Agriculture/AgricultureLeftFirstPanel.vue';
import AgricultureLeftSecondPanel from '@/components/Agriculture/AgricultureLeftSecondPanel.vue';
import AgricultureLeftThirt from '@/components/Agriculture/AgricultureLeftThirt.vue';
import ProductionAnalysisPanel from '@/components/Agriculture/AgricultureRightSecondPanel.vue';
import { useComponentStore } from '@/stores/component';
</script>