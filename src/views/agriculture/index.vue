<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue';
import AgricultureLeftSidebar from '@/components/Agriculture/AgricultureLeftSidebar.vue';
import AgricultureCenterContent from '@/components/Agriculture/AgricultureCenterContent.vue';
import AgricultureRightSidebar from '@/components/Agriculture/AgricultureRightSidebar.vue';
import BottomBox from '@/components/BottomBox.vue';
</script>
<template>
    <div class="dashboard-container">
        <DashboardHeader />
        <main class="dashboard-content">
            <AgricultureLeftSidebar />
            <AgricultureCenterContent />
            <AgricultureRightSidebar />
        </main>
        <BottomBox />
    </div>
</template>

