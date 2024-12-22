const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '产品名称是必需的'],
    trim: true
  },
  description: {
    type: String,
    required: [true, '产品描述是必需的']
  },
  price: {
    type: Number,
    required: [true, '价格是必需的'],
    min: [0, '价格不能为负数']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, '类别是必需的']
  },
  images: [{
    type: String,
    required: [true, '至少需要一张图片']
  }],
  stock: {
    type: Number,
    required: [true, '库存是必需的'],
    min: [0, '库存不能为负数']
  },
  specifications: {
    size: String,
    color: String,
    brand: String,
    material: String
  },
  status: {
    type: String,
    enum: ['available', 'unavailable', 'maintenance'],
    default: 'available'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// 虚拟字段：是否可用
productSchema.virtual('isAvailable').get(function() {
  return this.status === 'available' && this.stock > 0
})

// 索引
productSchema.index({ name: 'text', description: 'text' })
productSchema.index({ category: 1, status: 1 })
productSchema.index({ price: 1 })

module.exports = mongoose.model('Product', productSchema)
