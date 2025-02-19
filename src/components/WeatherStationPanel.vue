<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const humidity = ref(0);
const temperature = ref(0);
const lightIntensity = ref(0);
const soilMoisture = ref(0);
const noise = ref(0);
const windSpeed = ref(0);
let ws;
const connectWebSocket = () => {
  ws = new WebSocket('ws://localhost:9000');

  ws.onopen = () => {
    console.log('WebSocket connection opened');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received data:', data);
    // Update the values based on the received data
    if (data.data['02']) {
      humidity.value = data.data['02'].humidity || humidity.value;
      temperature.value = data.data['02'].temperature || temperature.value;
      lightIntensity.value = data.data['02'].light || lightIntensity.value;
      noise.value = data.data['02'].noise || noise.value;
    }
    if (data.data['06']) {
      soilMoisture.value = data.data['06'].moisture || soilMoisture.value;
    }
    if (data.data['03']) {
      windSpeed.value = data.data['03'].speed || windSpeed.value;
    }

  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

onMounted(() => {
  connectWebSocket();
});

onUnmounted(() => {
  if (ws) {
    ws.close();
  }
});
</script>

<template>
  <section class="panel-box weather-station-panel">
    <h2 class="panel-title">气象站</h2>
    <div class="data-grid">
      <div class="data-item">
        <span class="data-label">空气湿度</span>
        <span class="data-value">{{ humidity }}</span>
        <span class="data-unit">%</span>
      </div>
      <div class="data-item">
        <span class="data-label">空气温度</span>
        <span class="data-value">{{ temperature }}</span>
        <span class="data-unit">°C</span>
      </div>
      <div class="data-item">
        <span class="data-label">光照强度</span>
        <span class="data-value">{{ lightIntensity }}</span>
        <span class="data-unit">Lux</span>
      </div>
      <div class="data-item">
        <span class="data-label">湿度</span>
        <span class="data-value">{{ soilMoisture }}</span>
        <span class="data-unit">%</span>
      </div>
      <div class="data-item">
        <span class="data-label">噪声</span>
        <span class="data-value">{{ noise }}</span>
        <span class="data-unit">dB</span>
      </div>
      <div class="data-item">
        <span class="data-label">风速</span>
        <span class="data-value">{{ windSpeed }}</span>
        <span class="data-unit">m/s</span>
      </div>
    </div>
    <div class="line-chart small-chart">
      <div class="chart-title">1#空气温度</div>
      <div class="line-graph">
        <div class="line"></div>
        <div class="point" style="left: 10%; bottom: 30%;"></div>
        <div class="point" style="left: 25%; bottom: 50%;"></div>
        <div class="point" style="left: 40%; bottom: 70%;"></div>
        <div class="point" style="left: 55%; bottom: 60%;"></div>
        <div class="point" style="left: 70%; bottom: 85%;"></div>
        <div class="point" style="left: 85%; bottom: 75%;"></div>
      </div>
    </div>
  </section>
</template>