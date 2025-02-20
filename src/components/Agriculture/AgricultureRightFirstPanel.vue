<script setup>
/**
 * by qht at 2025-2-20
 */
import { ref, onMounted, onUnmounted } from 'vue';
// 含水率
const moisture = ref(0);
// 土壤温度
const soilTemperature = ref(0);
// 光照强度
const lightIntensity = ref(0);
// ph值
const soilPh = ref(0);

let ws;
const connectWebSocket = () => {
  ws = new WebSocket('ws://localhost:9000');

  ws.onopen = () => {
    console.log('WebSocket connection opened');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // console.log('Received data:', data);
    // Update the values based on the received data
    if (data.data['02']) {
      lightIntensity.value = data.data['02'].light || lightIntensity.value;
      noise.value = data.data['02'].noise || noise.value;
    }
    if (data.data['06']) {
      moisture.value = data.data['06'].moisture || moisture.value;
      soilTemperature.value = data.data['06'].soil_temperature || soilTemperature.value;
    }
    if (data.data['05']) {
      soilPh.value = data.data['05'].soil_ph || soilPh.value;
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
    <svg t="1739967592286" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="15436" width="30" height="30">
      <path
        d="M484.917308 1023.771454c-74.50597 0-144.441022-29.025332-197.120857-81.705167-52.679835-52.679835-81.705167-122.72916-81.705167-197.120857 0-61.821672 19.769222-120.329428 57.250754-169.238254 32.682067-42.738087 77.705613-75.534427 128.099989-93.475282V94.503738c0-52.10847 42.395268-94.503738 94.503738-94.503738C538.168508 0 580.563776 42.395268 580.563776 94.503738V179.522821h-45.709184V94.503738c0-26.968419-21.940408-48.794554-48.794554-48.794554-26.968419 0-48.794554 21.940408-48.794554 48.794554v421.552952l-16.56958 4.685191c-47.651825 13.598482-90.618458 42.966633-121.015065 82.619351-31.310791 40.90972-47.88037 89.818547-47.88037 141.469925 0 128.557081 104.559759 233.11684 233.116839 233.11684s233.11684-104.559759 233.11684-233.11684c0-51.308559-16.341033-99.874568-47.194733-140.670014-29.939516-39.424171-72.334784-68.906595-119.529517-82.847897L534.854592 516.628055V222.032362h45.709184v260.999442c49.823011 18.283674 94.389465 51.080013 126.614441 93.703828 36.910166 48.794554 56.450843 106.959491 56.450842 168.324071 0 74.50597-29.025332 144.441022-81.705167 197.120857-52.565562 52.679835-122.500614 81.590894-197.006584 81.590894z"
        p-id="15437" fill="#1afa29"></path>
      <path d="M461.47421 637.236308l1.137016-310.593906 45.709185 0.166838-1.137016 310.593907z" p-id="15438"
        fill="#1afa29"></path>
      <path
        d="M484.917308 884.358442c-71.877692 0-130.271175-58.393483-130.271175-130.271175s58.393483-130.271175 130.271175-130.271175 130.271175 58.393483 130.271175 130.271175-58.393483 130.271175-130.271175 130.271175z m0-214.833166c-46.623368 0-84.561991 37.938623-84.561991 84.561991s37.938623 84.561991 84.561991 84.561991 84.561991-37.938623 84.561991-84.561991-37.938623-84.561991-84.561991-84.561991zM795.511215 95.875014H654.155563c-12.570026 0-22.854592-10.284566-22.854592-22.854592s10.284566-22.854592 22.854592-22.854592h141.355652c12.570026 0 22.854592 10.284566 22.854592 22.854592s-10.284566 22.854592-22.854592 22.854592zM704.092847 218.147082h-49.937284c-12.570026 0-22.854592-10.284566-22.854592-22.854592s10.284566-22.854592 22.854592-22.854592h49.937284c12.570026 0 22.854592 10.284566 22.854592 22.854592s-10.284566 22.854592-22.854592 22.854592zM795.511215 340.41915H654.155563c-12.570026 0-22.854592-10.284566-22.854592-22.854592s10.284566-22.854592 22.854592-22.854593h141.355652c12.570026 0 22.854592 10.284566 22.854592 22.854593s-10.284566 22.854592-22.854592 22.854592zM704.092847 462.691217h-49.937284c-12.570026 0-22.854592-10.284566-22.854592-22.854592s10.284566-22.854592 22.854592-22.854592h49.937284c12.570026 0 22.854592 10.284566 22.854592 22.854592s-10.284566 22.854592-22.854592 22.854592z"
        p-id="15439" fill="#1afa29"></path>
    </svg>
    <h2 class="panel-title">土壤检测</h2>
    <div class="data-grid">
      <div class="data-item">
        <span class="data-label">含水率</span>
        <span class="data-value">{{ moisture }}</span>
        <span class="data-unit">%</span>
      </div>
      <div class="data-item">
        <span class="data-label">土壤温度</span>
        <span class="data-value">{{ soilTemperature }}</span>
        <span class="data-unit">°C</span>
      </div>
      <div class="data-item">
        <span class="data-label">光照强度</span>
        <span class="data-value">{{ lightIntensity }}</span>
        <span class="data-unit">Lux</span>
      </div>
      <div class="data-item">
        <span class="data-label">PH</span>
        <span class="data-value">{{ soilPh }}</span>
        <span class="data-unit">PH
        </span>
      </div>
    </div>
    <!-- <div class="line-chart small-chart">
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
    </div> -->
  </section>
</template>