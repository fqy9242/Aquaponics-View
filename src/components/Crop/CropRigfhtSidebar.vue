<template>
  <aside class="right-sidebar">
    <WeatherStationPanel />
    <CurrentSensorData />
    <CropWarningInfo />
  </aside>
</template>

<script setup>
import WeatherStationPanel from '@/components/Crop/CropRightFirstPanel.vue';
import CropWarningInfo from '@/components/Crop/CropWarningInfo.vue';
import CurrentSensorData from '@/components/Crop/CurrentSensorData.vue';
</script>