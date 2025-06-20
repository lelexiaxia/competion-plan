import axios, { AxiosResponse } from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    console.log('请求配置:', config)
    // 添加 token
    const token = localStorage.getItem('user_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    console.log('响应数据:', response)
    return response
  },
  error => {
    // 统一错误处理
    console.error('API Error:', error)
    const errorMessage = error.response?.data?.message || 
                         error.message || 
                         '未知错误'
    console.error('详细错误信息:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    })
    return Promise.reject(errorMessage)
  }
)

// 本地模拟数据（开发环境使用）
const mockUserData = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  avatar: '/default-avatar.png',
  token: 'mock-token-123456'
}

const mockMatches = [
  { 
    id: 1, 
    name: '英雄联盟全国锦标赛', 
    date: '2024-07-15', 
    time: '14:00',
    teams: ['RNG', 'EDG']
  },
  { 
    id: 2, 
    name: 'DOTA2国际邀请赛', 
    date: '2024-08-20', 
    time: '16:00',
    teams: ['LGD', 'Secret']
  }
]

// 定义响应接口
interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

// 认证服务
export const authService = {
  // 登录
  async login(username: string, password: string) {
    try {
      // 开发环境使用模拟数据
      if (import.meta.env.DEV) {
        console.log('使用模拟登录数据')
        return mockUserData
      }

      console.log('尝试登录:', username)
      const response: AxiosResponse<ApiResponse<any>> = await request.post('/login', { username, password })
      
      console.log('登录响应:', response)
      
      if (response.data.code === 200) {
        return {
          id: response.data.data.id,
          username: response.data.data.username,
          token: response.data.data.token,
          avatar: response.data.data.avatar,
          email: response.data.data.email
        }
      }
      
      console.error('登录失败:', response.data.message)
      return null
    } catch (error) {
      console.error('登录异常:', error)
      return null
    }
  },

  // 获取用户信息
  async getUserInfo(token?: string | null) {
    if (!token) {
      console.warn('无效的 token')
      return null
    }
    
    try {
      // 开发环境使用模拟数据
      if (import.meta.env.DEV) {
        console.log('使用模拟用户信息')
        return mockUserData
      }

      console.log('获取用户信息')
      const response: AxiosResponse<ApiResponse<any>> = await request.get('/user/info')
      
      console.log('用户信息响应:', response)
      
      if (response.data.code === 200) {
        return {
          id: response.data.data.id,
          username: response.data.data.username,
          avatar: response.data.data.avatar,
          email: response.data.data.email
        }
      }
      
      console.error('获取用户信息失败:', response.data.message)
      return null
    } catch (error) {
      console.error('获取用户信息异常:', error)
      return null
    }
  },

  // 注册
  async register(userInfo: {
    username: string,
    password: string,
    email: string
  }) {
    try {
      // 开发环境使用模拟数据
      if (import.meta.env.DEV) {
        console.log('使用模拟注册')
        return true
      }

      console.log('尝试注册:', userInfo.username)
      const response: AxiosResponse<ApiResponse<any>> = await request.post('/register', userInfo)
      
      console.log('注册响应:', response)
      
      return response.data.code === 200
    } catch (error) {
      console.error('注册异常:', error)
      return false
    }
  }
}

// 比赛服务
export const matchService = {
  async getMatches() {
    try {
      // 开发环境使用模拟数据
      if (import.meta.env.DEV) {
        console.log('使用模拟比赛列表')
        return mockMatches
      }

      console.log('获取比赛列表')
      const response: AxiosResponse<ApiResponse<any[]>> = await request.get('/matches')
      
      console.log('比赛列表响应:', response)
      
      return response.data.code === 200 ? response.data.data : []
    } catch (error) {
      console.error('获取比赛列表失败', error)
      return []
    }
  },

  async getMatchDetails(matchId: number) {
    try {
      // 开发环境使用模拟数据
      if (import.meta.env.DEV) {
        console.log('使用模拟比赛详情')
        return mockMatches.find(match => match.id === matchId) || null
      }

      console.log(`获取比赛 ${matchId} 详情`)
      const response: AxiosResponse<ApiResponse<any>> = await request.get(`/matches/${matchId}`)
      
      console.log('比赛详情响应:', response)
      
      return response.data.code === 200 ? response.data.data : null
    } catch (error) {
      console.error(`获取比赛 ${matchId} 详情失败`, error)
      return null
    }
  },

  async reserveMatch(matchId: number) {
    try {
      // 开发环境使用模拟数据
      if (import.meta.env.DEV) {
        console.log('使用模拟预约比赛')
        return true
      }

      console.log(`预约比赛 ${matchId}`)
      const response: AxiosResponse<ApiResponse<any>> = await request.post('/reserve', { matchId })
      
      console.log('预约比赛响应:', response)
      
      return response.data.code === 200
    } catch (error) {
      console.error(`预约比赛 ${matchId} 失败`, error)
      return false
    }
  }
} 