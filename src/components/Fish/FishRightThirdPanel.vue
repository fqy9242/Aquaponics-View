<script setup>
// TODO 把数据换成动态的
</script>

<template>
    <div class="panel-box water-quality-panel">
        <div class="panel-content">
            <svg t="1740053648191" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="19817" width="30" height="30">
                <path
                    d="M580 299.3c9.9 7.3 26.2 1.9 36.4-12.1C626.7 273.3 761.9 73.1 752 65.8S591 247 580.7 260.9c-10.3 13.9-10.6 31.1-0.7 38.4zM641.3 344.5c9.9 7.3 26.2 1.9 36.4-12.1C688 318.5 823.2 118.3 813.3 111c-9.9-7.3-161.1 181.1-171.3 195-10.3 14-10.6 31.2-0.7 38.5zM702.6 389.7c9.9 7.3 26.2 1.9 36.4-12.1 10.3-13.9 145.5-214.1 135.6-221.4-9.9-7.3-161.1 181.1-171.3 195-10.3 14-10.6 31.2-0.7 38.5zM639.2 350.2c-10.7-7.9-430.1 540-440.3 553.9s-9.9 31.6 0.7 39.5 27.6 3 37.9-11 412.4-574.5 401.7-582.4z"
                    fill="#1afa29" p-id="19818"></path>
                <path
                    d="M620.9 572.3c41.7 30.8 108.5 31 172.9-23.5 72.1-61 125.4-173.3 123.5-174.7-10.9-0.8-76.6 84.4-196.5 62.7-42.2-7.6-101.1-32.5-131 8-27.6 37.4-13.7 94.5 31.1 127.5z m19.4-118.9c14.6-0.3 32.6 4 50 8.2 8.8 2.1 17.9 4.3 26.6 5.8 43.9 8 81.4 3.5 112.5-6.1-16 21.8-35.5 45.1-57 63.3-25.5 21.6-52.6 34.3-78.4 36.8-21 2-39.9-2.7-54.9-13.7-15.2-11.2-25.9-26.5-29.9-43.1-3.7-15.2-1.3-29.6 6.8-40.6 3.9-5.3 9.5-10.3 24.3-10.6z"
                    fill="#1afa29" p-id="19819"></path>
                <path
                    d="M620.6 608.8c-46.7-11-107.7-50.7-149.6 6.1-27.6 37.4-8.4 98.4 42.9 136.2 47.8 35.2 120.9 40.2 187.6-12.7 74.6-59.2 130.2-162.5 128.1-164.1-12-1.6-76.3 65.6-209 34.5z m128.3 33.3c-17.9 23.3-41.6 50.5-68.2 71.6-26.1 20.7-54.8 32.1-82.9 32.9-24.2 0.7-47-6.2-65.7-20-36.1-26.6-52.1-68.9-34.8-92.3 11.6-15.7 22.9-17.9 32.3-17.9 15 0 33.4 6.3 51.3 12.4 11.2 3.8 22.7 7.8 34.2 10.5 54.4 12.7 98.9 10.5 133.8 2.8z"
                    fill="#1afa29" p-id="19820"></path>
                <path
                    d="M716.2 775.6c0-0.1 0-0.1 0 0-12-1.6-90.6 46.6-223.2 15.5-46.7-11-95-67.9-149.6 6.1-27.6 37.4-8.4 98.4 42.9 136.2 47.8 35.2 120.9 40.2 187.6-12.7 74.6-59.2 144.2-143.7 142.3-145.1zM553 895.9c-26.1 20.7-54.8 32.1-82.9 32.9-24.2 0.7-47-6.2-65.7-20-36.1-26.6-52.1-68.9-34.8-92.3 18.5-25.1 31-25.3 35.1-25.4 11.1-0.2 25.2 6.6 40.1 13.7 13.4 6.4 27.3 13.1 42.6 16.7 54.5 12.8 100.8 13.2 137.9 8.9-21.4 21.5-46.3 44.9-72.3 65.5z"
                    fill="#1afa29" p-id="19821"></path>
                <path
                    d="M429.7 431.3c44.8 33 103.4 29.4 131-8 29.9-40.5-11.3-89.5-31.1-127.5-56.2-108 5.8-196.1 1.8-206.2-1.9-1.4-93.4 82.7-130.4 169.7-33 77.6-13 141.3 28.7 172z m71.8-122.6c4.1 7.8 8.8 15.9 13.4 23.7 9.1 15.4 18.6 31.4 22.6 45.4 4.1 14.2 1 21-2.9 26.4-8.1 11-21.1 17.6-36.7 18.5-17 1-34.8-4.6-50-15.8-14.9-11-25.1-27.7-29.3-48.4-5.2-25.3-1.1-55 12-85.8 11-25.9 27.5-51.5 43.6-73.2-0.2 32.4 6.7 69.6 27.3 109.2z"
                    fill="#1afa29" p-id="19822"></path>
                <path
                    d="M290.4 586.4c51.3 37.8 115.2 38.1 142.8 0.7 41.9-56.8-14.1-103.4-38.4-144.7-69-117.5-23.8-198.8-28.9-209.7-2.1-1.6-84.4 82.1-118.9 170.9-30.7 79.2-4.3 147.6 43.4 182.8z m77.1-129.6c5.9 10.1 13.1 20 20.1 29.5 11.1 15.3 22.6 31 27 45.3 2.8 9 4.1 20.4-7.5 36.2-17.3 23.4-62.4 20.7-98.5-6-18.8-13.8-32.1-33.5-38.6-56.8-7.5-27.1-5.1-57.8 7-88.9 12.3-31.7 31.2-62.4 48.2-86.3 2.9 35.5 14 78.6 42.3 127z"
                    fill="#1afa29" p-id="19823"></path>
                <path
                    d="M258.5 618.2c-69-117.5-46.1-206.8-51.2-217.8-1.9-1.4-62.1 90.2-96.5 178.9-30.8 79.4-4.5 147.7 43.3 183 51.3 37.8 115.2 38.1 142.8 0.7 54.6-74.1-14.1-103.5-38.4-144.8z m-86.3 119.4c-18.8-13.8-32.1-33.5-38.6-56.9-7.5-27.1-5.1-57.8 7-88.9 12-30.9 27-61.6 41.3-88.4 6.8 36.7 20.9 80.8 49.3 129.1 8 13.6 18.4 24.9 28.5 35.8 11.2 12.1 21.8 23.6 24.9 34.3 1.1 3.9 4.6 15.9-13.9 41-17.2 23.4-62.3 20.7-98.5-6z"
                    fill="#1afa29" p-id="19824"></path>
            </svg>
            <div class="panel-title">主要种植作物top5</div>
        </div>

        <ul class="crop-list">
            <li class="crop-item">
                <span class="crop-range">1</span>
                <img src="@/assets/static/chinese-cabbage.jpg" draggable="false" class="crop-image" />
                <span class="crop-name">大白菜</span>
                <span class="crop-line"></span>
                <span class="crop-value">556</span><span class="crop-unit">亩</span>
            </li>
            <li class="crop-item">
                <span class="crop-range">2</span>
                <img src="@/assets/static/cucumber.png" draggable="false" class="crop-image" />
                <span class="crop-name">黄瓜</span>
                <span class="crop-line"></span>
                <span class="crop-value">260</span><span class="crop-unit">亩</span>
            </li>
            <li class="crop-item">
                <span class="crop-range">3</span>
                <img src="@/assets/static/carrot.png" draggable="false" class="crop-image" />
                <span class="crop-name">胡萝卜</span>
                <span class="crop-line"></span>
                <span class="crop-value">160</span><span class="crop-unit">亩</span>
            </li>
            <li class="crop-item">
                <span class="crop-range">4</span>
                <img src="@/assets/static/tomato.jpg" draggable="false" class="crop-image" />
                <span class="crop-name">西红柿</span>
                <span class="crop-line"></span>
                <span class="crop-value">90</span><span class="crop-unit">亩</span>
            </li>
            <li class="crop-item">
                <span class="crop-range">5</span>
                <img src="@/assets/static/spinach.jpg" draggable="false" class="crop-image" />
                <span class="crop-name">菠菜</span>
                <span class="crop-line"></span>
                <span class="crop-value">46</span><span class="crop-unit">亩</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.panel-content {
    display: flex;
    align-items: center;
}

.panel-title {
    margin-left: 10px;
}

.crop-list {
    margin-top: 10px;
    padding-left: 20px;
}

.crop-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    /* 缩小整体大小 */
}

.crop-range {
    width: 30px;
    /* 增加序号宽度 */
    text-align: center;
    color: white;
    margin-right: 10px;
    /* 增加序号与图片的间距 */
}

.crop-image {
    width: 40px;
    /* 缩小图片大小 */
    height: 40px;
    /* 缩小图片大小 */
    border-radius: 50%;
    margin-right: 10px;
}

.crop-name {
    color: white;
    margin-right: 10px;
}

.crop-line {
    flex-grow: 1;
    height: 1px;
    background-color: white;
    margin-right: 10px;
}

.crop-value {
    color: #1afa29;
}

.crop-unit {
    color: white;
}
</style>