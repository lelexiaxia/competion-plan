<template>
  <div class="register-container">
    <div class="register-wrapper">
      <div class="register-header">
        <h2>赛事预约系统</h2>
        <p>创建新账号</p>
      </div>
      
      <el-form 
        ref="registerFormRef" 
        :model="registerForm" 
        :rules="registerRules" 
        class="register-form"
        @submit.prevent="handleRegister"
      >
        <el-form-item prop="username">
          <el-input 
            v-model="registerForm.username" 
            placeholder="用户名" 
            prefix-icon="User"
            clearable
          />
        </el-form-item>
        
        <el-form-item prop="email">
          <el-input 
            v-model="registerForm.email" 
            placeholder="电子邮箱" 
            prefix-icon="Message"
            clearable
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="registerForm.password" 
            type="password" 
            placeholder="密码" 
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input 
            v-model="registerForm.confirmPassword" 
            type="password" 
            placeholder="确认密码" 
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-checkbox v-model="agreedToTerms">
            我已阅读并同意 
            <el-link type="primary">《用户服务协议》</el-link>
          </el-checkbox>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            native-type="submit" 
            class="register-button" 
            :loading="loading"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form-item>
        
        <div class="login-link">
          <span>已有账号？</span>
          <el-link type="primary" @click="goToLogin">立即登录</el-link>
        </div>
      </el-form>
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
const registerFormRef = ref<FormInstance>()

// 注册表单数据
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 加载状态
const loading = ref(false)
// 是否同意服务协议
const agreedToTerms = ref(false)

// 注册表单验证规则
const registerRules: FormRules = {
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
  email: [
    { 
      required: true, 
      message: '请输入电子邮箱', 
      trigger: 'blur' 
    },
    { 
      type: 'email', 
      message: '请输入正确的电子邮箱地址', 
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
  ],
  confirmPassword: [
    { 
      required: true, 
      message: '请确认密码', 
      trigger: 'blur' 
    },
    { 
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ]
}

// 注册处理
const handleRegister = () => {
  registerFormRef.value?.validate(async (valid) => {
    if (valid) {
      // 检查是否同意服务协议
      if (!agreedToTerms.value) {
        ElMessage.warning('请先同意用户服务协议')
        return
      }
      
      loading.value = true
      try {
        const success = await userStore.register({
          username: registerForm.username,
          password: registerForm.password,
          email: registerForm.email
        })
        
        if (success) {
          ElMessage.success('注册成功')
          // 自动登录
          await userStore.login(registerForm.username, registerForm.password)
          // 跳转到首页
          router.push('/')
        } else {
          ElMessage.error('注册失败，请稍后重试')
        }
      } catch (error) {
        ElMessage.error('注册失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
  })
}

// 跳转登录
const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped lang="scss">
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.register-wrapper {
  background: white;
  border-radius: 10px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.1);
  padding: 40px;
  width: 400px;
}

.register-header {
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

.register-form {
  .register-button {
    width: 100%;
    margin-top: 20px;
  }
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}
</style> 