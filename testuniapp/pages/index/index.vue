<template>
  <view class="p-4">
    <view class="text-center mb-8">
      <text class="text-2xl font-bold text-blue-600">TailwindCSS 样例展示</text>
    </view>
    
    <!-- 基础样式示例 -->
    <view class="mb-6 p-4 bg-gray-100 rounded-lg">
      <text class="text-lg font-medium mb-2">基础样式</text>
      <view class="h-32 bg-blue-500 text-white flex items-center justify-center">
        <text class="text-xl">基础容器</text>
      </view>
    </view>
    
    <!-- 分数语法示例 -->
    <view class="mb-6 p-4 bg-gray-100 rounded-lg">
      <text class="text-lg font-medium mb-2">分数语法 (h-1/2, w-1/3)</text>
      <view class="flex">
        <view class="h-32 w-1/3 bg-red-500 flex items-center justify-center">
          <text class="text-white">w-1/3</text>
        </view>
        <view class="h-32 w-2/3 bg-red-300 flex items-center justify-center">
          <text class="text-white">w-2/3</text>
        </view>
      </view>
      <view class="mt-2 h-1/2 bg-red-200 p-2">
        <text>h-1/2 高度</text>
      </view>
    </view>
    
    <!-- 中括号语法示例 -->
    <view class="mb-6 p-4 bg-gray-100 rounded-lg">
      <text class="text-lg font-medium mb-2">中括号语法 (h-[50px], w-[80%])</text>
      <view class="h-[50px] bg-green-500 flex items-center justify-center">
        <text class="text-white">h-[50px]</text>
      </view>
      <view class="mt-2 h-[75px] w-[80%] bg-green-300 flex items-center justify-center">
        <text class="text-white">h-[75px] w-[80%]</text>
      </view>
      <view class="mt-2 p-[15px] bg-green-200">
        <text>p-[15px] 内边距</text>
      </view>
    </view>
    
    <!-- 字号设置示例 -->
    <view class="mb-6 p-4 bg-gray-100 rounded-lg">
      <text class="text-lg font-medium mb-2">字号设置</text>
      <view class="space-y-2">
        <text class="text-xs">这是 text-xs 尺寸</text>
        <text class="text-sm">这是 text-sm 尺寸</text>
        <text class="text-base">这是 text-base 尺寸</text>
        <text class="text-lg">这是 text-lg 尺寸</text>
        <text class="text-xl">这是 text-xl 尺寸</text>
        <text class="text-2xl">这是 text-2xl 尺寸</text>
        <text class="text-[18px]">这是 text-[18px] 自定义尺寸</text>
      </view>
    </view>
    
    <!-- Hover 效果示例 -->
    <view class="mb-6 p-4 bg-gray-100 rounded-lg">
      <text class="text-lg font-medium mb-2">Hover 效果 (微信小程序不支持，但其他平台有效)</text>
      <view class="flex space-x-2">
        <view class="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">
          <text>Hover 变色</text>
        </view>
        <view class="bg-purple-500 hover:bg-purple-700 hover:scale-105 text-white p-2 rounded">
          <text>Hover 变色和缩放</text>
        </view>
      </view>
    </view>
    
    <!-- 颜色和边框示例 -->
    <view class="mb-6 p-4 bg-gray-100 rounded-lg">
      <text class="text-lg font-medium mb-2">颜色和边框</text>
      <view class="flex flex-wrap">
        <view class="w-1/3 p-2">
          <view class="h-20 bg-red-500 rounded-lg"></view>
          <text class="text-center mt-1">bg-red-500</text>
        </view>
        <view class="w-1/3 p-2">
          <view class="h-20 bg-blue-500 rounded-lg"></view>
          <text class="text-center mt-1">bg-blue-500</text>
        </view>
        <view class="w-1/3 p-2">
          <view class="h-20 bg-green-500 rounded-lg"></view>
          <text class="text-center mt-1">bg-green-500</text>
        </view>
        <view class="w-1/3 p-2">
          <view class="h-20 bg-yellow-500 rounded-lg"></view>
          <text class="text-center mt-1">bg-yellow-500</text>
        </view>
        <view class="w-1/3 p-2">
          <view class="h-20 bg-purple-500 rounded-lg"></view>
          <text class="text-center mt-1">bg-purple-500</text>
        </view>
        <view class="w-1/3 p-2">
          <view class="h-20 border-2 border-pink-500 rounded-lg"></view>
          <text class="text-center mt-1">border-pink-500</text>
        </view>
      </view>
    </view>
    
    <!-- 按钮示例 -->
    <view class="mb-6 p-4 bg-gray-100 rounded-lg">
      <text class="text-lg font-medium mb-2">按钮样式</text>
      <view class="flex flex-wrap gap-2">
        <view class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <text>基础按钮</text>
        </view>
        <view class="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700">
          <text>圆角按钮</text>
        </view>
        <view class="border-2 border-purple-500 text-purple-500 px-4 py-2 rounded-lg hover:bg-purple-500 hover:text-white">
          <text>边框按钮</text>
        </view>
        <view class="bg-[#ff6b6b] text-white px-4 py-2 rounded-lg hover:bg-[#ee5253]">
          <text>自定义颜色</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
// TailwindCSS 样例展示页面
</script>

<style>
/* 这里可以写一些组件私有的样式 */
</style>