<template>
    <main class="center-content">
      <CameraFeedPanel title="大棚" placeholder="[当前大棚地图占位]" :show-controls="false" />
      <CameraFeedPanel title="摄像头" placeholder="[摄像头视频流/图像占位符]" :show-controls="true" />
    </main>
  </template>
  
  <script setup>
  import CameraFeedPanel from './CameraFeedPanel.vue';
  </script>