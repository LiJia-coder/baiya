<template>
  <div class="user-page">
    <div class="container">
      <div class="section">
        <el-row :gutter="20">
          <!-- 左侧导航 -->
          <el-col :span="6">
            <div class="user-menu">
              <div class="user-info">
                <el-avatar :size="64" :src="userInfo.avatar"></el-avatar>
                <h3>{{ userInfo.username }}</h3>
              </div>
              <el-menu
                :default-active="activeMenu"
                class="menu-list"
                @select="handleSelect"
              >
                <el-menu-item index="profile">
                  <el-icon><User /></el-icon>
                  <span>个人资料</span>
                </el-menu-item>
                <el-menu-item index="orders">
                  <el-icon><List /></el-icon>
                  <span>我的订单</span>
                </el-menu-item>
                <el-menu-item index="security">
                  <el-icon><Lock /></el-icon>
                  <span>账号安全</span>
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
          
          <!-- 右侧内容 -->
          <el-col :span="18">
            <!-- 个人资料 -->
            <div v-if="activeMenu === 'profile'" class="content-section">
              <h2>个人资料</h2>
              <el-form
                :model="profileForm"
                label-width="100px"
                class="profile-form"
              >
                <el-form-item label="用户名">
                  <el-input v-model="profileForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                  <el-input v-model="profileForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="profileForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="profileForm.email"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateProfile">保存修改</el-button>
                </el-form-item>
              </el-form>
            </div>

            <!-- 账号安全 -->
            <div v-if="activeMenu === 'security'" class="content-section">
              <h2>账号安全</h2>
              <el-form
                :model="passwordForm"
                label-width="100px"
                class="security-form"
              >
                <el-form-item label="原密码">
                  <el-input v-model="passwordForm.oldPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                  <el-input v-model="passwordForm.newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                  <el-input v-model="passwordForm.confirmPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updatePassword">修改密码</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, List, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const activeMenu = ref('profile')

// 模拟用户数据
const userInfo = ref({
  username: 'user123',
  avatar: 'https://example.com/avatar.jpg'
})

const profileForm = ref({
  username: 'user123',
  nickname: '滑雪爱好者',
  phone: '13800138000',
  email: 'user@example.com'
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const handleSelect = (key) => {
  activeMenu.value = key
}

const updateProfile = () => {
  ElMessage.success('个人资料更新成功')
}

const updatePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  ElMessage.success('密码修改成功')
}
</script>

<style lang="scss" scoped>
.user-page {
  padding: 20px 0;
}

.user-menu {
  background: #fff;
  border-radius: 8px;
  padding: 20px 0;
  
  .user-info {
    text-align: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
    
    h3 {
      margin: 10px 0;
    }
  }
  
  .menu-list {
    border-right: none;
  }
}

.content-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  
  h2 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
}

.profile-form,
.security-form {
  max-width: 500px;
  margin-top: 20px;
}
</style>
