<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue';
import LeftSidebar from '@/components/LeftSidebar.vue';
import CenterContent from '@/components/CenterContent.vue';
import RightSidebar from '@/components/RightSidebar.vue';
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
