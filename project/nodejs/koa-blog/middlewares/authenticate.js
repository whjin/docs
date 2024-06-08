module.exports = async function (ctx, next) {
  const logged = ctx.cookies.get("logged", { signed: true });
  ctx.state.logged = !!logged;
  await next();
};
