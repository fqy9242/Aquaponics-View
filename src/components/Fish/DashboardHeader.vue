<script setup>
import { ref, watch } from 'vue';
import { useComponentStore } from '@/stores/component';
const componentStore = useComponentStore();
const tabs = ref(['整体情况', '种植模块', '养殖模块']);

// 监听 componentStore.currentTab 的变化
watch(() => componentStore.currentTab, (newTab) => {
  currentTab.value = newTab;
});

// 监听 currentTab 的变化并更新 componentStore.currentTab
const currentTab = ref(componentStore.currentTab);
watch(currentTab, (newTab) => {
  componentStore.currentTab = newTab;
});
</script>

<template>
  <!-- 多个大屏切换的 tab -->
  <nav class="tab-nav">
    <ul>
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: currentTab === index }"
        @click="currentTab = index">
        {{ tab }}
      </li>
    </ul>
  </nav>
  <header class="dashboard-header">
    <h1 class="header-title">鱼 菜 共 生 数 据 监 控 中 心</h1>
  </header>
</template>

<style scoped>
.tab-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
}

.tab-nav li {
  padding: 10px 20px;
  cursor: pointer;
  color: white;
}

.tab-nav li.active {
  font-weight: bold;
  border-bottom: 2px solid #000;
}
</style>