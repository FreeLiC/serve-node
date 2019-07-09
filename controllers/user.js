// 密码加密
const sha1 = require('sha1')
// 用户模型
const userModel = require('../models/user')
// 签发token
const createToken = require('./../utils/createToken')

class UserController{
  /**
   * 注册
   * @param ctx
   * @returns {Promise<void>}
   */
  async register(ctx){
    try {
      const user = ctx.request.body
      if(user.name&&user.password){
        const existUser = await userModel.findUserByName(user.name)
        if (existUser) {
          ctx.status = 400;
          ctx.body = {
            success: false,
            message: '用户名已被占用,请更换用户名'
          }
        }else{
          user.password = sha1(user.password)
          await userModel.createUser(user)
          ctx.status = 200;
          ctx.body = {
            success: true,
            message: '操作成功'
          }
        }
      }else{
        ctx.status = 400;
        ctx.body = {
          success: false,
          message: '请输入用户名和密码'
        }
      }
    }catch (e) {
      ctx.status = 400
      ctx.body = {
        success: false,
        message: e
      }
    }
  }

  /**
   * 登录
   * @param ctx
   * @returns {Promise<void>}
   */
  async login(ctx){
    try {
      const user = ctx.request.body
      if(user.name&&user.password){
        const getUserPassword = await userModel.findUserByName(user.name)
        const setPassword = sha1(user.password)
        if(!getUserPassword||getUserPassword.password !== setPassword){
          ctx.status = 400;
          ctx.body = {
            success: false,
            message: '用户名或密码错误'
          }
        }else{
          const userToken = {
            userName: user.username
          }
          const token = createToken(userToken)
          ctx.status = 200
          ctx.body = {
            success:true,
            message:'获取token成功',
            token
          }
        }
      }else{
        ctx.status = 400;
        ctx.body = {
          success: false,
          message: '请输入用户名和密码'
        }
      }
    }catch (e) {
      ctx.status = 400
      ctx.body = {
        success: false,
        message: e
      }
    }
  }

  /**
   * 获取用户信息
   * @param ctx
   * @returns {Promise<void>}
   */
  async getUserInfo(ctx){
    const token = ctx.headers.authorization
    if(token){
      console.log(token)
      try {
        const user = ctx.request.body
        if(user){
          const getUserInfo = await userModel.findUserByName(user.name)
          if(getUserInfo){
            ctx.status = 200
            ctx.body = {
              name: getUserInfo.name
            }
          }else {
            ctx.status = 400
            ctx.body = {
              success:false,
              message: '用户名必填'
            }
          }
        }else{
          ctx.status = 400
          ctx.body = {
            success:false,
            message: '用户名必填'
          }

        }
      }catch (e) {
        ctx.status = 400
        ctx.body ={
          success: false,
          message: '登录状态已失效，请重新登录'
        }
      }
    }else{
      ctx.status = 400
      ctx.body ={
        success: false,
        message: '登录状态已失效，请重新登录'
      }
    }

  }

  /**
   * 删除用户
   * @param ctx
   * @returns {Promise<void>}
   * @constructor
   */
  async deleteUser(ctx){
    try {
      const user = ctx.request.body
      if(user){
        const isUser = await userModel.findUserById(user.id)
        if(isUser){
          await userModel.deleteUser(user.id)
          ctx.status = 200
          ctx.body = {
            success:true,
            message: '操作成功'
          }
        }else{
          ctx.status = 400
          ctx.body = {
            success:false,
            message: '用户不存在，删除失败'
          }
        }
      }else{
        ctx.status = 400
        ctx.body = {
          success:false,
          message: 'id为必填项'
        }
      }
    }catch (e) {
      ctx.status = 400
      ctx.body = {
        success:false,
        message: e
      }
    }
  }

  /**
   * 更新用户
   * @param ctx
   * @returns {Promise<void>}
   */
  async updateUser(ctx){
    try {
      const user = ctx.request.body
      if(user.name&&user.id){
        const isUser = await userModel.findUserById(user.id)
        if(isUser){
          await userModel.updateUser(user)
          ctx.status = 200
          ctx.body = {
            success:true,
            message: '操作成功'
          }
        }else{
          ctx.status = 400
          ctx.body = {
            success:false,
            message: '用户不存在'
          }
        }
      }else{
        ctx.status = 400
        ctx.body = {
          success: false,
          message: 'id和name为必填项'
        }
      }
    }catch (e) {
      ctx.status = 400
      ctx.body = {
        success:false,
        message: e
      }
    }
  }
}
module.exports = new UserController()
