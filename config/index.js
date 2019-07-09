// 配置信息
module.exports = {
  jwtSecret: 'serveNode',
  expiresIn: '24h',
  database: {
    dbName: 'serveNode',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456'
  }
}
