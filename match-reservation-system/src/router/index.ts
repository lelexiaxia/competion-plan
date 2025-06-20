import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Home from '../views/Home.vue'
import MatchDetail from '../views/MatchDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'

console.log('开始配置路由...')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/match/:id',
    name: 'MatchDetail',
    component: MatchDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  // 添加一个通用的重定向路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

console.log('路由配置完成，开始创建路由实例...')

const router = createRouter({
  history: createWebHistory(),
  routes
})

console.log('路由实例创建成功，开始配置全局路由守卫...')

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  console.log('触发路由守卫:', { 
    to: to.path, 
    from: from.path, 
    requiresAuth: to.meta.requiresAuth,
    requiresGuest: to.meta.requiresGuest
  })

  try {
    const userStore = useUserStore()
    console.log('获取用户状态:', userStore)

    const isLoggedIn = userStore.checkLoginStatus()
    console.log('登录状态:', isLoggedIn)

    // 需要认证的路由
    if (to.meta.requiresAuth) {
      if (isLoggedIn) {
        console.log('用户已登录，尝试获取用户信息...')
        // 检查用户信息
        await userStore.fetchUserInfo()
        next()
      } else {
        console.log('用户未登录，重定向到登录页')
        // 未登录，重定向到登录页
        next('/login')
      }
    } 
    // 仅游客可访问的路由（如登录、注册）
    else if (to.meta.requiresGuest) {
      if (!isLoggedIn) {
        console.log('游客页面，允许访问')
        next()
      } else {
        console.log('已登录用户，重定向到首页')
        // 已登录，重定向到首页
        next('/')
      }
    } 
    // 其他路由正常访问
    else {
      console.log('普通路由，直接放行')
      next()
    }
  } catch (error) {
    console.error('路由守卫错误:', error)
    // 发生错误时重定向到首页
    next('/')
  }
})

console.log('路由配置完成')

export default router 