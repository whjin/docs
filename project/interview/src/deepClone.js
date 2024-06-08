function deepClone(obj) {
  let copyObj = null;
  if (obj !== null && typeof obj === "object") {
    copyObj = Array.isArray(obj) ? [] : {};
    for (let i in obj) {
      copyObj[i] = deepClone(obj[i]);
    }
  } else {
    copyObj = obj;
  }
  return copyObj;
}
