<script setup>
import { defineAsyncComponent } from 'vue';
import * as echarts from 'echarts';
import './assets/styles/dashboard.css';
import { useComponentStore } from './stores/component';

// const componentStore = useComponentStore();

// const Index = defineAsyncComponent(() => import('./views/index.vue'));
// const AgrIndex = defineAsyncComponent(() => import('./views/agriculture/index.vue'));
// const FishIndex = defineAsyncComponent(() => import('./views/fish/index.vue'));

</script>
<template>
  <!-- <Index v-show="componentStore.currentTab == 0" />
  <AgrIndex v-show="componentStore.currentTab == 1" />
  <FishIndex v-show="componentStore.currentTab == 2" /> -->
  <RouterView />
</template>
<style scoped></style>