// 循环遍历 includes
function unique(arr) {
  if (!Array.isArray(arr)) {
    return;
  }
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

// 循环遍历 indexOf
function unique(arr) {
  if (!Array.isArray(arr)) {
    return;
  }
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
}

// Array.isFrom new Set
Array.from(new Set(arr));
[...new Set(arr)]