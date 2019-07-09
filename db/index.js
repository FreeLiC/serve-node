const Sequelize = require('sequelize')

const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  define: {
    // create_time && update_time
    timestamps: false
  }
})

// 创建模型
sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}
