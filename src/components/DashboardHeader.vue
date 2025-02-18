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

<script setup>
import { ref } from 'vue'

const tabs = ref(['整体情况', '种植模块', '养殖模块'])
const currentTab = ref(0)
</script>

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