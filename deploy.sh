#!/usr/bin/env sh

# 拉取合并
git pull origin main
git add .
git commit -m "更新文档"
git push origin main

echo "按任意键关闭"
read -n 1

exit 0
