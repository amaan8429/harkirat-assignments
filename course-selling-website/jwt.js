const jwt = require("jsonwebtoken");

// data = "hello";
const admin_secret = "AdminSecretKey";

function CreateAdminToken(t) {
  const token = jwt.sign(t, admin_secret);
  return token;
}

function VerifyAdminToken(t) {
  const encoded_token = jwt.verify(t, admin_secret);
  return encoded_token;
}

module.exports = {
  CreateAdminToken,
  VerifyAdminToken,
};
