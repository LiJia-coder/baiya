const express = require('express')
const router = express.Router()

// 临时路由响应
router.get('/', (req, res) => {
  res.json({ message: 'Get all categories' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `Get category ${req.params.id}` })
})

router.post('/', (req, res) => {
  res.json({ message: 'Create category' })
})

router.put('/:id', (req, res) => {
  res.json({ message: `Update category ${req.params.id}` })
})

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete category ${req.params.id}` })
})

module.exports = router
