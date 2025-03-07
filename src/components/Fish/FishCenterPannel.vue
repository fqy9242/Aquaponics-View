<script setup>
import { ref } from 'vue';
const pools = ref([
    { id: 1, name: '鱼池1', fishName: '罗非鱼', fishStatus: '幼鱼', waterQuality: '优良', temperature: 25, ph: 7.2 },
    { id: 2, name: '鱼池2', fishName: '鲤鱼', fishStatus: '成鱼', waterQuality: '良好', temperature: 22, ph: 6.8 },
    { id: 3, name: '鱼池3', fishName: '鲫鱼', fishStatus: '幼鱼', waterQuality: '优良', temperature: 26, ph: 7.5 },
    { id: 4, name: '鱼池4', fishName: '草鱼', fishStatus: '成鱼', waterQuality: '一般', temperature: 24, ph: 6.5 },
    { id: 5, name: '鱼池5', fishName: '鲢鱼', fishStatus: '幼鱼', waterQuality: '优良', temperature: 25, ph: 7.0 },
    { id: 6, name: '鱼池6', fishName: '鲳鱼', fishStatus: '成鱼', waterQuality: '良好', temperature: 23, ph: 6.9 }
]);
const waterQualityClass = (quality) => {
    switch (quality) {
        case '优良': return 'water-quality-1';
        case '良好': return 'water-quality-2';
        case '一般': return 'water-quality-3';
        default: return '';
    }
};
const campuses = [
    { id: 1, name: '城市A-园区A' },
    { id: 2, name: '柳州-生态园' },
    { id: 3, name: '桂林-漓江基地' }
];
</script>

<template>
    <div class="panel-box">
        <select class="campus-selector">
            <option v-for="camp in campuses" :key="camp.id" :value="camp.id">{{ camp.name }}</option>
        </select>

        <h2 class="panel-title">园区鱼池管理</h2>
        <button class="view-all-button">
            <span>查看所有鱼池 >>></span>
            <div class="button-rays"></div>
        </button>

        <div class="base-info">
            <div class="info-item">
                <svg t="1741053988874" class="info-item-ico" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="31658" width="50" height="50">
                    <path
                        d="M618.666667 942.933333h-213.333334c-12.8 0-25.6 0-38.4-4.266666C157.866667 887.466667 8.533333 678.4 8.533333 439.466667c0-102.4 29.866667-204.8 89.6-298.666667 4.266667-4.266667 12.8-8.533333 17.066667-8.533333h785.066667c8.533333 0 12.8 4.266667 17.066666 8.533333 59.733333 93.866667 89.6 192 89.6 298.666667 0 238.933333-149.333333 448-358.4 499.2-4.266667 0-17.066667 4.266667-29.866666 4.266666zM128 174.933333c-51.2 85.333333-76.8 170.666667-76.8 264.533334 0 213.333333 140.8 409.6 324.266667 456.533333 8.533333 0 17.066667 4.266667 25.6 4.266667h213.333333c8.533333 0 17.066667 0 25.6-4.266667 187.733333-46.933333 324.266667-243.2 324.266667-456.533333 0-93.866667-25.6-179.2-76.8-264.533334H128z"
                        p-id="31659" fill="#1296db"></path>
                    <path
                        d="M921.6 439.466667c-55.466667 0-110.933333-25.6-136.533333-59.733334-29.866667 38.4-81.066667 59.733333-136.533334 59.733334s-110.933333-25.6-136.533333-59.733334c-29.866667 38.4-81.066667 59.733333-136.533333 59.733334-55.466667 0-110.933333-25.6-136.533334-59.733334-29.866667 38.4-81.066667 59.733333-136.533333 59.733334-12.8 0-21.333333-8.533333-21.333333-21.333334s8.533333-21.333333 21.333333-21.333333c51.2 0 98.133333-25.6 110.933333-64 4.266667-8.533333 12.8-17.066667 25.6-17.066667s21.333333 8.533333 25.6 17.066667c12.8 38.4 59.733333 64 110.933334 64s98.133333-25.6 110.933333-64c4.266667-8.533333 12.8-17.066667 25.6-17.066667s21.333333 8.533333 25.6 17.066667c12.8 38.4 59.733333 64 110.933333 64s98.133333-25.6 110.933334-64c4.266667-8.533333 12.8-17.066667 25.6-17.066667s21.333333 8.533333 25.6 17.066667c12.8 38.4 59.733333 64 110.933333 64 12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333334zM456.533333 746.666667c-76.8 0-123.733333-55.466667-145.066666-85.333334-12.8-17.066667-12.8-38.4 0-55.466666 25.6-29.866667 72.533333-85.333333 149.333333-85.333334 46.933333 0 98.133333 21.333333 153.6 68.266667 25.6-17.066667 64-46.933333 81.066667-46.933333 4.266667 0 12.8 0 17.066666 4.266666 4.266667 4.266667 8.533333 8.533333 8.533334 17.066667 0 4.266667 0 42.666667-12.8 72.533333 12.8 29.866667 12.8 68.266667 12.8 72.533334 0 4.266667-4.266667 12.8-8.533334 17.066666h-21.333333c-17.066667-4.266667-59.733333-29.866667-81.066667-46.933333-55.466667 46.933333-106.666667 68.266667-153.6 68.266667z m0-183.466667c-55.466667 0-93.866667 42.666667-115.2 68.266667 21.333333 25.6 55.466667 72.533333 115.2 72.533333 42.666667 0 85.333333-21.333333 136.533334-68.266667h0c-46.933333-51.2-93.866667-72.533333-136.533334-72.533333z m162.133334 68.266667c4.266667 4.266667 4.266667 4.266667 0 0 8.533333 8.533333 29.866667 21.333333 51.2 34.133333 0-8.533333-4.266667-17.066667-8.533334-21.333333-4.266667-8.533333-4.266667-17.066667 0-25.6 4.266667-4.266667 8.533333-12.8 8.533334-21.333334-17.066667 12.8-42.666667 29.866667-51.2 34.133334 4.266667 0 4.266667 0 0 0z"
                        p-id="31660" fill="#1296db"></path>
                    <path
                        d="M409.6 644.266667c-4.266667 0-12.8-4.266667-17.066667-4.266667-4.266667-4.266667-4.266667-8.533333-4.266666-17.066667 0-4.266667 0-12.8 4.266666-17.066666 8.533333-8.533333 21.333333-8.533333 29.866667 0 4.266667 4.266667 4.266667 8.533333 4.266667 17.066666 0 4.266667 0 8.533333-4.266667 17.066667-4.266667 0-8.533333 4.266667-12.8 4.266667z"
                        p-id="31661" fill="#1296db"></path>
                </svg>
                <div class="info-item-content">
                    <span class="info-item-value">{{ pools.length }}</span>
                    <span class="info-item-title">鱼池总数</span>
                </div>
            </div>
            <div class="info-item days-operating">
                <svg t="1741054236616" class="info-item-ico clock-ico" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="33147" width="50" height="50">
                    <path
                        d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM511.913993 895.677474c-211.577356 0-383.763481-172.186125-383.763481-383.763481 0-211.577356 172.014111-383.763481 383.763481-383.763481s383.763481 172.014111 383.763481 383.763481S723.491349 895.677474 511.913993 895.677474z"
                        fill="#1296db" p-id="33148"></path>
                    <path
                        d="M672.05913 511.913993l-159.973123 0L512.086007 288.123635c0-17.717453-14.277171-32.166639-31.994625-32.166639-17.717453 0-31.994625 14.449185-31.994625 32.166639l0 255.956996c0 17.717453 14.277171 31.994625 31.994625 31.994625l191.967747 0c17.717453 0 32.166639-14.277171 32.166639-31.994625C704.053754 526.191164 689.604569 511.913993 672.05913 511.913993z"
                        fill="#1296db" p-id="33149"></path>
                </svg>
                <div class="info-item-content">
                    <span class="info-item-value">328</span>
                    <span class="info-item-title">运营天数</span>
                </div>
            </div>
            <div class="info-item">
                <svg t="1741054336283" class="info-item-ico eco-ico" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="34346" width="50" height="50">
                    <path
                        d="M512.3 960.8c-164.5 0-298.4-133.9-298.4-298.4 0-48 11.7-95.7 33.8-138L496 75.3c3.3-5.9 9.5-9.6 16.3-9.6 6.8 0 13 3.7 16.3 9.6l248 448.7c22.3 42.7 34 90.4 34 138.4 0.1 164.5-133.8 298.4-298.3 298.4z m0-837.9L280.5 542c-19.4 37.1-29.3 77.8-29.3 120.4 0 144 117.1 261.1 261.1 261.1s261.1-117.1 261.1-261.1c0-42.7-9.9-83.3-29.6-120.8L512.3 122.9z"
                        fill="#231815" p-id="34347"></path>
                    <path
                        d="M512.3 84.3L264.2 533c-20.2 38.7-31.6 82.7-31.6 129.4 0 154.5 125.2 279.7 279.7 279.7S792 816.9 792 662.4c0-46.7-11.4-90.7-31.7-129.4l-248-448.7z"
                        fill="#0D4FF7" p-id="34348"></path>
                    <path
                        d="M512.3 960.8c-164.5 0-298.4-133.9-298.4-298.4 0-48 11.7-95.7 33.8-138L496 75.3c3.3-5.9 9.5-9.6 16.3-9.6 6.8 0 13 3.7 16.3 9.6l248 448.7c22.3 42.7 34 90.4 34 138.4 0.1 164.5-133.8 298.4-298.3 298.4z m0-837.9L280.5 542c-19.4 37.1-29.3 77.8-29.3 120.4 0 144 117.1 261.1 261.1 261.1s261.1-117.1 261.1-261.1c0-42.7-9.9-83.3-29.6-120.8L512.3 122.9z"
                        fill="#231815" p-id="34349"></path>
                    <path
                        d="M693.2 411.6L512.3 84.3 264.2 533c-12.9 24.7-22.2 51.7-27.3 80.1 86.3-0.5 295.5-21.9 447.5-201.7"
                        fill="#FFFFFF" p-id="34350"></path>
                    <path
                        d="M237 631.7c-5.5 0-10.7-2.4-14.3-6.6-3.6-4.2-5.1-9.8-4.1-15.3 5.3-29.9 15.1-58.7 29.1-85.4L496 75.3c3.3-5.9 9.5-9.6 16.3-9.6 6.8 0 13 3.7 16.3 9.6l180.9 327.3c5 9 1.7 20.4-7.3 25.3-3 1.6-6.4 2.1-9.4 2.3-157.1 180.1-370.5 201-455.8 201.5z m275.3-508.8L280.5 542c-8.5 16.3-15.3 33.7-20.2 51.8 91.6-4.4 272.1-34.4 406.8-190.8L512.3 122.9z"
                        fill="#231815" p-id="34351"></path>
                </svg>
                <div class="info-item-content">
                    <span class="info-item-value">98.7%</span>
                    <span class="info-item-title">资源循环率</span>
                </div>
            </div>
        </div>

        <div class="pool-container">
            <div v-for="pool in pools" :key="pool.id" class="pool-item" :class="[waterQualityClass(pool.waterQuality)]">
                <div class="water-surface">
                    <div class="wave"></div>
                    <div class="wave delay-1"></div>
                    <div class="water-bubble"></div>
                </div>

                <div class="fish-group">
                    <div class="fish goldfish"></div>
                    <div class="fish tropical reverse"></div>
                    <div class="fish school"></div>
                </div>

                <div class="pool-bottom">
                    <div class="aquatic-plant"></div>
                    <div class="pebbles"></div>
                </div>

                <div class="dashboard">
                    <div class="pool-name">
                        <span class="pool-name">{{ pool.name }}</span>
                        <span class="pool-fish-tag"> {{ pool.fishStatus }}</span>
                        <span class="pool-fish-tag"> {{ pool.fishName }}</span>
                    </div>
                    <div class="status-indicators">
                        <div class="indicator">
                            <span class="label">水质</span>
                            <div class="quality-light"></div>
                            <span class="value">{{ pool.waterQuality }}</span>
                        </div>
                        <div class="parameter">
                            <div class="gauge temperature">
                                <div class="fill"></div>
                                <span class="value">{{ pool.temperature }}°C</span>
                            </div>
                        </div>
                        <div class="parameter">
                            <div class="gauge ph">
                                <div class="fill"></div>
                                <span class="value">PH {{ pool.ph }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.campus-selector {
    position: absolute;
    left: 30px;
    top: 30px;
    padding: 8px 35px 8px 15px;
    font-size: 16px;
    background: rgba(26, 250, 41, 0.1);
    border: 1px solid rgba(26, 250, 41, 0.3);
    border-radius: 8px;
    appearance: none;
    cursor: pointer;
    color: #fff;
    background-image: linear-gradient(45deg, #1afa29 30%, #00ff88 70%);
    -webkit-background-clip: text;
    background-clip: text;
    transition: all 0.3s ease;
    z-index: 10;
}

.view-all-button {
    position: absolute;
    right: 30px;
    top: 30px;
    padding: 12px 25px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(135deg, #1afa29 30%, #00ff88 70%);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 8px 16px rgba(0, 229, 255, 0.3);
    transition: all 0.3s ease;
    overflow: hidden;
    z-index: 10;
}

.campus-selector::after {
    content: "▼";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #1afa29;
    font-size: 12px;
}

.pool-fish-tag {
    display: inline-block;
    padding: 2px 8px;
    margin-left: 10px;
    font-size: 20px;
    color: #fff;
    background-color: #007bff;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
}

.pool-fish-tag:hover {
    background-color: #0056b3;
}

.label {
    color: green;
}

.panel-box {
    height: 1139px;
    background: linear-gradient(180deg, #0a1a2d 0%, #0c2b4d 100%);
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 45, 120, 0.3);
    position: relative;
    overflow: hidden;
    
}

.title-text {
    font-size: 28px;
    color: #00f7ff;
    text-shadow: 0 0 20px rgba(0, 247, 255, 0.6);
    font-family: 'Microsoft YaHei', sans-serif;
}

.pool-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    padding: 20px;
    margin-top: 20px;
}

.pool-item {
    position: relative;
    height: 350px;
    border-radius: 20px;
    background: linear-gradient(160deg, #24538c 0%, #4a90e0 100%);
    overflow: hidden;
    transform-style: preserve-3d;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(0, 91, 187, 0.3);
}

.pool-item:hover {
    transform: translateY(-5px) rotateX(2deg);
    box-shadow: 0 15px 40px rgba(0, 120, 255, 0.4);
}

.water-surface {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60%;
    background: linear-gradient(180deg, rgba(74, 144, 224, 0.8) 0%, rgba(54, 119, 191, 0.6) 100%);
    overflow: hidden;
}

.wave {
    position: absolute;
    bottom: 0;
    width: 200%;
    height: 40px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 120 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 10c20-10 40 10 60 0s40 10 60 0" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/></svg>');
    animation: wave 8s linear infinite;
    opacity: 0.8;
}

.delay-1 {
    animation-delay: -4s;
    opacity: 0.6;
}

@keyframes wave {
    0% {
        transform: translateX(-50%) rotate(0deg);
    }

    100% {
        transform: translateX(0%) rotate(1deg);
    }
}

.water-bubble {
    position: absolute;
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    animation: bubble 4s infinite;
}

@keyframes bubble {
    0% {
        transform: translateY(0) scale(1);
        opacity: 0;
    }

    20% {
        transform: translateY(-20px) scale(1.2);
        opacity: 1;
    }

    100% {
        transform: translateY(-80px) scale(0.5);
        opacity: 0;
    }
}

.fish {
    position: absolute;
    width: 50px;
    height: 20px;
    background: linear-gradient(45deg, #FFD700 30%, #FFA500 70%);
    border-radius: 10px 5px 5px 10px;
    clip-path: polygon(0 40%, 100% 0, 100% 100%, 0 60%);
    animation: swim 15s linear infinite;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.goldfish {
    top: 30%;
    left: -30px;
}

.tropical {
    background: linear-gradient(45deg, #00CED1 30%, #20B2AA 70%);
    top: 45%;
    animation-delay: -5s;
}

.reverse {
    animation-direction: reverse;
}

.school {
    width: 30px;
    height: 12px;
    top: 55%;
    background: #FF6347;
    animation: swim 12s linear infinite;
}

@keyframes swim {
    0% {
        transform: translateX(-100%) rotateY(0deg);
    }

    50% {
        transform: translateX(100%) rotateY(180deg);
    }

    100% {
        transform: translateX(-100%) rotateY(0deg);
    }
}

.pool-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(transparent 20%, #1a472a 80%);
}

.aquatic-plant {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 20 Q25 5, 50 20 Q75 -5, 100 20" fill="%232E8B57"/></svg>');
    opacity: 0.8;
}

.pebbles {
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 20px;
    background: radial-gradient(circle at 10px 15px, #6b5b4d 2px, transparent 3px),
        radial-gradient(circle at 30px 18px, #7d6e60 3px, transparent 4px),
        radial-gradient(circle at 50px 15px, #5d5043 2px, transparent 3px);
}

.dashboard {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    padding: 15px;
    background: rgba(0, 20, 40, 0.9);
    border-radius: 12px;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(0, 229, 255, 0.3);
}

.pool-name {
    color: #00e5ff;
    margin: 0 0 10px;
    font-size: 20px;
    text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
}

.status-indicators {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.indicator {
    display: flex;
    align-items: center;
    gap: 8px;
}

.quality-light {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: 0 0 8px currentColor;
}

.value {
    color: #89f8ff;
    font-size: 14px;
}

.water-quality-1 .quality-light {
    background: #00ff88;
    color: #00ff88;
}

.water-quality-2 .quality-light {
    background: #ffd700;
    color: #ffd700;
}

.water-quality-3 .quality-light {
    background: #ff4500;
    color: #ff4500;
}

.base-info {
    height: 160px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin: 60px 0 20px 0;
    background: linear-gradient(145deg, rgba(26, 250, 41, 0.1) 0%, rgba(0, 15, 64, 0.8) 100%);
    border-radius: 16px;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(26, 250, 41, 0.3);
    box-shadow: 0 8px 32px rgba(0, 45, 120, 0.3);
}

.info-item {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 15px;
    padding: 20px;
    background: linear-gradient(135deg,
            rgba(26, 250, 41, 0.15) 0%,
            rgba(0, 28, 61, 0.5) 100%);
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.info-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(26, 250, 41, 0.2);
    background: linear-gradient(135deg,
            rgba(26, 250, 41, 0.25) 0%,
            rgba(0, 28, 61, 0.6) 100%);
}

.info-item::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg,
            transparent 25%,
            rgba(26, 250, 41, 0.1) 50%,
            transparent 75%);
    animation: flow 8s infinite linear;
}

@keyframes flow {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

.info-item-ico {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    filter: drop-shadow(0 0 12px #1afa29);
    transition: transform 0.3s ease;
}

.info-item:hover .info-item-ico {
    transform: scale(1.1) rotate(10deg);
}

.info-item-content {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
}

.info-item-value {
    font-size: 32px;
    font-weight: 700;
    background: linear-gradient(45deg, #1afa29 30%, #00ff88 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 16px rgba(26, 250, 41, 0.3);
    margin-bottom: 8px;
    font-family: 'Arial Rounded MT Bold', sans-serif;
}

.info-item-title {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 1px;
    position: relative;
    padding-left: 24px;
}

.info-item-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 2px;
    background: #1afa29;
    box-shadow: 0 0 8px #1afa29;
}

.eco-ico {
    filter: drop-shadow(0 0 10px #00ff88);
}

.info-item:nth-child(3) {
    background: linear-gradient(45deg,
            rgba(0, 255, 136, 0.1) 0%,
            rgba(0, 72, 114, 0.6) 100%);
}

.days-operating {
    background: linear-gradient(45deg,
            rgba(0, 168, 255, 0.15) 0%,
            rgba(0, 42, 85, 0.6) 100%);
    border: 1px solid rgba(0, 198, 255, 0.3);
}

.clock-ico {
    filter: drop-shadow(0 0 15px #00a8ff);
}

.days-operating::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg,
            transparent,
            rgba(0, 198, 255, 0.2),
            transparent);
    animation: timeFlow 3s infinite;
}

@keyframes timeFlow {
    0% {
        left: -100%;
    }

    100% {
        left: 150%;
    }
}

.days-operating .info-item-title::before {
    background: #00a8ff;
    box-shadow: 0 0 8px #00a8ff;
}

.campus-selector option {
    background-color: rgb(90, 88, 88);
    color: #fff;
}

.view-all-button:hover {
    background: linear-gradient(135deg, #00ff88 30%, #1afa29 70%);
    box-shadow: 0 12px 24px rgba(0, 229, 255, 0.4);
}

.view-all-button span {
    position: relative;
    z-index: 1;
}

.view-all-button .button-rays {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 229, 255, 0.2), transparent);
    transform: translate(-50%, -50%) rotate(45deg);
    transition: all 0.3s ease;
}

.view-all-button:hover .button-rays {
    transform: translate(-50%, -50%) rotate(0deg);
}
.panel-title {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    color: #fff;
    z-index: 9;
}
</style>