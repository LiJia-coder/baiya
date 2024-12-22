const Product = require('../models/product.model')

// 获取产品列表
exports.getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, page = 1, limit = 10 } = req.query
    
    // 构建查询条件
    const query = {}
    if (category) query.category = category
    if (search) query.name = { $regex: search, $options: 'i' }
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    // 计算分页
    const skip = (page - 1) * limit

    // 执行查询
    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit))
      .populate('category', 'name')

    // 获取总数
    const total = await Product.countDocuments(query)

    res.json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// 获取单个产品
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
    
    if (!product) {
      return res.status(404).json({ message: '产品不存在' })
    }
    
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// 创建产品
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// 更新产品
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!product) {
      return res.status(404).json({ message: '产品不存在' })
    }
    
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// 删除产品
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    
    if (!product) {
      return res.status(404).json({ message: '产品不存在' })
    }
    
    res.json({ message: '产品已删除' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
