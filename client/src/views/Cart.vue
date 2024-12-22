<template>
  <div class="cart-page">
    <div class="container">
      <div class="section">
        <h2>购物车</h2>
        
        <div v-if="cartItems.length > 0">
          <el-table :data="cartItems" style="width: 100%">
            <el-table-column prop="product.name" label="商品名称">
              <template #default="{ row }">
                <div class="product-info">
                  <img :src="row.product.images[0]" :alt="row.product.name" class="product-image">
                  <span>{{ row.product.name }}</span>
                </div>
              </template>
            </el-table-column>
            
            <el-table-column prop="product.price" label="单价" width="120">
              <template #default="{ row }">
                ¥{{ row.product.price }}/天
              </template>
            </el-table-column>
            
            <el-table-column label="租赁时间" width="280">
              <template #default="{ row }">
                <el-date-picker
                  v-model="row.dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled-date="disabledDate"
                  @change="(val) => handleDateChange(row, val)"
                />
              </template>
            </el-table-column>
            
            <el-table-column prop="days" label="天数" width="100">
              <template #default="{ row }">
                {{ row.days }} 天
              </template>
            </el-table-column>
            
            <el-table-column prop="totalPrice" label="小计" width="120">
              <template #default="{ row }">
                ¥{{ row.totalPrice }}
              </template>
            </el-table-column>
            
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button type="danger" size="small" @click="removeItem(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <div class="cart-footer">
            <div class="total-info">
              <span>总计：</span>
              <span class="total-price">¥{{ totalPrice }}</span>
            </div>
            <el-button type="primary" size="large" @click="checkout">结算</el-button>
          </div>
        </div>
        
        <div v-else class="empty-cart">
          <el-empty description="购物车是空的">
            <el-button type="primary" @click="$router.push('/')">去选购</el-button>
          </el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 模拟购物车数据
const cartItems = ref([
  {
    product: {
      id: 1,
      name: '滑雪板套装',
      price: 100,
      images: ['https://example.com/image.jpg']
    },
    dateRange: [],
    days: 0,
    totalPrice: 0
  }
])

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.totalPrice, 0)
})

const disabledDate = (date) => {
  return date < new Date()
}

const handleDateChange = (item, dateRange) => {
  if (dateRange && dateRange[0] && dateRange[1]) {
    const days = Math.ceil((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24))
    item.days = days
    item.totalPrice = days * item.product.price
  } else {
    item.days = 0
    item.totalPrice = 0
  }
}

const removeItem = (item) => {
  const index = cartItems.value.indexOf(item)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const checkout = () => {
  if (cartItems.value.some(item => !item.dateRange || !item.dateRange[0] || !item.dateRange[1])) {
    ElMessage.warning('请选择所有商品的租赁时间')
    return
  }
  
  router.push('/order')
}
</script>

<style lang="scss" scoped>
.cart-page {
  padding: 20px 0;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 10px;
  
  .product-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
}

.cart-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  
  .total-info {
    font-size: 16px;
    
    .total-price {
      color: var(--el-color-danger);
      font-size: 24px;
      font-weight: bold;
    }
  }
}

.empty-cart {
  padding: 40px 0;
}
</style>
