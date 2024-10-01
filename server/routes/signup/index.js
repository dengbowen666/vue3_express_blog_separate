const User = require("../../db_models/user/index");
const bcrypt = require("bcrypt");
const passwordHash = bcrypt.hashSync("liyang512", 10);
//  事实证明把这一行放在函数外面，只暴露函数都可以
const createUser = async () => {
  // 创建用户
  await User.create({
    username: "liyang",
    passwordHash: passwordHash,
  });
};
module.exports = createUser;
