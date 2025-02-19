<template>
  <aside class="left-sidebar">
    <AgriculturalOverview />
    <EquipmentStatusPanel />
    <AlarmInfoPanel />
  </aside>
</template>
<script setup>
import AgriculturalOverview from '@/components/Fish/AgriculturalOverview.vue';
import EquipmentStatusPanel from '@/components/Fish/EquipmentStatusPanel.vue';
import AlarmInfoPanel from '@/components/Fish/AlarmInfoPanel.vue';
import ProductionAnalysisPanel from '@/components/Fish/ProductionAnalysisPanel.vue';
import { useComponentStore } from '@/stores/component';
</script>