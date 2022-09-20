const Router = require("koa-router");
const router = new Router();
const postService = require("../services/post");

// 发布表单页
router.get("/publish", async (ctx) => {
  await ctx.render("publish");
});

// 发布处理
router.post("/publish", async (ctx) => {
  const data = ctx.request.body;
  if (!data.title || !data.content) {
    ctx.throw(400, "请求有误！");
  }
  const item = postService.publish(data.title, data.content);
  ctx.redirect(`/post/${item.id}`);
});

// 详情页
router.get("/post/:postId", async (ctx) => {
  const post = postService.show(ctx.params.postId);
  if (!post) {
    ctx.throw(404, "文章不存在");
  }
  await ctx.render("post", { post });
});

// 编辑表单页
router.get("/update/:postId", async (ctx) => {
  const post = postService.show(ctx.params.postId);
  if (!post) {
    ctx.throw(404, "文章不存在");
  }
  await ctx.render("update", { post });
});

// 编辑处理
router.post("/update/:postId", async (ctx) => {
  const data = ctx.request.body;
  if (!data.title || !data.content) {
    ctx.throw(400, "请求有误！");
  }
  const postId = ctx.params.postId;
  postService.update(postId, data.title, data.content);
  ctx.redirect(`/post/${postId}`);
});

// 删除
router.get("/delete/:postId", async (ctx) => {
  postService.delete(ctx.params.postId);
  ctx.redirect("/");
});

module.exports = router;
