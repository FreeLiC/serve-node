async function checkToken(ctx,next) {
  // 错误处理
  return next().catch((err) => {
    if(err.status === 401){
      ctx.status = 401
      ctx.body = {
        success:false,
        message: '登录状态已失效，请重新登录'
      }
    }else{
      throw err;
    }
  })
}

module.exports = checkToken
