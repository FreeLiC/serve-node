const {sequelize} = require('../db')
const User = sequelize.import('../schema/user.js')

class UserModel {
  /**
   * 查找用户
   * @param name
   * @returns {Promise<Model<T, T2>>}
   */
  async findUserByName(name){
    const userInfo = await User.findOne({
      where:{
        name
      }
    })
    return userInfo
  }

  /**
   * 通过用户id查找用户
   * @param id
   * @returns {Promise<Model<T, T2>>}
   */
  async findUserById(id){
    const user = await User.findOne({
      where:{
        id
      }
    })
    return user
  }

  /**
   * 创建用户
   * @param user
   * @returns {Promise<boolean>}
   */
  async createUser(user){
    await User.create({
      'name':user.name,
      'password':user.password
    })
    return true
  }

  /**
   * 删除用户
   * @param user
   * @returns {Promise<boolean>}
   */
  async deleteUser(id){
    await User.destroy({
      where:{
        'id': id
      }
    })
    return true
  }

  /**
   * 更新用户
   * @param user
   * @returns {Promise<boolean>}
   */
  async updateUser(user){
    await User.update({
      'name': user.name
    }, {
      where:{
      'id': user.id
    }})
    return true
  }
}

module.exports = new UserModel()
