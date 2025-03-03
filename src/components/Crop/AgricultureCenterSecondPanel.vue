<script setup>
import { onMounted, ref, watch } from 'vue'; // 引入生命周期、响应式引用和监听
import * as echarts from 'echarts';   // 引入 ECharts 库

// TODO 美化一下饼图的标题

// 图表容器引用
const chartRef = ref(null);
var week_data = [
	{ value: 13281.09, name: '2025-02-19' },
	{ value: 7979.87, name: '2025-02-20' },
	{ value: 8287.19, name: '2025-02-21' },
	{ value: 14618.15, name: '2025-02-22' },
	{ value: 11452.45, name: '2025-02-23' },
	{ value: 10809.81, name: '2025-02-24' },
	{ value: 8674.41, name: '2025-02-25' },
]
var week_top5_data = [
	{ value: 5351.44, name: '洋葱' },
	{ value: 2959.21, name: '西红柿' },
	{ value: 2949.12, name: '土豆' },
	{ value: 2889.43, name: '红椒' },
	{ value: 2863.95, name: '茄子' }
]

var month_data = [
	{ value: 16204.45, name: '2025-01-27' },
	{ value: 21846.59, name: '2025-01-28' },
	{ value: 15971.28, name: '2025-01-29' },
	{ value: 13547.91, name: '2025-01-30' },
	{ value: 19299.37, name: '2025-01-31' },
	{ value: 18020.54, name: '2025-02-01' },
	{ value: 9051.84, name: '2025-02-02' },
	{ value: 13281.09, name: '2025-02-03' },
	{ value: 11452.45, name: '2025-02-04' },
	{ value: 12741.64, name: '2025-02-05' },
	{ value: 10880.96, name: '2025-02-06' },
	{ value: 15950.32, name: '2025-02-07' },
	{ value: 15220.57, name: '2025-02-08' },
	{ value: 7960, name: '2025-02-09' },
	{ value: 14618.15, name: '2025-02-10' },
	{ value: 19390.77, name: '2025-02-11' },
	{ value: 12665.52, name: '2025-02-12' },
	{ value: 18142.73, name: '2025-02-13' },
	{ value: 14317.71, name: '2025-02-14' },
	{ value: 18028.54, name: '2025-02-15' },
	{ value: 8752.92, name: '2025-02-16' },
	{ value: 4966.67, name: '2025-02-17' },
	{ value: 16287.41, name: '2025-02-18' },
	{ value: 10093.35, name: '2025-02-19' },
	{ value: 8287.19, name: '2025-02-20' },
	{ value: 8977.85, name: '2025-02-21' },
	{ value: 10809.81, name: '2025-02-22' },
	{ value: 16927.12, name: '2025-02-23' },
	{ value: 5064.14, name: '2025-02-24' },
	{ value: 7979.87, name: '2025-02-25' }
]
var month_top5_data = [
	{ value: 14366.44, name: '红椒' },
	{ value: 11462.77, name: '生菜' },
	{ value: 8651.63, name: '胡萝卜' },
	{ value: 8584.34, name: '茄子' },
	{ value: 8580.29, name: '西红柿' }
]

// 完整的 ECharts 配置项
const option = {
	baseOption: {
		timeline: {
			show: true,
			type: 'slider',
			axisType: 'category',
			bottom: '0',
			currentIndex: 0,
			autoPlay: true,
			loop: true,
			playInterval: 3000,
			realtime: true,
			controlPosition: 'left',
			label: {
				normal: { color: '#2998ff' }
			},
			itemStyle: {
				normal: {
					color: '#fff',
					borderColor: '#2998ff',
					borderWidth: 2
				}
			},
			checkpointStyle: { color: 'rgb(215, 0, 0)' },
			lineStyle: { color: '#2998ff' },
			controlStyle: {
				show: true,
				showPrevBtn: false,
				showNextBtn: false,
				itemGap: 50,
				itemSize: 36,
				normal: { color: 'rgb(215, 0, 0)', borderColor: 'rgb(215, 0, 0)' },
				emphasis: { color: 'rgb(215, 0, 0)', borderColor: 'rgb(215, 0, 0)' }
			},
			data: ['本周', '本月']
		},
		color: ["#00ffa1", "#00fcff", "#f0e751", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],
		legend: [
			{
				show: true,
				top: '5%',
				left: 'center',
				textStyle: { fontSize: 12, color: '#fff' },
				data: ['每日总耗水量（m³）']
			},
			{
				show: true,
				left: '0%',
				bottom: '20%',
				orient: 'vertical',
				itemWidth: 10,
				textStyle: { fontSize: 12, color: '#fff' },
				tooltip: {
					show: true,
				},
				data: [...week_top5_data.map(item => item.name), ...month_top5_data.map(item => item.name)]
			}
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		title: [
			{
				right: '0%',
				top: '0%',
				textStyle: {
					align: 'center',
					color: '#fff',
					rich: {
						white: { color: '#fff', fontSize: 18, fontFamily: 'Microsoft YaHei' },
						blue: { color: '#00eaff', fontSize: 18, fontFamily: 'Microsoft YaHei' }
					}
				}
			},
			{
				left: '10%',
				top: '60%',
				text: '种植作物耗水量top5',
				textStyle: {
					color: '#fff',
					fontSize: 16
				}
			},
			{
				left: '10%',
				top: '50%',
				// text: '单日耗水Top5',
				textStyle: {
					color: '#fff',
					fontSize: 16,
					fontWeight: 'bold',
					backgroundColor: '#4CAF50',
					padding: [5, 10],
					borderRadius: 5
				}
			}
		],
		xAxis: {
			type: 'category',
			boundaryGap: false,
			axisLabel: { color: '#fff', fontSize: 12, rotate: 45 },
			axisLine: { show: true, lineStyle: { color: '#11839c' } },
			axisTick: { show: false },
			splitLine: { show: true, lineStyle: { color: '#0b4377' } },
			data: week_data.map(item => item.name)
		},
		yAxis: {
			type: 'value',
			show: true, // 修正重复的 show 属性
			nameLocation: 'end',
			nameGap: 40,
			nameTextStyle: { color: '#FFF', fontSize: 16, padding: [0, 0, 0, 74] },
			axisLabel: { color: '#fff', fontSize: 12 },
			axisLine: { show: true, lineStyle: { color: '#11839c' } },
			axisTick: { show: true },
			splitLine: { show: true, lineStyle: { color: '#0b4377' } }
		},
		grid: [{ left: '10%', width: '85%', height: '25%' }],
		series: [
			{
				name: '单日耗水Top5',
				type: 'pie',
				startAngle: 90,
				hoverAnimation: true,
				radius: ['20%', '35%'],
				center: ['50%', '70%'],
				color: ['#39cad4', '#51ebb3', '#f9f48e', '#fba790', '#21b4f6', '#F136AF', '#FF875C'],
				label: {
					normal: {
						formatter: params => `${params.percent.toFixed(1)}%`,
						color: "#FFF",
						fontSize: 16
					}
				},
				tooltip: {
					trigger: 'item',
					formatter: params => {
						return `${params.name}：${params.value}（m³）`
					}
				},
				itemStyle: {
					normal: {
						labelLine: { length: 0, length2: 40, show: true, smooth: true, color: '#00ffff' }
					}
				}
			},
			{
				name: '每日总耗水量（m³）',
				type: 'line',
				smooth: true,
				symbolSize: 0.5,
				symbol: 'circle',
				lineStyle: {
					normal: {
						opacity: 0.2
					}
				},

				areaStyle: {
					normal: {
						opacity: 0.2
					}
				}
			}
		]
	},
	options: [
		{
			title: { text: '{blue|过去七天}/{white|过去30天}' },
			series: [
				{
					data: week_top5_data
				},
				{ data: week_data },
			]
		},
		{
			title: { text: '{white|过去七天}/{blue|过去30天}' },
			series: [
				{
					data: month_top5_data
				},
				{ data: month_data },
			]
		}
	]
};

// 初始化图表
onMounted(() => {
	if (chartRef.value) {
		const myChart = echarts.init(chartRef.value);
		myChart.setOption(option);

		// 监听时间轴变化
		myChart.on('timelinechanged', function (params) {
			if (params.currentIndex === 1) {
				myChart.setOption({
					xAxis: {
						data: month_data.map(item => item.name)
					}
				});
			} else {
				myChart.setOption({
					xAxis: {
						data: week_data.map(item => item.name)
					}
				});
			}
		});

		window.addEventListener('resize', () => myChart.resize());
	}
});
</script>

<template>
	<div class="panel-box water-quality-panel">
		<div class="panel-title">近期水量消耗检测</div>
		<svg t="1740575256427" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
			p-id="3922" width="30" height="30">
			<path
				d="M342.4 684.8c-12.8 12.8-32 9.6-44.8-3.2-12.8-12.8-9.6-32 3.2-44.8 38.4-35.2 83.2-44.8 124.8-22.4 16 6.4 28.8 16 38.4 32 3.2 3.2 3.2 3.2 6.4 9.6 12.8 16 19.2 19.2 44.8 16 9.6 0 19.2-9.6 41.6-32l6.4-6.4c60.8-67.2 112-83.2 192-19.2 12.8 9.6 16 32 6.4 44.8-9.6 12.8-32 16-44.8 6.4-48-38.4-64-35.2-105.6 12.8l-6.4 6.4c-32 35.2-51.2 48-83.2 51.2-48 3.2-73.6-9.6-99.2-38.4l-6.4-6.4c-6.4-6.4-12.8-12.8-19.2-16-16-12.8-35.2-9.6-54.4 9.6z"
				fill="#1afa29" p-id="3923"></path>
			<path
				d="M384 131.2c16-6.4 35.2 3.2 41.6 19.2 6.4 16-3.2 35.2-19.2 41.6C259.2 236.8 160 371.2 160 524.8c0 195.2 156.8 352 352 352s352-156.8 352-352c0-153.6-99.2-288-246.4-336-16-6.4-25.6-22.4-19.2-41.6s22.4-22.4 41.6-19.2c169.6 54.4 288 214.4 288 396.8 0 230.4-185.6 416-416 416s-416-185.6-416-416c0-179.2 118.4-339.2 288-393.6z"
				fill="#1afa29" p-id="3924"></path>
		</svg>
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<style scoped>
.chart-container {
	width: 100%;
	height: 459px;
}
</style>