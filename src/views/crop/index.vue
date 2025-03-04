<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue';
import CropLeftSidebar from '@/components/Crop/CropLeftSidebar.vue';
import CropCenterContent from '@/components/Crop/CropCenterContent.vue';
import CropRigfhtSidebar from '@/components/Crop/CropRigfhtSidebar.vue';
import BottomBox from '@/components/BottomBox.vue';
</script>
<template>
    <div class="dashboard-container">
        <DashboardHeader />
        <main class="dashboard-content">
            <CropLeftSidebar />
            <CropCenterContent />
            <CropRigfhtSidebar />
        </main>
        <BottomBox />
    </div>
</template>

