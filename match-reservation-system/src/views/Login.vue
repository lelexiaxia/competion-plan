<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-header">
        <h2>赛事预约系统</h2>
        <p>欢迎登录</p>
      </div>
      
      <el-form 
        ref="loginFormRef" 
        :model="loginForm" 
        :rules="loginRules" 
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username">
          <el-input 
            v-model="loginForm.username" 
            placeholder="用户名" 
            prefix-icon="User"
            clearable
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="密码" 
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          <el-link type="primary" class="forget-password">忘记密码？</el-link>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            native-type="submit" 
            class="login-button" 
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
        
        <div class="register-link">
          <span>还没有账号？</span>
          <el-link type="primary" @click="goToRegister">立即注册</el-link>
        </div>
      </el-form>
      
      <div class="login-footer">
        <div class="social-login">
          <p>第三方登录</p>
          <div class="social-icons">
            <el-button 
              type="text" 
              class="wx-login" 
              @click="thirdPartyLogin('wechat')"
            >
              <i class="fab fa-weixin"></i>
            </el-button>
            <el-button 
              type="text" 
              class="qq-login" 
              @click="thirdPartyLogin('qq')"
            >
              <i class="fab fa-qq"></i>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { 
  ElMessage, 
  ElForm, 
  ElFormItem, 
  ElInput, 
  ElButton,
  ElLink,
  ElCheckbox,
  FormRules,
  FormInstance 
} from 'element-plus'

// 路由实例
const router = useRouter()
// 用户状态管理
const userStore = useUserStore()

// 表单引用
const loginFormRef = ref<FormInstance>()

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 记住密码
const rememberMe = ref(false)
// 登录加载状态
const loading = ref(false)

// 登录表单验证规则
const loginRules: FormRules = {
  username: [
    { 
      required: true, 
      message: '请输入用户名', 
      trigger: 'blur' 
    },
    { 
      min: 3, 
      max: 20, 
      message: '用户名长度应在3-20个字符之间', 
      trigger: 'blur' 
    }
  ],
  password: [
    { 
      required: true, 
      message: '请输入密码', 
      trigger: 'blur' 
    },
    { 
      min: 6, 
      message: '密码至少6个字符', 
      trigger: 'blur' 
    }
  ]
}

// 登录处理
const handleLogin = () => {
  loginFormRef.value?.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 模拟登录
        const success = await userStore.login(loginForm.username, loginForm.password)
        
        if (success) {
          ElMessage.success('登录成功')
          // 记住密码逻辑
          if (rememberMe.value) {
            localStorage.setItem('username', loginForm.username)
          }
          
          // 跳转到首页
          router.push('/')
        } else {
          ElMessage.error('用户名或密码错误')
        }
      } catch (error) {
        ElMessage.error('登录失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
  })
}

// 第三方登录
const thirdPartyLogin = (platform: string) => {
  ElMessage.info(`正在使用${platform === 'wechat' ? '微信' : 'QQ'}登录`)
}

// 跳转注册
const goToRegister = () => {
  router.push('/register')
}

// 检查是否有记住的用户名
const checkRememberedUser = () => {
  const rememberedUsername = localStorage.getItem('username')
  if (rememberedUsername) {
    loginForm.username = rememberedUsername
    rememberMe.value = true
  }
}

// 组件挂载时检查记住的用户名
checkRememberedUser()
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-wrapper {
  background: white;
  border-radius: 10px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.1);
  padding: 40px;
  width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
  
  h2 {
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
  }
}

.login-form {
  .forget-password {
    float: right;
    margin-top: 10px;
  }
  
  .login-button {
    width: 100%;
    margin-top: 20px;
  }
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.social-login {
  text-align: center;
  margin-top: 30px;
  
  .social-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    
    .wx-login {
      color: #07c160;
      font-size: 24px;
    }
    
    .qq-login {
      color: #1296db;
      font-size: 24px;
    }
  }
}
</style> 