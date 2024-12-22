#!/bin/bash

# 启动 nginx
nginx

# 启动后端服务
cd /app/server
node app.js
