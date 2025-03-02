<script setup>
import { ref } from 'vue'

// 固定数据
const totalPlantingArea = ref(500)
const totalBreedingArea = ref(300)
const plantingAreaGrowth = ref(5)
const breedingAreaGrowth = ref(-3)

// 颜色配置
const colors = {
    primary: '#3AAFA9',
    secondary: '#5AE27C',
    warning: '#FFB74D',
    error: '#FF6B6B',
    textPrimary: '#E0FFFE',
    textSecondary: '#8CD3D0',
    background: 'linear-gradient(152deg, #0B2730 0%, #0D313D 100%)'
}
</script>

<template>
    <div class="kpi-panel">
        <div class="kpi-container">
            <!-- 种植面积卡片 -->
            <div class="kpi-card" :class="{ 'growth': plantingAreaGrowth > 0, 'decline': plantingAreaGrowth < 0 }">
                <div class="card-header">
                    <svg class="icon" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.7,13.3l-3,3c-0.4,0.4-1,0.4-1.4,0l-3-3
              c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.3,1.3V8c0-0.6,0.4-1,1-1s1,0.4,1,1v5.2l1.3-1.3c0.4-0.4,1-0.4,1.4,0S17.1,12.9,16.7,13.3z" />
                    </svg>
                    <h3 class="card-title">种植总面积</h3>
                </div>
                <div class="card-body">
                    <div class="main-value">{{ totalPlantingArea }}<span class="unit">m²</span></div>
                    <div class="growth-rate" :class="plantingAreaGrowth > 0 ? 'positive' : 'negative'">
                        <span class="trend-icon">{{ plantingAreaGrowth > 0 ? '↑' : '↓' }}</span>
                        {{ Math.abs(plantingAreaGrowth) }}%
                    </div>
                </div>
                <div class="card-footer">年同比{{ plantingAreaGrowth > 0 ? '增长' : '下降' }}</div>
            </div>

            <!-- 养殖面积卡片 -->
            <div class="kpi-card" :class="{ 'growth': breedingAreaGrowth > 0, 'decline': breedingAreaGrowth < 0 }">
                <div class="card-header">
                    <svg class="icon" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22,14h-0.7c-0.4,1.2-1.1,2.3-2.1,3.1l0.5,1.9l-1.9,0.5l-0.5-1.9c-0.9,0.5-1.9,0.8-3,0.9V22h-2v-3.1
              c-1.8-0.2-3.4-1.1-4.6-2.4l-1.4,1.4l-1.4-1.4l1.4-1.4C6.1,14.4,5,12.8,5,11c0-2.8,2.2-5,5-5c0.7,0,1.3,0.1,1.9,0.3l1-1.9
              C12.1,4.2,11.6,4,11,4C7.1,4,4,7.1,4,11c0,2.1,1.1,4.1,2.9,5.2C7.5,17.6,9.6,18,12,18c2.3,0,4.4-0.6,6.1-1.7C19.6,15.9,21,13.6,21,11
              h2V14z" />
                    </svg>
                    <h3 class="card-title">养殖总面积</h3>
                </div>
                <div class="card-body">
                    <div class="main-value">{{ totalBreedingArea }}<span class="unit">m²</span></div>
                    <div class="growth-rate" :class="breedingAreaGrowth > 0 ? 'positive' : 'negative'">
                        <span class="trend-icon">{{ breedingAreaGrowth > 0 ? '↑' : '↓' }}</span>
                        {{ Math.abs(breedingAreaGrowth) }}%
                    </div>
                </div>
                <div class="card-footer">年同比{{ breedingAreaGrowth > 0 ? '增长' : '下降' }}</div>
            </div>
        </div>

        <!-- 动态背景效果 -->
        <div class="dynamic-bg">
            <div class="scan-line"></div>
            <div class="glow-effect"></div>
        </div>
    </div>
</template>

<style scoped>
.kpi-panel {
    position: relative;
    height: 220px;
    padding: 20px;
    border-radius: 16px;
    background: v-bind('colors.background');
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.kpi-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    height: 100%;
    position: relative;
    z-index: 2;
}

.kpi-card {
    position: relative;
    padding: 20px;
    background: rgba(16, 36, 48, 0.6);
    border-radius: 12px;
    backdrop-filter: blur(8px);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(58, 175, 169, 0.2);
    }

    &.growth {
        border-top: 2px solid #5AE27C;
    }

    &.decline {
        border-top: 2px solid #FF6B6B;
    }
}

.card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    .icon {
        width: 28px;
        height: 28px;
        color: v-bind('colors.primary');
        filter: drop-shadow(0 0 6px rgba(58, 175, 169, 0.4));
    }

    .card-title {
        margin: 0;
        color: v-bind('colors.textPrimary');
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.5px;
    }
}

.card-body {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 12px;

    .main-value {
        color: v-bind('colors.textPrimary');
        font-size: 32px;
        font-family: 'Roboto Condensed', sans-serif;
        font-weight: 700;

        .unit {
            font-size: 14px;
            color: v-bind('colors.textSecondary');
            margin-left: 4px;
        }
    }

    .growth-rate {
        font-size: 14px;
        font-weight: 500;
        padding: 4px 10px;
        border-radius: 6px;

        &.positive {
            background: rgba(90, 226, 124, 0.15);
            color: #5AE27C;
        }

        &.negative {
            background: rgba(255, 107, 107, 0.15);
            color: #FF6B6B;
        }

        .trend-icon {
            font-weight: 700;
            margin-right: 4px;
        }
    }
}

.card-footer {
    color: v-bind('colors.textSecondary');
    font-size: 12px;
    letter-spacing: 0.5px;
}

.dynamic-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;

    .scan-line {
        position: absolute;
        top: 0;
        left: -50%;
        width: 60%;
        height: 100%;
        background: linear-gradient(90deg,
                transparent 0%,
                rgba(58, 175, 169, 0.08) 50%,
                transparent 100%);
        animation: scan 8s infinite linear;
        transform: skew(-25deg);
    }

    .glow-effect {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 0%,
                rgba(58, 175, 169, 0.08) 0%,
                transparent 60%);
    }
}

@keyframes scan {
    0% {
        left: -50%;
    }

    100% {
        left: 150%;
    }
}

</style>