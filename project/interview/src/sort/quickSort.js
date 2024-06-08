function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let left = [],
    rigth = [],
    middle = arr.splice(Math.floor(arr.length / 2), 1);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middle) {
      left.push(arr[i]);
    } else {
      rigth.push(arr[i]);
    }
  }
  return quickSort(left).concat(middle, quickSort(rigth));
}