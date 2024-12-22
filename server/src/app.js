const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

// 中间件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 路由
app.use('/api', routes)

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something broke!' })
})

// 连接数据库
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ski-rental'
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB at', MONGODB_URI))
.catch(err => console.error('Could not connect to MongoDB:', err))

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
})

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed')
      process.exit(0)
    })
  })
})

module.exports = app
