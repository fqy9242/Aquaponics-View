<template>
    <section class="panel-box weather-station-panel">
      <h2 class="panel-title">气象站</h2>
      <div class="data-grid">
        <div class="data-item">
          <span class="data-label">空气湿度</span>
          <span class="data-value">58</span>
          <span class="data-unit">%</span>
        </div>
        <div class="data-item">
          <span class="data-label">空气温度</span>
          <span class="data-value">37</span>
          <span class="data-unit">°C</span>
        </div>
        <div class="data-item">
          <span class="data-label">光照强度</span>
          <span class="data-value">71560</span>
          <span class="data-unit">Lux</span>
        </div>
        <div class="data-item">
          <span class="data-label">二氧化碳</span>
          <span class="data-value">336</span>
          <span class="data-unit">ppm</span>
        </div>
        <div class="data-item">
          <span class="data-label">降雨量</span>
          <span class="data-value">0</span>
          <span class="data-unit">mm</span>
        </div>
        <div class="data-item">
          <span class="data-label">风速</span>
          <span class="data-value">0.8</span>
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
  
  <script setup>
  </script>