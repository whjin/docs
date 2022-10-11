function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let left = [],
    rigth = [],
    index = Math.floor(arr.length / 2),
    middle = arr.splice(index, 1)[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middle) {
      left.push(arr[i]);
    } else {
      rigth.push(arr[i]);
    }
  }
  return quickSort(left).concat([middle], quickSort(rigth));
}
