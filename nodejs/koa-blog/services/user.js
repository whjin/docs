const user = {
  admin: "admin",
};

// 登录
exports.login = (username, password) => {
  if (user[username] === undefined) {
    return false;
  }
  return user[username] === password;
};
