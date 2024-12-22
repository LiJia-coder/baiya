# 白鸦滑雪装备租赁系统

一个现代化的滑雪装备租赁平台，提供便捷的在线预订和管理功能。

## 技术栈

### 前端
- Vue 3
- Vue Router
- Pinia
- Element Plus
- Vite

### 后端
- Node.js
- Express
- MongoDB
- JWT Authentication

## 功能特点

- 用户认证和授权
- 产品浏览和搜索
- 购物车管理
- 订单处理
- 在线支付集成
- 后台管理系统

## 开发环境设置

1. 克隆仓库：
```bash
git clone https://github.com/LiJia-coder/baiya.git
cd baiya
```

2. 安装依赖：
```bash
# 安装根目录依赖
npm install

# 安装客户端依赖
cd client
npm install

# 安装服务器依赖
cd ../server
npm install
```

3. 环境变量配置：
```bash
# 在 server 目录下创建 .env 文件
cp .env.example .env
# 编辑 .env 文件设置必要的环境变量
```

4. 启动开发服务器：
```bash
# 启动前端开发服务器
cd client
npm run dev

# 启动后端服务器
cd ../server
npm run dev
```

## 使用 Docker 开发

使用 Docker Compose 启动所有服务：
```bash
docker-compose up -d
```

## 目录结构

```
ski-rental/
├── client/             # 前端 Vue 应用
├── server/             # 后端 Express 服务
├── admin/              # 管理后台
├── .devcontainer/      # Codespace 配置
├── docker-compose.yml  # Docker 配置
└── README.md
```

## API 文档

API 文档使用 Swagger 生成，可在开发环境中访问：
```
http://localhost:3000/api-docs
```

## 部署

1. 构建前端：
```bash
cd client
npm run build
```

2. 启动生产服务器：
```bash
cd ../server
npm start
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情
