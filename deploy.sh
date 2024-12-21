#!/bin/bash

# 拉取最新代码
git pull origin main

# 安装依赖
echo "Installing dependencies..."
cd client && npm install
cd ../server && npm install
cd ../admin && npm install

# 构建前端
echo "Building client..."
cd ../client && npm run build

echo "Building admin..."
cd ../admin && npm run build

# 重启服务
echo "Restarting server..."
pm2 restart server

echo "Deployment completed!"
