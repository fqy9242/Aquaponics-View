<script setup>
import { ref, watch } from 'vue';
import { useComponentStore } from '@/stores/component';
import { useRouter } from 'vue-router';

const componentStore = useComponentStore();
const router = useRouter();
const tabs = ref(['整体情况', '养殖模块', '种植模块']);

// 监听 componentStore.currentTab 的变化
watch(() => componentStore.currentTab, (newTab) => {
  currentTab.value = newTab;
});

// 监听 currentTab 的变化并更新 componentStore.currentTab
const currentTab = ref(componentStore.currentTab);
watch(currentTab, (newTab) => {
  componentStore.currentTab = newTab;
});

// 切换路由
const switchTab = (index) => {
  currentTab.value = index;
  switch (index) {
    case 0:
      router.push('/');
      break;
    case 1:
      router.push('/fish');
      break;
    case 2:
      router.push('/crop');
      break;
  }
};

// 将日期和时间分开
const currentDate = ref(formatDate(new Date()));
const currentTime = ref(new Date().toLocaleTimeString('zh-CN'));

// 新增：日期格式化函数
function formatDate(date) {
  const weekdays = "日一二三四五六";
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日星期${weekdays[date.getDay()]}`;
}

setInterval(() => {
  const now = new Date();
  currentDate.value = formatDate(now);
  currentTime.value = now.toLocaleTimeString('zh-CN');
}, 1000);
</script>

<template>
  <!-- 多个大屏切换的 tab -->
  <nav class="tab-nav">
    <ul>
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: currentTab === index }" @click="switchTab(index)">
        {{ tab }}
      </li>
    </ul>
  </nav>
  <header class="dashboard-header">
    <h1 class="header-title">鱼 菜 共 生 大 数 据 监 控 中 心</h1>
    <div class="date-time">
      <div class="current-date">{{ currentDate }}</div>
      <div class="current-time">{{ currentTime }}</div>
    </div>
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
  border-bottom: 2px solid #1eda09;
}

.dashboard-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-title {
  margin: 0;
  font-size: 2.5em;
  /* 渐变文字效果，更清晰些 */
  background: linear-gradient(90deg, rgba(0,247,255,0.9), rgba(18,150,219,0.9), rgba(26,250,41,0.9));
  -webkit-background-clip: text;
  -webkit-text-fill-color: initial;  
  color: white;  /* 默认颜色 */
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
}

.date-time {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  color: white;
  /* margin-top: 0.5rem; */
}

.current-date, .current-time {
  margin-top: -50px;  
  font-family: 'DigifaceWide', sans-serif;
    font-size: 1.8em;
    font-weight: 500;
    letter-spacing: 2px;
    position: relative;
    padding: 8px 20px;
    background: linear-gradient(90deg,
        rgba(0, 247, 255, 0.1) 0%,
        rgba(0, 180, 255, 0.15) 50%,
        rgba(0, 247, 255, 0.1) 100%);
    border-radius: 4px;
    box-shadow: 0 0 15px rgba(0, 247, 255, 0.2);
    animation: textGlow 2s ease-in-out infinite alternate;
}
/* 日期特殊样式 */
.current-date {
  color: #00f7ff;
  border: 1px solid rgba(0, 247, 255, 0.3);
}

/* 时间特殊样式 */
.current-time {
  color: #00ff9d;
  border: 1px solid rgba(0, 255, 157, 0.3);
}
/* 装饰性伪元素 */
.current-date::before,
.current-time::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f7ff, transparent);
}

.current-date::before {
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
}

.current-time::after {
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
}

/* 动画效果 */
@keyframes textGlow {
  0% {
    text-shadow: 0 0 5px rgba(0, 247, 255, 0.3);
  }

  100% {
    text-shadow: 0 0 15px rgba(0, 247, 255, 0.6),
      0 0 25px rgba(0, 247, 255, 0.3);
  }
}
</style>