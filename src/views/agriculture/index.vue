<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue';
import AgricultureLeftSidebar from '@/components/Crop/AgricultureLeftSidebar.vue';
import AgricultureCenterContent from '@/components/Crop/AgricultureCenterContent.vue';
import AgricultureRightSidebar from '@/components/Crop/CropRigfhtSidebar.vue';
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

