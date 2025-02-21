<template>
  <aside class="left-sidebar">
    <FishLeftFirstPanel />
    <FishLeftSecondPanel />
    <FishLeftThirt />
  </aside>
</template>
<script setup>
import FishLeftFirstPanel from '@/components/Fish/FishLeftFirstPanel.vue';
import FishLeftSecondPanel from '@/components/Fish/FishLeftSecondPanel.vue';
import FishLeftThirt from '@/components/Fish/FishLeftThirt.vue';
import ProductionAnalysisPanel from '@/components/Fish/FishRightSecondPanel.vue';
import { useComponentStore } from '@/stores/component';
</script>