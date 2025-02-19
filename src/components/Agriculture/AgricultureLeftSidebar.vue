<template>
  <aside class="left-sidebar">
    <AgriculturalOverview />
    <EquipmentStatusPanel />
    <AgricultureLeftThirt />
  </aside>
</template>
<script setup>
import AgriculturalOverview from '@/components/Agriculture/AgriculturalOverview.vue';
import EquipmentStatusPanel from '@/components/Agriculture/EquipmentStatusPanel.vue';
import AgricultureLeftThirt from '@/components/Agriculture/AgricultureLeftThirt.vue';
import ProductionAnalysisPanel from '@/components/Agriculture/ProductionAnalysisPanel.vue';
import { useComponentStore } from '@/stores/component';
</script>