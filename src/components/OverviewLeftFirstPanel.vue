<script setup>
/**
 * @description 农业概况左侧第一个面板
 * @date 2025-02-19
 * @author qin hui tong
 */
import { agriculturalAreaSummaryThisYearApi } from '@/apis/overview';
import { onMounted, ref } from 'vue';
const agriculturalAreaSummary = ref(null);

// 获取农业概况数据
const agriculturalAreaSummaryThisYear = async () => {
    const res = await agriculturalAreaSummaryThisYearApi();
    agriculturalAreaSummary.value = res.data;
};

onMounted(() => {
    agriculturalAreaSummaryThisYear();
});
</script>

<template>
    <section class="panel-box water-quality-panel">
        <div class="header-container">
            <svg t="1739709683698" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1510" width="30" height="30">
                <path
                    d="M810.946385 398.138063V127.312332L763.491287 0H399.541305l-45.158883 127.567467v345.069997h76.54048v115.065854h0.127568v121.444229c19.262687 4.847564 37.75997 13.394584 54.34374 25.896195l28.957815 21.941605v-43.500507h83.811826c42.862669-15.308096 91.338306-10.715667 130.88422 14.032422V587.703318h78.198857v151.550151l5.485401-4.209727c23.089711-17.476743 50.134014-27.427005 77.816155-29.850787v-117.489637h109.197751V398.138063h-188.79985zM453.629911 76.54048h256.79331l19.517823 52.302661H435.005061L453.629911 76.54048z m-22.834576 319.684071V203.980379h303.61057v192.244172H641.664357v-104.73289h-113.79018v104.73289h-97.078842z m214.951181 284.347883h-131.394491v-30.871327h131.394491v30.871327z m0-63.783733h-131.394491v-29.085383h131.394491v29.085383z m277.459239-105.625862H507.463382V474.550976h415.742373v36.611863zM776.375601 1023.984054a112.004236 112.004236 0 0 1-67.865892-22.707009l-37.887537-28.70268c-12.756747-9.695127-30.488625-9.56756-43.117804 0l-37.887538 28.70268c-39.928617 30.23349-95.6756 30.361057-135.604217 0l-37.887537-28.70268c-12.756747-9.695127-30.488625-9.56756-43.117804 0l-37.887537 28.70268c-39.928617 30.23349-95.6756 30.361057-135.604217 0l-37.887538-28.70268c-12.756747-9.56756-30.488625-9.56756-43.117804 0l-49.496177 37.504835a38.244726 38.244726 0 1 1-46.179422-60.977249l49.496177-37.504835c39.928617-30.23349 95.803167-30.23349 135.604216 0l37.887538 28.70268c12.756747 9.56756 30.488625 9.56756 43.117804 0l37.887537-28.70268c39.928617-30.23349 95.6756-30.361057 135.604217 0l37.887538 28.70268c12.756747 9.56756 30.488625 9.56756 43.117804 0l37.887537-28.70268c39.928617-30.23349 95.6756-30.361057 135.604217 0l37.887537 28.70268c12.756747 9.56756 30.488625 9.56756 43.117803 0l37.887538-28.70268c39.928617-30.23349 95.6756-30.361057 135.604217 0l37.887537 28.70268a38.244726 38.244726 0 1 1-46.179422 60.977249l-37.887538-28.70268c-12.756747-9.56756-30.488625-9.56756-43.117804 0l-37.887537 28.70268a112.259371 112.259371 0 0 1-67.865893 22.707009z"
                    p-id="1511" fill="#1afa29"></path>
                <path
                    d="M776.375601 878.046872a112.004236 112.004236 0 0 1-67.865892-22.707009l-37.887537-28.70268c-12.756747-9.695127-30.488625-9.56756-43.117804 0l-37.887538 28.70268c-39.928617 30.23349-95.6756 30.361057-135.604217 0l-37.887537-28.70268c-12.756747-9.695127-30.488625-9.56756-43.117804 0l-37.887537 28.70268c-39.928617 30.23349-95.6756 30.361057-135.604217 0l-37.887538-28.70268c-12.756747-9.695127-30.488625-9.56756-43.117804 0l-37.887537 28.70268c-39.928617 30.23349-95.6756 30.361057-135.604217 0l-37.887538-28.70268c-12.756747-9.56756-30.488625-9.56756-43.117804 0l-49.496177 37.504835a38.244726 38.244726 0 1 1-46.179422-60.977249l49.496177-37.504835c39.928617-30.23349 95.803167-30.23349 135.604216 0l37.887538 28.70268c12.756747 9.56756 30.488625 9.56756 43.117804 0l37.887537-28.70268c39.928617-30.23349 95.6756-30.361057 135.604217 0l37.887538 28.70268c12.756747 9.56756 30.488625 9.56756 43.117804 0l37.887537-28.70268c39.928617-30.23349 95.6756-30.361057 135.604217 0l37.887537 28.70268c12.756747 9.56756 30.488625 9.56756 43.117803 0l37.887538-28.70268c39.928617-30.23349 95.6756-30.361057 135.604217 0l37.887537 28.70268a38.244726 38.244726 0 1 1-46.179422 60.977249l-37.887538-28.70268c-12.756747-9.56756-30.488625-9.56756-43.117804 0l-37.887537 28.70268a112.259371 112.259371 0 0 1-67.865893 22.707009z"
                    p-id="1512" fill="#1afa29"></path>
                <path
                    d="M179.870128 741.294548C80.622639 741.294548 0 660.671909 0 561.42442c0-17.221608 0-69.651837 86.10804-210.231185l93.762088-153.208527 93.762088 153.208527c86.10804 140.706916 86.10804 193.137144 86.10804 210.231185 0 99.247489-80.750206 179.870128-179.870128 179.870128z m0-396.607253l-28.447545 46.434557C83.811826 501.467711 76.54048 547.009297 76.54048 561.42442c0 56.89509 46.30699 103.329648 103.329648 103.329648s103.329648-46.30699 103.329648-103.329648c0-14.415124-7.271346-59.956709-74.882103-170.302568l-28.447545-46.434557z"
                    p-id="1513" fill="#1afa29"></path>
                <path
                    d="M220.436582 592.16818m-28.319977 0a28.319978 28.319978 0 1 0 56.639955 0 28.319978 28.319978 0 1 0-56.639955 0Z"
                    p-id="1514" fill="#1afa29"></path>
                <path
                    d="M138.538269 563.97577m-28.319978 0a28.319978 28.319978 0 1 0 56.639955 0 28.319978 28.319978 0 1 0-56.639955 0Z"
                    p-id="1515" fill="#1afa29"></path>
                <path
                    d="M192.116605 494.834203m-28.319978 0a28.319978 28.319978 0 1 0 56.639955 0 28.319978 28.319978 0 1 0-56.639955 0Z"
                    p-id="1516" fill="#1afa29"></path>
            </svg>
            <h2 class="panel-title">农业概况</h2>
        </div>
        <div class="data_grid">
            <!-- 种植情况 -->
            <div class="plant">
                <div class="overview">
                    <img src="@/assets/imgs/ecological_agriculture.png" draggable="false">
                    <div class="overview-text">
                        <h1>总种植面积</h1>
                        <h1 class="overview-text-data">{{ agriculturalAreaSummary?.thisYearTotalCultivation + ' 亩' }}
                        </h1>
                    </div>
                    <el-divider class="vertical-divider" direction="vertical" style="height: 80px; margin: 0 10px;" />
                    <div class="rate-container">
                        <h1 class="year-rate-text">年同比</h1>
                        <span class="year-rate">{{ agriculturalAreaSummary?.yearOnYearCultivationRate }}</span>
                    </div>
                </div>
            </div>

            <!-- 养殖情况 -->
            <div class="breed">
                <div class="overview">
                    <img src="@/assets/imgs/breed.png" draggable="false">
                    <div class="overview-text">
                        <h1>总养殖面积</h1>
                        <h1 class="overview-text-data">{{ agriculturalAreaSummary?.thisYearTotalBreeding + ' 亩' }}</h1>
                    </div>
                    <el-divider class="vertical-divider" direction="vertical" style="height: 80px; margin: 0 10px;" />
                    <div class="rate-container">
                        <h1 class="year-rate-text">年同比</h1>
                        <span class="year-rate">{{ agriculturalAreaSummary?.yearOnYearBreedingRate }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>


.header-container {
    display: flex;
    align-items: center;
    /* margin-bottom: 20px; */
}

.panel-title {
    color: #1afa29;
    font-size: 20px;
    margin-left: 12px;
}

.data_grid {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.overview {
    display: flex;
    align-items: center;
    height: 120px;
    /* padding: 15px; */
    /* background: rgba(20, 50, 60, 0.5); */
    border-radius: 6px;
}

img {
    width: 80px;
    height: 80px;
    margin: 0 20px;
    object-fit: contain;
}

.overview-text {
    display: flex;
    flex-direction: column;
    min-width: 160px;
}

.overview-text-data {
    font-size: 1.4em;
    color: #1dc1f5;
    margin-top: 8px;
}

.vertical-divider {
    border-left: 2px solid rgba(70, 167, 118, 0.6) !important;
}

.rate-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100px;
}

.year-rate-text {
    font-family: '黑体';
    color: #32b885;
    font-size: 1.1em;
    margin-bottom: 8px;
}

.year-rate {
    color: #ffffff;
    font-size: 1.3em;
    font-weight: bold;
}

/* 响应式布局 */
@media (max-width: 768px) {
    .overview {
        height: auto;
        flex-wrap: wrap;
        padding: 20px;
    }

    .vertical-divider {
        display: none !important;
    }

    .overview-text {
        margin: 15px 0;
    }

    .rate-container {
        width: 100%;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid rgba(70, 167, 118, 0.3);
    }
}
</style>