#!/usr/bin/env sh

COMMIT_FILE="commit.md"
DEFAULT_MESSAGE="提交更新"

# 1. 检查文件是否存在，不存在则创建
if [ ! -f "$COMMIT_FILE" ]; then
    touch "$COMMIT_FILE"
fi

# 2. 读取文件内容并去除首位空白（判断是否为空）
COMMIT_CONTENT=$(cat "$COMMIT_FILE" | sed '/^[[:space:]]*$/d')

echo "正在提交代码..."
git pull
git add .

# 3. 判断内容是否为空，若为空则使用默认提交信息
if [ -n "$COMMIT_CONTENT" ]; then
    git commit -F "$COMMIT_FILE"
else
    git commit -m "$DEFAULT_MESSAGE"
fi

git push 

# 4. 提交成功后清空文件内容
> "$COMMIT_FILE"

echo "按任意键关闭"
read -n 1
exit 0