const Koa = require("koa");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");
const authenticate = require("./middlewares/authenticate");

const siteRoute = require("./routes/site");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

const app = new Koa();

app.keys = ["rrbTj3bknXECZi9m"];

app.use(bodyParser());
app.use(authenticate);

render(app, {
  root: "./templates",
  layout: "main",
  viewExt: "ejs",
});

app.use(siteRoute.routes()).use(siteRoute.allowedMethods());
app.use(userRoute.routes()).use(userRoute.allowedMethods());
app.use(postRoute.routes()).use(postRoute.allowedMethods());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
