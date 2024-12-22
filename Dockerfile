# 使用多阶段构建
# 构建前端
FROM node:16 AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

# 构建后端
FROM node:16 AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server .

# 最终镜像
FROM node:16-slim
WORKDIR /app

# 安装 nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# 复制前端构建文件
COPY --from=client-builder /app/client/dist /app/client/dist

# 复制后端文件
COPY --from=server-builder /app/server /app/server

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80 3000

# 启动脚本
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
