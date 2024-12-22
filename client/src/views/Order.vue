<template>
  <div class="order-page">
    <div class="container">
      <div class="section">
        <h2>我的订单</h2>
        
        <el-tabs v-model="activeTab">
          <el-tab-pane label="全部订单" name="all"></el-tab-pane>
          <el-tab-pane label="待付款" name="pending"></el-tab-pane>
          <el-tab-pane label="使用中" name="using"></el-tab-pane>
          <el-tab-pane label="已完成" name="completed"></el-tab-pane>
          <el-tab-pane label="已取消" name="cancelled"></el-tab-pane>
        </el-tabs>
        
        <div class="order-list">
          <div v-for="order in filteredOrders" :key="order.id" class="order-item">
            <div class="order-header">
              <span class="order-no">订单号：{{ order.orderNo }}</span>
              <span class="order-status">{{ getStatusText(order.status) }}</span>
            </div>
            
            <div class="order-content">
              <div v-for="item in order.items" :key="item.id" class="order-product">
                <img :src="item.product.images[0]" :alt="item.product.name" class="product-image">
                <div class="product-info">
                  <h4>{{ item.product.name }}</h4>
                  <p class="rental-time">
                    租赁时间：{{ formatDate(order.startDate) }} 至 {{ formatDate(order.endDate) }}
                  </p>
                  <p class="price">¥{{ item.price }}/天</p>
                </div>
              </div>
            </div>
            
            <div class="order-footer">
              <div class="price-info">
                <span>总计：</span>
                <span class="total-price">¥{{ order.totalPrice }}</span>
              </div>
              
              <div class="actions">
                <template v-if="order.status === 'pending'">
                  <el-button type="primary" @click="payOrder(order)">立即支付</el-button>
                  <el-button @click="cancelOrder(order)">取消订单</el-button>
                </template>
                <template v-else-if="order.status === 'using'">
                  <el-button type="success" @click="returnEquipment(order)">归还装备</el-button>
                </template>
                <template v-else-if="order.status === 'completed'">
                  <el-button type="primary" @click="reOrder(order)">再次租赁</el-button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('all')

// 模拟订单数据
const orders = ref([
  {
    id: 1,
    orderNo: 'ORDER2023122101',
    status: 'pending',
    startDate: new Date('2023-12-25'),
    endDate: new Date('2023-12-27'),
    totalPrice: 300,
    items: [
      {
        id: 1,
        product: {
          name: '滑雪板套装',
          images: ['https://example.com/image.jpg'],
          price: 100
        },
        price: 100
      }
    ]
  }
])

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value
  return orders.value.filter(order => order.status === activeTab.value)
})

const getStatusText = (status) => {
  const statusMap = {
    pending: '待付款',
    paid: '待使用',
    using: '使用中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || status
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const payOrder = (order) => {
  ElMessage.success('支付成功')
  order.status = 'paid'
}

const cancelOrder = (order) => {
  ElMessage.success('订单已取消')
  order.status = 'cancelled'
}

const returnEquipment = (order) => {
  ElMessage.success('归还成功')
  order.status = 'completed'
}

const reOrder = (order) => {
  // 跳转到相关产品页面
}
</script>

<style lang="scss" scoped>
.order-page {
  padding: 20px 0;
}

.order-item {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  
  .order-header {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .order-status {
      color: var(--el-color-primary);
    }
  }
  
  .order-content {
    padding: 20px;
    
    .order-product {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
      
      .product-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 4px;
      }
      
      .product-info {
        flex: 1;
        
        h4 {
          margin: 0 0 10px;
        }
        
        .rental-time {
          color: #666;
          margin: 5px 0;
        }
        
        .price {
          color: var(--el-color-danger);
        }
      }
    }
  }
  
  .order-footer {
    padding: 15px 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .price-info {
      .total-price {
        color: var(--el-color-danger);
        font-size: 20px;
        font-weight: bold;
      }
    }
    
    .actions {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
