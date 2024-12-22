const express = require('express')
const router = express.Router()

// 临时路由响应
router.get('/profile', (req, res) => {
  res.json({ message: 'Get user profile' })
})

router.put('/profile', (req, res) => {
  res.json({ message: 'Update user profile' })
})

router.get('/orders', (req, res) => {
  res.json({ message: 'Get user orders' })
})

module.exports = router
