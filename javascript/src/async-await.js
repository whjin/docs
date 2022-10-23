function asyncToGenerator(generatorFn) {
  return function () {
    const gen = generatorFn.apply(this, arguments);

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;

        try {
          generatorResult = gen[key](arg);
        } catch (err) {
          return reject(err);
        }

        const { value, done } = generatorResult;

        if (done) {
          // { value: "success", done: true }
          resolve(value);
        } else {
          // { value: Promise, done: false }
          // Promise.resolve可以接受一个promise为参数
          return Promise.resolve(value).then(
            // value这个promise被resolve时，就会执行next，
            // 并且只用done不为true，就会递归地往下解开promise
            // gen.next().value.then((value) => {
            //   gen.next(value).value.then((value2) => {
            //     gen.next();
            //   });
            // })
            function onResolve(val) {
              step("next", val);
            },
            function onReject(err) {
              step("throw", err);
            }
          );
        }
      }

      step("next");
    });
  };
}
