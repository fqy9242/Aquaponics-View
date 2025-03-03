<script setup>
import { ref, reactive, watch, computed, nextTick } from 'vue'
import { useSensorData } from '@/common/GetSenSorData'

const sensorData = useSensorData()

const config = reactive({
    header: ['时间', '温度', '湿度', '土壤温度', '土壤湿度', '光照', 'ph', '导电率'],
    data: [],
    index: false,
    columnWidth: [100, 80, 80, 100, 100, 80, 50, 70], // 调整列宽
    align: ['center'],
    rowNum: 5,      // 可视行数（需根据容器高度调整）
    waitTime: 2500,  // 轮播间隔
    hoverPause: false, // 关闭悬停暂停
    carousel: 'single' // 单行轮播模式
})

// 生成带单位的数据行
const sensorRow = computed(() => [
    formatTime(sensorData.collectionTime),
    formatValue(sensorData.airTemperature, '℃'),
    formatValue(sensorData.airHumidity, '%'),
    formatValue(sensorData.soilTemperature, '℃'),
    formatValue(sensorData.soilMoisture, '%'),
    formatValue(sensorData.light, 'Lux'),
    formatValue(sensorData.soilPhValue, ''),
    formatValue(sensorData.conductivity, '%')
])

// 数据格式化方法
const formatTime = (timestamp) => {
    return timestamp ? new Date(timestamp).toLocaleTimeString() : '--:--:--'
}

const formatValue = (value, unit) => {
    return value !== undefined ? `${value}${unit}` : '--'
}

// 数据更新处理
watch(sensorRow, (newRow) => {
    // 保留最新20条数据（根据需求调整）
    config.data = [...config.data, newRow].slice(-20)

    nextTick(() => {
        if (scrollBoard.value) {
            // 强制更新表格
            scrollBoard.value.updateRows()
            // 重置轮播动画
            scrollBoard.value.scrollBoard.startRoll()
        }
    })
})

const scrollBoard = ref(null)
</script>

<template>
    <div class="panel-box">
        <div class="panel-title">传感器数据实时轮播</div>
        <dv-scroll-board ref="scrollBoard" :config="config" style="width:100%;height:260px"
            @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" />
    </div>
</template>

<style scoped>
.panel-box {
    background: rgba(9, 44, 88, 0.7);
    border: 1px solid rgba(0, 180, 255, 0.2);
    border-radius: 8px;
    padding: 15px;
}



/* 深度定制滚动表格样式 */
:deep(.dv-scroll-board) {
    --scroll-color: rgba(0, 247, 255, 0.6);
}

:deep(.dv-scroll-board .header) {
    background: linear-gradient(90deg, rgba(0, 180, 255, 0.1), rgba(0, 247, 255, 0.1)) !important;
    color: #00f7ff !important;
    font-size: 14px;
}

:deep(.dv-scroll-board .row-item) {
    background: rgba(9, 44, 88, 0.5) !important;
    transition: all 0.6s ease;
}

:deep(.dv-scroll-board .row-item:hover) {
    background: rgba(0, 180, 255, 0.1) !important;
    transform: translateX(10px);
}

:deep(.dv-scroll-board .rows) {
    animation: rowFlow 0.6s ease-out;
}

@keyframes rowFlow {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.panel-title {
    position: relative;
    color: #00f7ff;
    font-size: 24px;
    margin: 0 0 20px 15px;
    padding: 8px 20px;
    font-family: 'Microsoft YaHei', sans-serif;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
    border-left: 4px solid;
    border-image: linear-gradient(180deg,
            transparent 0%,
            #00f7ff 50%,
            transparent 100%) 1;
    /* background: linear-gradient(90deg,
            rgba(0, 180, 255, 0.1) 0%,
            transparent 100%); */
    transform: perspective(100px) rotateX(2deg);
    animation: titleGlow 2s ease-in-out infinite alternate;
}

@keyframes titleGlow {
    0% {
        filter: drop-shadow(0 0 2px rgba(0, 247, 255, 0.3));
    }

    100% {
        filter: drop-shadow(0 0 8px rgba(0, 247, 255, 0.6));
    }
}

/* 装饰性伪元素 */
.panel-title::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 50%;
    width: 8px;
    height: 8px;
    background: #00f7ff;
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 10px #00f7ff;
}

.panel-title::after {
    content: '';
    position: absolute;
    right: -20px;
    top: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(90deg,
            rgba(0, 247, 255, 0.2) 0%,
            transparent 100%);
    transform: skewX(-15deg);
}
</style>

<script>
// 处理鼠标交互
export default {
    methods: {
        handleMouseEnter() {
            if (this.scrollBoard) {
                this.scrollBoard.scrollBoard.stopRoll()
            }
        },
        handleMouseLeave() {
            if (this.scrollBoard) {
                this.scrollBoard.scrollBoard.startRoll()
            }
        }
    }
}
</script>