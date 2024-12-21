<template>
  <div class="app-container">
    <!-- 头部导航 -->
    <header class="header">
      <div class="container header-content">
        <router-link to="/" class="logo">
          <img src="@/assets/logo.png" alt="白鸦滑雪" />
          <span>白鸦滑雪装备租赁</span>
        </router-link>
        
        <nav class="nav-menu">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link to="/cart" class="nav-item">购物车</router-link>
          <router-link to="/order" class="nav-item">我的订单</router-link>
          <router-link to="/user" class="nav-item">个人中心</router-link>
        </nav>

        <div class="user-area">
          <template v-if="userStore.isLoggedIn">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ userStore.userInfo.username }}
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/user')">个人中心</el-dropdown-item>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <el-button type="text" @click="$router.push('/login')">登录</el-button>
            <el-button type="primary" @click="$router.push('/register')">注册</el-button>
          </template>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="main-content">
      <router-view></router-view>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>关于我们</h3>
            <p>白鸦滑雪装备租赁是专业的滑雪装备租赁平台，提供优质的滑雪装备租赁服务。</p>
          </div>
          <div class="footer-section">
            <h3>联系方式</h3>
            <p>电话：XXX-XXXX-XXXX</p>
            <p>邮箱：contact@baiya.online</p>
          </div>
          <div class="footer-section">
            <h3>关注我们</h3>
            <div class="social-links">
              <!-- 社交媒体图标 -->
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 白鸦滑雪装备租赁. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { ArrowDown } from '@element-plus/icons-vue'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;

  .header-content {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--primary-color);
    font-size: 20px;
    font-weight: bold;

    img {
      height: 40px;
      margin-right: 10px;
    }
  }

  .nav-menu {
    display: flex;
    gap: 20px;

    .nav-item {
      text-decoration: none;
      color: var(--text-color);
      padding: 8px 12px;
      border-radius: 4px;
      transition: all 0.3s;

      &:hover, &.router-link-active {
        color: var(--primary-color);
        background: rgba(64,158,255,0.1);
      }
    }
  }

  .user-area {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.main-content {
  flex: 1;
  margin-top: 64px;
  padding: 20px 0;
}

.footer {
  background: #2c3e50;
  color: #fff;
  padding: 40px 0 20px;

  .footer-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-bottom: 40px;
  }

  .footer-section {
    h3 {
      margin-bottom: 20px;
      font-size: 18px;
    }

    p {
      color: #ccc;
      line-height: 1.6;
    }
  }

  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
    
    p {
      color: #ccc;
    }
  }
}
</style>
