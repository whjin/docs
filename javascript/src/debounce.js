function debounce(fn, wait) {
  let timer = null;
  return function () {
    let ctx = this,
      args = arguments;
    // 当前存在定时器，取消之前的定时器重新计时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 设置定时器，使事件间隔 n 秒后执行
    timer = setTimeout(() => {
      fn.apply(ctx, args);
    }, wait);
  };
}
