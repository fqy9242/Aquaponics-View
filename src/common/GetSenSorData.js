/**
 * 获取传感器数据
 * @author qht
 * @Date 2021-03-10
 */
import { reactive } from "vue";
import config from "@/../config.json";
const sensorData = reactive({
  directionGrade: 1, // 风的级别
  directionAngle: null, // 风的角度
  windDirection: null, // 风向
  airHumidity: null, // 空气湿度
  airTemperature: null, // 空气温度
  noise: null, // 噪声
  pm25Value: null, // ph2.5
  light: null, // 光照强度
  swindSpeed: null, // 风速
  soilTemperature: null, // 土壤温度
  soilMoisture: null, // 土壤湿度
  conductivity: 0, // 电导率
  soilPhValue: null, // 土壤PH值
  waterTemperature: null, // 水温
  waterPhValue: null //水的PH值
});

let ws;
let connectionInitiated = false;

function connectWebSocket() {
  if (connectionInitiated) return; // 已连接则直接返回
  connectionInitiated = true;
  ws = new WebSocket(config.getSensorDataWsUrl);
  ws.onopen = () => {
    console.log("获取传感器WebSocket连接成功。。。");
  };
  // 从WebSocket获取到数据 => 解析
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.data) {
        if (data.data["01"]) {
            sensorData.directionGrade = data.data["01"].direction_grade || sensorData.directionGrade;
            sensorData.directionAngle = data.data["01"].direction_angle || sensorData.directionAngle;
            sensorData.windDirection = data.data["01"].direction || sensorData.windDirection;
        }
        if (data.data["02"]) {
            sensorData.airHumidity = data.data["02"].humidity || sensorData.airHumidity;
            sensorData.airTemperature = data.data["02"].air_temperature || sensorData.airTemperature;
            sensorData.noise = data.data["02"].noise || sensorData.noise;
            sensorData.pm25Value = data.data["02"].pm25 || sensorData.pm25Value;
            sensorData.light = data.data["02"].light || sensorData.light;
        }
        if (data.data['03']) {
            sensorData.swindSpeed = data.data['03'].speed || sensorData.swindSpeed
        }
        if (data.data['04']) {
            sensorData.soilMoisture = data.data['04'].moisture_4 || sensorData.soilMoisture
        }
        if (data.data["06"]) {
            sensorData.soilTemperature = data.data["06"].soil_temperature_6 || sensorData.soilTemperature;
            sensorData.conductivity = data.data["06"].conductivity || sensorData.conductivity;
        }
        if (data.data["05"]) {
            sensorData.soilPhValue = data.data["05"].soil_ph || sensorData.soilPhValue;
        }
        if (data.data["08"]) {
            sensorData.waterTemperature = data.data["08"].water_temperature || sensorData.waterTemperature;
            sensorData.waterPhValue = data.data["08"].water_ph_value || sensorData.waterPhValue;
        }
      sensorData.collectionTime = new Date().toLocaleString();
    }
  };

  ws.onclose = () => {
    console.log("获取传感器WebSocket连接断开。。。");
    connectionInitiated = false;
  };

  ws.onerror = (error) => {
        console.log("获取传感器WebSocket连接失败。。。");
  };
}

// 初始化连接，保证全局只有一份 WebSocket 实例
connectWebSocket();

export function useSensorData() {
  // 返回响应式数据供组件直接使用
  return sensorData;
}