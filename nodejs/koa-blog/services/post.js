const fs = require("fs");
const bluebird = require("bluebird");
bluebird.promisifyAll(fs);

const posts = [];
let postId = 1;

// 发表文章
exports.publish = (title, content) => {
  const item = {
    id: postId++,
    title,
    content,
    time: new Date().toLocaleString(),
  };
  posts.push(item);
  return item;
};

// 查看文章
exports.show = (id) => {
  id = Number(id);
  for (const post of posts) {
    if (post.id === id) {
      return post;
    }
  }
  return null;
};

// 编辑文章
exports.update = (id, title, content) => {
  id = Number(id);
  posts.forEach((post) => {
    if (post.id === id) {
      post.title = title;
      post.content = content;
    }
  });
};

// 删除文章
exports.delete = (id) => {
  id = Number(id);
  if (posts.length) {
    posts.forEach((post, index) => {
      if (post.id === id) {
        posts.splice(index, 1);
      }
    });
  }
};

// 文章列表
exports.list = () => {
  return posts.map((item) => item);
};
