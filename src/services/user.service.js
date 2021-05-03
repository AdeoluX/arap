const { ERROR_NAMES } = require("../constants")

/**
 * Users Service
 */
class UserService {
  constructor(userModel) {
    this.userModel = userModel
  }

  // Define db interactions models logic inside methods
  // There are few examples below

  async getAllUsers() {
    const users = await this.userModel.find({})
    return users
  }

  async getUserById(userId) {
    const user = await this.userModel.findOneById(userId)
    if (!user) throw new Error(ERROR_NAMES.notFound)
    return user
  }

  async getUserByEmail(email) {
    const user = await this.userModel.findOne({ email })
    if (!user) throw new Error(ERROR_NAMES.notFound)
    return user
  }

  async createUser(user) {
    const user = await this.userModel.create(user)
    return user
  }

  async updateUserById({ userId, updateObj }) {
    // mongo example
    const user = this.userModel.findOneAndUpdate(
      { _id, userId },
      { ...updateObj },
      { new: true }
    )
    if (!user) throw new Error(ERROR_NAMES.notFound)
    return user
  }

  async deleteUserById(userId) {
    // mongo example
    await this.userModel.deleteOne({ _id: userId })
  }
}

module.exports = UserService
