function deepClone(obj) {
  if (obj !== null && typeof obj === "object") {
    let copyObj = Array.isArray(obj) ? [] : {};
    for (let i in obj) {
      copyObj[i] = deepClone(obj[i]);
    }
  } else {
    copyObj = obj;
  }
  return copyObj;
}
