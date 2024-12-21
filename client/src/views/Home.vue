<template>
  <div class="home">
    <div class="container">
      <!-- 分类导航 -->
      <div class="category-nav section">
        <el-tabs v-model="activeCategory" @tab-click="handleCategoryChange">
          <el-tab-pane label="全部" name="all"></el-tab-pane>
          <el-tab-pane 
            v-for="category in categories" 
            :key="category._id" 
            :label="category.name" 
            :name="category._id">
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 筛选栏 -->
      <div class="filter-bar section">
        <el-form :inline="true" :model="filterForm">
          <el-form-item label="租赁日期">
            <el-date-picker
              v-model="filterForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :disabled-date="disabledDate"
              @change="handleDateChange"
            />
          </el-form-item>
          <el-form-item label="价格区间">
            <el-select v-model="filterForm.priceRange" @change="handleFilterChange">
              <el-option label="全部" value=""></el-option>
              <el-option label="0-100元/天" value="0-100"></el-option>
              <el-option label="100-200元/天" value="100-200"></el-option>
              <el-option label="200-500元/天" value="200-500"></el-option>
              <el-option label="500元以上/天" value="500-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilterChange">筛选</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 产品列表 -->
      <div class="product-list">
        <el-row :gutter="20">
          <el-col :span="6" v-for="product in products" :key="product._id">
            <el-card class="product-card" :body-style="{ padding: '0px' }">
              <div class="product-image">
                <img :src="product.images[0]" :alt="product.name">
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-price">
                  <span class="price">¥{{ product.price }}</span>
                  <span class="unit">/天</span>
                </div>
                <div class="product-actions">
                  <el-button type="primary" @click="viewDetail(product._id)">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// 状态数据
const categories = ref([])
const products = ref([])
const activeCategory = ref('all')
const total = ref(0)
const pageSize = ref(12)
const currentPage = ref(1)

const filterForm = ref({
  dateRange: [],
  priceRange: ''
})

// 获取分类列表
const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/categories')
    categories.value = response.data
  } catch (error) {
    console.error('获取分类失败:', error)
  }
}

// 获取产品列表
const fetchProducts = async () => {
  try {
    const params = {
      category: activeCategory.value !== 'all' ? activeCategory.value : undefined,
      page: currentPage.value,
      pageSize: pageSize.value,
      startDate: filterForm.value.dateRange?.[0],
      endDate: filterForm.value.dateRange?.[1],
      priceRange: filterForm.value.priceRange
    }

    const response = await axios.get('/api/products', { params })
    products.value = response.data.items
    total.value = response.data.total
  } catch (error) {
    console.error('获取产品列表失败:', error)
  }
}

// 事件处理函数
const handleCategoryChange = () => {
  currentPage.value = 1
  fetchProducts()
}

const handleDateChange = () => {
  fetchProducts()
}

const handleFilterChange = () => {
  currentPage.value = 1
  fetchProducts()
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchProducts()
}

const viewDetail = (productId) => {
  router.push(`/product/${productId}`)
}

const disabledDate = (date) => {
  return date < new Date()
}

// 生命周期钩子
onMounted(() => {
  fetchCategories()
  fetchProducts()
})
</script>

<style lang="scss" scoped>
.home {
  .category-nav {
    margin-bottom: 20px;
  }

  .filter-bar {
    margin-bottom: 20px;
  }

  .product-list {
    margin-bottom: 40px;
  }

  .product-card {
    margin-bottom: 20px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    .product-image {
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .product-info {
      padding: 14px;

      .product-name {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .product-description {
        color: var(--text-color-secondary);
        font-size: 14px;
        margin-bottom: 8px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .product-price {
        margin-bottom: 12px;

        .price {
          color: var(--primary-color);
          font-size: 20px;
          font-weight: bold;
        }

        .unit {
          color: var(--text-color-secondary);
          font-size: 14px;
          margin-left: 4px;
        }
      }

      .product-actions {
        text-align: right;
      }
    }
  }

  .pagination-container {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
