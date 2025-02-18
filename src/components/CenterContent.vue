<template>
  <main class="center-content">
    <!-- <CameraFeedPanel title="大棚" placeholder="[当前大棚地图占位]" :show-controls="false" /> -->
    <!-- <CameraFeedPanel title="摄像头" placeholder="[摄像头视频流/图像占位符]" :show-controls="true" /> -->
    <!-- <img src="@/assets/imgs/agr1.png" alt=""> -->
    <!-- <BottomGraph /> -->
    <LandGeo />
    <FishCoopGeo />
  </main>
</template>
  
  <script setup>
  // import CameraFeedPanel from './CameraFeedPanel.vue';
  // import BottomGraph from '@/components/BottomGraph.vue'
  import BachGeo from '@/components/LandGeo.vue';
  import FishCoopGeo from '@/components/FishCoopGeo.vue';
  </script>