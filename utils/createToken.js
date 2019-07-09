const jwt = require('jsonwebtoken') // jsonwebtoken

// 获取秘钥
const { jwtSecret,expiresIn } = require('./../config')

function createToken (userToken) {
  return jwt.sign(userToken, jwtSecret, {expiresIn: expiresIn})
}

module.exports = createToken
