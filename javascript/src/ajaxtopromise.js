const myAjax = function (url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        const json = JSON.parse(xhr.responseText);
        resolve(json);
      } else if (xhr.status != 200 && xhr.readyState == 4) {
        reject("error");
      }
    };
  });
};
