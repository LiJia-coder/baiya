<template>
  <div class="product-detail">
    <div class="container">
      <div class="section">
        <el-row :gutter="40">
          <!-- 左侧图片展示 -->
          <el-col :span="12">
            <div class="product-gallery">
              <el-carousel :interval="4000" type="card" height="400px">
                <el-carousel-item v-for="image in product.images" :key="image">
                  <img :src="image" :alt="product.name" class="gallery-image">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          
          <!-- 右侧信息 -->
          <el-col :span="12">
            <div class="product-info">
              <h1 class="product-name">{{ product.name }}</h1>
              <div class="product-meta">
                <span class="category">类别：{{ product.category }}</span>
                <span class="stock">库存：{{ product.stock }}件</span>
              </div>
              
              <div class="price-section">
                <span class="price">¥{{ product.price }}</span>
                <span class="unit">/天</span>
              </div>
              
              <div class="date-section">
                <h3>选择租赁日期</h3>
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled-date="disabledDate"
                  @change="handleDateChange"
                />
              </div>
              
              <div v-if="totalDays > 0" class="total-section">
                <div class="rental-days">
                  租赁天数：{{ totalDays }}天
                </div>
                <div class="total-price">
                  总价：¥{{ totalPrice }}
                </div>
              </div>
              
              <div class="action-section">
                <el-button 
                  type="primary" 
                  size="large" 
                  :disabled="!canRent"
                  @click="addToCart"
                >
                  加入购物车
                </el-button>
                <el-button 
                  type="success" 
                  size="large" 
                  :disabled="!canRent"
                  @click="rentNow"
                >
                  立即租赁
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        
        <!-- 产品详情 -->
        <div class="product-detail-info">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="商品详情" name="detail">
              <div class="detail-content" v-html="product.description"></div>
            </el-tab-pane>
            <el-tab-pane label="租赁须知" name="notice">
              <div class="notice-content">
                <h3>租赁规则</h3>
                <ul>
                  <li>需要押金，归还后退还</li>
                  <li>租赁时间按天计算，超时将额外收费</li>
                  <li>请爱护租赁装备，如有损坏需照价赔偿</li>
                  <li>请在约定时间内归还装备</li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

// 模拟产品数据
const product = ref({
  id: 1,
  name: '专业滑雪板套装',
  category: '滑雪板',
  price: 100,
  stock: 5,
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ],
  description: `
    <h3>产品介绍</h3>
    <p>专业级滑雪板套装，适合初学者到高级玩家使用。</p>
    <h3>产品参数</h3>
    <ul>
      <li>长度：160cm</li>
      <li>材质：优质木芯 + 碳纤维</li>
      <li>适用人群：成人</li>
    </ul>
  `
})

const activeTab = ref('detail')
const dateRange = ref([])
const totalDays = ref(0)

const totalPrice = computed(() => {
  return totalDays.value * product.value.price
})

const canRent = computed(() => {
  return totalDays.value > 0 && product.value.stock > 0
})

const disabledDate = (date) => {
  return date < new Date()
}

const handleDateChange = (val) => {
  if (val && val[0] && val[1]) {
    totalDays.value = Math.ceil((val[1] - val[0]) / (1000 * 60 * 60 * 24))
  } else {
    totalDays.value = 0
  }
}

const addToCart = () => {
  if (!dateRange.value || !dateRange.value[0] || !dateRange.value[1]) {
    ElMessage.warning('请选择租赁日期')
    return
  }
  
  // 添加到购物车逻辑
  ElMessage.success('已添加到购物车')
}

const rentNow = () => {
  if (!dateRange.value || !dateRange.value[0] || !dateRange.value[1]) {
    ElMessage.warning('请选择租赁日期')
    return
  }
  
  // 直接跳转到订单页
  router.push('/order')
}
</script>

<style lang="scss" scoped>
.product-detail {
  padding: 20px 0;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  .product-name {
    font-size: 24px;
    margin: 0 0 20px;
  }
  
  .product-meta {
    margin-bottom: 20px;
    color: #666;
    
    span {
      margin-right: 20px;
    }
  }
  
  .price-section {
    margin: 20px 0;
    
    .price {
      font-size: 28px;
      color: var(--el-color-danger);
      font-weight: bold;
    }
    
    .unit {
      font-size: 14px;
      color: #666;
      margin-left: 4px;
    }
  }
  
  .date-section {
    margin: 20px 0;
    
    h3 {
      margin-bottom: 10px;
    }
  }
  
  .total-section {
    margin: 20px 0;
    padding: 15px;
    background: #f5f7fa;
    border-radius: 4px;
    
    .total-price {
      color: var(--el-color-danger);
      font-size: 20px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
  
  .action-section {
    margin-top: 30px;
    display: flex;
    gap: 20px;
  }
}

.product-detail-info {
  margin-top: 40px;
  
  .detail-content,
  .notice-content {
    padding: 20px;
    
    h3 {
      margin: 20px 0 10px;
    }
    
    ul {
      padding-left: 20px;
      
      li {
        margin: 10px 0;
      }
    }
  }
}
</style>
