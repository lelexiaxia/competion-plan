<template>
  <div class="match-detail">
    <el-card v-if="match" class="max-w-md mx-auto">
      <h1 class="text-2xl font-bold mb-4">{{ match.name }}</h1>
      <div class="match-info">
        <p><strong>时间：</strong>{{ match.time }}</p>
        <p><strong>地点：</strong>{{ match.location }}</p>
        <p><strong>描述：</strong>{{ match.description }}</p>
      </div>
      <el-button type="primary" @click="reserveMatch">立即预约</el-button>
    </el-card>
    <el-empty v-else description="未找到比赛信息" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElCard, ElButton, ElEmpty } from 'element-plus'

interface Match {
  id: number
  name: string
  time: string
  location: string
  description: string
}

const route = useRoute()
const match = ref<Match | null>(null)

onMounted(() => {
  const matchId = Number(route.params.id)
  // 模拟获取比赛详情
  match.value = {
    id: matchId,
    name: '英雄联盟全球总决赛',
    time: '2024-10-01 19:00',
    location: '北京国家体育场',
    description: '全球最顶级的英雄联盟比赛，各大赛区冠军队伍将在此一决高下'
  }
})

const reserveMatch = () => {
  // 预约逻辑
  console.log(`预约比赛 ${match.value?.id}`)
}
</script>

<style scoped>
.match-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.match-info {
  margin: 20px 0;
  text-align: left;
}
</style> 