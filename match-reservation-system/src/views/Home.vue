<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div class="flex items-center">
          <div class="flex space-x-4">
            <a href="#" class="text-gray-800 hover:text-blue-600">首页</a>
            <a href="#" class="text-gray-800 hover:text-blue-600">赛事</a>
            <a href="#" class="text-gray-800 hover:text-blue-600">分类</a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <input 
            type="text" 
            placeholder="搜索赛事/主播" 
            class="border rounded-full px-4 py-2 w-64"
          >
          <button class="bg-blue-500 text-white px-4 py-2 rounded-full">登录</button>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <!-- 推荐位 -->
      <div class="grid grid-cols-3 gap-6 mb-6">
        <div class="col-span-2 bg-white rounded-lg overflow-hidden shadow-md">
          <div class="w-full h-96 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-500">{{ featuredMatch.name }}</span>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold">{{ featuredMatch.name }}</h2>
            <p class="text-gray-600">{{ featuredMatch.description }}</p>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-4">
          <h3 class="text-lg font-semibold mb-4">热门赛事</h3>
          <div class="space-y-4">
            <div 
              v-for="match in hotMatches" 
              :key="match.id" 
              class="flex items-center hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
            >
              <div class="w-16 h-16 bg-gray-200 mr-4 rounded-lg flex items-center justify-center">
                <span class="text-xs text-gray-500">{{ match.name }}</span>
              </div>
              <div>
                <h4 class="font-medium">{{ match.name }}</h4>
                <p class="text-sm text-gray-500">{{ match.viewers }}人在线</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 全部直播 -->
      <div>
        <h2 class="text-2xl font-bold mb-6">全部直播</h2>
        <div class="grid grid-cols-4 gap-6">
          <div 
            v-for="stream in streams" 
            :key="stream.id" 
            class="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform"
          >
            <div class="relative bg-gray-200 h-48 flex items-center justify-center">
              <span class="text-gray-500">{{ stream.title }}</span>
              <span class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {{ stream.type }}
              </span>
              <span class="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                {{ stream.viewers }}
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-semibold">{{ stream.title }}</h3>
              <div class="flex items-center mt-2">
                <div class="w-8 h-8 rounded-full mr-2 bg-gray-300 flex items-center justify-center">
                  <span class="text-xs text-gray-500">{{ stream.anchorName[0] }}</span>
                </div>
                <span>{{ stream.anchorName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 特色赛事
const featuredMatch = ref({
  name: '三角洲行动 黑夜之子赛季',
  description: '王牌主播招募集结，精彩赛事等你来战！',
  coverImage: ''
})

// 热门赛事
const hotMatches = ref([
  {
    id: 1,
    name: 'CS:GO Major赛事',
    coverImage: '',
    viewers: 23456
  },
  {
    id: 2,
    name: 'LOL职业联赛',
    coverImage: '',
    viewers: 45678
  },
  {
    id: 3,
    name: 'DOTA2国际邀请赛',
    coverImage: '',
    viewers: 12345
  }
])

// 直播流
const streams = ref([
  {
    id: 1,
    title: '职业选手带你上分',
    type: '游戏',
    coverImage: '',
    viewers: '2.3万',
    anchorName: '小王电竞',
    anchorAvatar: ''
  },
  {
    id: 2,
    title: '最新赛事解说',
    type: '赛事',
    coverImage: '',
    viewers: '5.6万',
    anchorName: '电竞解说',
    anchorAvatar: ''
  },
  {
    id: 3,
    title: '精彩集锦回放',
    type: '娱乐',
    coverImage: '',
    viewers: '1.2万',
    anchorName: '娱乐主播',
    anchorAvatar: ''
  },
  {
    id: 4,
    title: '职业训练直播',
    type: '游戏',
    coverImage: '',
    viewers: '3.4万',
    anchorName: '职业选手',
    anchorAvatar: ''
  }
])
</script>

<style scoped>
/* 可以添加额外的自定义样式 */
</style> 