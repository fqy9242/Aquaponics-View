<template>
    <section class="panel-box camera-feed-panel">
      <h2 class="panel-title">{{ title }}</h2>
      <div class="camera-preview">
        {{ placeholder }}
      </div>
      <div v-if="showControls" class="camera-controls">
        <button class="control-button"><i class="fas fa-play"></i></button>
        <button class="control-button"><i class="fas fa-pause"></i></button>
        <button class="control-button"><i class="fas fa-camera"></i></button>
        <button class="control-button"><i class="fas fa-video"></i></button>
      </div>
    </section>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    title: String,
    placeholder: String,
    showControls: {
      type: Boolean,
      default: false
    }
  })
  </script>