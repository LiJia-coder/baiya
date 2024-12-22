const express = require('express')
const router = express.Router()

// 临时路由响应
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint' })
})

router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint' })
})

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout endpoint' })
})

module.exports = router
