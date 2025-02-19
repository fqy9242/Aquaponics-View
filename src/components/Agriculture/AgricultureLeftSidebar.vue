<template>
  <aside class="left-sidebar">
    <AgriculturalOverview />
    <EquipmentStatusPanel />
    <AlarmInfoPanel />
  </aside>
</template>
<script setup>
import AgriculturalOverview from '@/components/Agriculture/AgriculturalOverview.vue';
import EquipmentStatusPanel from '@/components/Agriculture/EquipmentStatusPanel.vue';
import AlarmInfoPanel from '@/components/Agriculture/AlarmInfoPanel.vue';
import ProductionAnalysisPanel from '@/components/Agriculture/ProductionAnalysisPanel.vue';
import { useComponentStore } from '@/stores/component';
</script>