const crypto = require("crypto");

function generateRefreshToken() {
  return crypto.randomBytes(40).toString("hex");
}
module.exports = { generateRefreshToken };
