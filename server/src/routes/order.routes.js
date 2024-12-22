const express = require('express')
const router = express.Router()

// 临时路由响应
router.get('/', (req, res) => {
  res.json({ message: 'Get all orders' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `Get order ${req.params.id}` })
})

router.post('/', (req, res) => {
  res.json({ message: 'Create order' })
})

router.put('/:id', (req, res) => {
  res.json({ message: `Update order ${req.params.id}` })
})

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete order ${req.params.id}` })
})

module.exports = router
