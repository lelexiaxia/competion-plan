import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/api'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref({
    id: '',
    username: '',
    avatar: '',
    email: ''
  })

  // 登录状态
  const isLoggedIn = ref(false)

  // 初始化检查登录状态
  function initLoginStatus() {
    const token = localStorage.getItem('user_token')
    isLoggedIn.value = !!token
    
    if (isLoggedIn.value) {
      // 尝试获取用户信息
      fetchUserInfo().catch(() => {
        // 获取用户信息失败，清除 token
        logout()
      })
    }
  }

  // 登录方法
  async function login(username: string, password: string): Promise<boolean> {
    try {
      const user = await authService.login(username, password)
      
      if (user) {
        // 更新用户信息
        userInfo.value = {
          id: user.id,
          username: user.username,
          avatar: user.avatar || '/default-avatar.png',
          email: user.email
        }
        
        // 更新登录状态
        isLoggedIn.value = true
        
        // 存储 token
        if (user.token) {
          localStorage.setItem('user_token', user.token)
        }
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('登录失败:', error)
      return false
    }
  }

  // 注册方法
  async function register(userInfo: {
    username: string,
    password: string,
    email: string
  }): Promise<boolean> {
    try {
      const success = await authService.register(userInfo)
      
      if (success) {
        // 注册成功后自动登录
        const loginResult = await login(userInfo.username, userInfo.password)
        return loginResult
      }
      
      return false
    } catch (error) {
      console.error('注册失败:', error)
      return false
    }
  }

  // 登出方法
  function logout() {
    // 清除用户信息
    userInfo.value = {
      id: '',
      username: '',
      avatar: '',
      email: ''
    }
    
    // 更新登录状态
    isLoggedIn.value = false
    
    // 移除 token
    localStorage.removeItem('user_token')
  }

  // 检查是否已登录（通过 token）
  function checkLoginStatus() {
    const token = localStorage.getItem('user_token')
    isLoggedIn.value = !!token
    return isLoggedIn.value
  }

  // 获取用户信息
  async function fetchUserInfo() {
    if (!isLoggedIn.value) return null
    
    try {
      const token = localStorage.getItem('user_token')
      const user = await authService.getUserInfo(token)
      
      if (user) {
        userInfo.value = user
        return user
      }
      
      return null
    } catch (error) {
      console.error('获取用户信息失败:', error)
      // 获取用户信息失败，清除登录状态
      logout()
      return null
    }
  }

  // 初始化登录状态
  initLoginStatus()

  return {
    userInfo,
    isLoggedIn,
    login,
    logout,
    register,
    checkLoginStatus,
    fetchUserInfo
  }
}, {
  // 移除持久化配置，因为已经全局添加了插件
}) 