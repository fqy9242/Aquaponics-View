<script setup>
// import { defineAsyncComponent } from 'vue';
import '@/assets/styles/dashboard.css';
import autofit from "autofit.js";
import { onMounted, onBeforeUnmount } from 'vue';


onMounted(() => {
  autofit.init({
    dw: 1920,
    dh: 1380,
    el: "#app",
    autoFitHeight: false,  // 关闭高度自适应
    resize: true
  },
    false
  )
});

onBeforeUnmount(() => {
  autofit.off();
})
</script>
<template>
  <RouterView />
</template>
<style scoped>

</style>