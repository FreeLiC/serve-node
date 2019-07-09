const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// 支持content-type：form-data
const koaBody = require('koa-body')
const logger = require('koa-logger')
//  解决跨域问题
const cors = require('koa2-cors')
// 后端验证token
const jwtKoa = require('koa-jwt')
// jwt密钥
const { jwtSecret } = require('./config')
// token有效性检验方法
const checkToken = require('./middleware/checkToken')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(koaBody({
  multipart: true
}))
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// 静态资源处理
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 解决跨域问题
app.use(cors())

// 检查token是否有效
app.use(checkToken)

/* 路由权限控制 */
app.use(jwtKoa({ secret: jwtSecret }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
    /^\/api\/login/,
    /^\/api\/register/,
    ///^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
