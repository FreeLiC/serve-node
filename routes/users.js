const router = require('koa-router')()
const userController = require('./../controllers/user')

router.prefix('/api')

// 注册
router.post('/register',userController.register)
// 登录
router.post('/login',userController.login)
// 获取用户信息
router.post('/getUserInfo',userController.getUserInfo)
// 删除用户
router.post('/deleteUser',userController.deleteUser)
// 更新用户
router.post('/updateUser',userController.updateUser)

module.exports = router
