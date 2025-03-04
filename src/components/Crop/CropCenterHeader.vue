<!-- Author: qht -->
<!-- Date: 2025-03-04 -->
<script setup>
import { ref } from 'vue'
const farmMetrics = ref([
    {
        title: '当前种植面积',
        value: '800亩',
        icon: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm138-209.8H511.3v-62.4c0-43.8 25.6-68.2 70.1-92 39.3-21.6 56.2-35.2 56.2-55.8 0-28.3-22.7-46.5-53.5-46.5-31.4 0-52 19.9-52 47.5h-72.6c0-66 51.4-112 127.3-112 72.2 0 124 43.6 124 105 0 50.4-29 76.5-76 99.3-34.1 16.3-47.2 25.2-47.2 48.9V650h149v72.2zm-148-84.4h152v38.6h-152v-38.6z',
        color: 'linear-gradient(135deg, #1afa29 0%, #00b4ff 100%)'
    },
    {
        title: '今日农事任务',
        value: '12项',
        icon: 'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM368 744c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8V280c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v464zm192-280c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8V280c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v184zm192 72c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8V280c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v256z',
        color: 'linear-gradient(135deg, #ffdb5c 0%, #fb7293 100%)'
    },
    {
        title: '设备在线率',
        value: '98%',
        icon: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm-24-532c0-13.3 10.7-24 24-24h184c13.3 0 24 10.7 24 24v48c0 13.3-10.7 24-24 24H512c-13.3 0-24-10.7-24-24v-48zm0 224h184c13.3 0 24 10.7 24 24v48c0 13.3-10.7 24-24 24H512c-13.3 0-24-10.7-24-24v-48c0-13.3 10.7-24 24-24zm-8.5-312h185c4.1 0 7.5 3.4 7.5 7.5v45c0 4.1-3.4 7.5-7.5 7.5h-185c-4.1 0-7.5-3.4-7.5-7.5v-45c0-4.1 3.4-7.5 7.5-7.5z',
        color: 'linear-gradient(135deg, #00f7ff 0%, #9a5dff 100%)'
    },
    {
        title: '环境评分',
        value: 'A+',
        icon: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm138-224c0 23.4-19.3 42.5-43 42.5H417c-23.7 0-43-19.1-43-42.5s19.3-42.5 43-42.5h98V369c0-23.1 19.2-41 42.5-41s41.5 17.9 41.5 41v189h98c23.7 0 43 19.1 43 42.5z',
        color: 'linear-gradient(135deg, #ff6b6b 0%, #ff9f43 100%)'
    }
])
</script>

<template>
    <div class="panel-box">
        <div class="metric-grid">
            <div v-for="(item, index) in farmMetrics" :key="index" class="metric-card"
                :style="{ background: item.color }">
                <div class="card-glow"></div>
                <svg class="metric-icon" viewBox="0 0 1024 1024">
                    <path :d="item.icon" fill="rgba(255,255,255,0.9)" />
                </svg>
                <div class="metric-content">
                    <div class="metric-title">{{ item.title }}</div>
                    <div class="metric-value">{{ item.value }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel-box {
    padding: 20px;
    background: rgba(9, 44, 88, 0.3);
    border-radius: 12px;
    margin-bottom: 20px;
}

.metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px;
}

.metric-card {
    position: relative;
    padding: 20px;
    border-radius: 10px;
    overflow: hidden;
    backdrop-filter: blur(5px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.metric-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 180, 255, 0.2);
}

.card-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%);
    animation: glowFlow 3s infinite;
}

@keyframes glowFlow {
    0% {
        left: -100%;
    }

    100% {
        left: 100%;
    }
}

.metric-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 15px;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
}

.metric-content {
    position: relative;
    z-index: 1;
}

.metric-title {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    margin-bottom: 8px;
}

.metric-value {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    font-family: 'DigifaceWide', sans-serif;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}
</style>