#!/usr/bin/env sh

COMMIT_FILE="commit.md"
DEFAULT_MESSAGE="提交更新"
TMP_COMMIT=$(mktemp -t commit.XXXXXX 2>/dev/null || mktemp)

# 1. 检查文件是否存在，不存在则创建
if [ ! -f "$COMMIT_FILE" ]; then
    touch "$COMMIT_FILE"
fi

# 2. 提取最新提交信息（去时间戳）并赋值给 latest_commit 变量
# 过滤空行 → 取第一行 → 剔除开头时间戳 → 去除首尾空白（避免纯空格干扰）
latest_commit=$(sed '/^[[:space:]]*$/d' "$COMMIT_FILE" | head -n 1 | sed -E 's/^[0-9-]+ [0-9:.]+ //i' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')

echo "正在提交代码..."
git pull
git add .

# 3. 判断内容是否为空，若为空则使用默认提交信息
if [ -n "$latest_commit" ]; then 
    git commit -m "$latest_commit"
else  
    git commit -m "$DEFAULT_MESSAGE"
fi

git push 

echo "按任意键关闭"
read -n 1

# 4. 提交成功后删除临时文件
rm -f "$TMP_COMMIT"

exit 0