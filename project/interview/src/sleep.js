// promise
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    console.log("1");
    setTimeout(resolve, ms);
  });
}
sleep(500).then(function () {
  console.log("2");
});

// async/await
function sleep(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function asyncSleep(ms) {
  console.log("1");
  return await sleep(ms);
}

// generator
function* sleep(ms) {
  yield new Promise(function (resolve, reject) {
    console.log("1");
    setTimeout(resolve, ms);
  });
}
sleep(500)
  .next()
  .value.then(function () {
    console.log("2");
  });
