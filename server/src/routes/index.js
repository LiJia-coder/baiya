const express = require('express')
const router = express.Router()

// 导入路由模块
const authRoutes = require('./auth.routes')
const productRoutes = require('./product.routes')
const categoryRoutes = require('./category.routes')
const orderRoutes = require('./order.routes')
const userRoutes = require('./user.routes')

// 注册路由
router.use('/auth', authRoutes)
router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/orders', orderRoutes)
router.use('/users', userRoutes)

// 健康检查
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      api: 'running',
      database: 'connected'
    }
  })
})

module.exports = router
