const Router = require("koa-router");
const postService = require("../services/post");
const router = new Router();

// 首页
router.get("/", async (ctx) => {
  const list = postService.list();
  await ctx.render("index", { list });
});

module.exports = router;
