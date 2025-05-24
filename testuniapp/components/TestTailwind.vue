<template>
  <view class="test-container">
    <view class="w-full h-1/2 bg-blue-500">
      这是一个高度为1/2的区域
    </view>
    <view class="w-full h-[50px] bg-green-500">
      这是一个高度为[50px]的区域
    </view>
    <view class="w-full bg-red-500 hover:bg-red-700">
      这是一个有hover效果的区域
    </view>
  </view>
</template>

<script setup>
// 测试组件
</script>

<style>
.test-container {
  padding: 20px;
}
</style>
