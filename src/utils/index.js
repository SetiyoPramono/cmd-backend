const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { APP_SECRET } = require("../config");

// utilty function
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.DecodeSignature = async (signature) => {
  try {
    const payload = await jwt.decode(signature);
    return payload;
  } catch (error) {
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.headers.authorization;
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not Found!");
  }
};
