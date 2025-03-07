<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue';
import LeftSidebar from '@/components/Fish/FishLeftSidebar.vue';
import CenterContent from '@/components/Fish/FishCenterContent.vue';
import RightSidebar from '@/components/Fish/FishRightSidebar.vue';
import BottomBox from '@/components/BottomBox.vue';
</script>
<template>
    <div class="dashboard-container">
        <DashboardHeader />
        <main class="dashboard-content">
            <LeftSidebar />
            <CenterContent />
            <RightSidebar />
        </main>
        <BottomBox />
    </div>
</template>
