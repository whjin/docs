function throttle(fn, wait) {
  let timer = null;
  return function () {
    let ctx = this,
      args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(ctx, args);
        timer = null;
      }, wait);
    }
  };
}
