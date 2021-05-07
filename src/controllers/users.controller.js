const BaseController = require("./base.controller")
const userService = require("../services/user.service")
const { HTTP_CODES, ROUTER_METHODS } = require("../constants")
const errorsWrap = require("../decorators/errors-wrap.decorator")

/**
 * Users Controller
 */
class UsersController extends BaseController {
  constructor(userService) {
    super()
    this.userService = userService

    // use base controller build-in way to init routes
    this.initRoutes({
      "/": [
        { method: ROUTER_METHODS.get, handler: this.getAllUsers },
        { method: ROUTER_METHODS.post, handler: this.createUser },
      ],
      "/:userId": [
        { method: ROUTER_METHODS.get, handler: this.getUserById },
        { method: ROUTER_METHODS.patch, handler: this.updateUserById },
        { method: ROUTER_METHODS.delete, handler: this.deleteUserById },
      ],
    })
  }

  async getAllUsers(req, res) {
    const users = await this.userService.getAllUsers()
    res.status(HTTP_CODES.ok).json(users)
  }

  async getUserById(req, res) {
    const { userId } = req.params
    const user = await this.userService.getUserById(userId)
    res.status(HTTP_CODES.ok).json(user)
  }

  async createUser(req, res) {
    const { user } = req.body
    const newUser = await this.userService.createUser(user)
    res.status(HTTP_CODES.created).json(newUser)
  }

  async updateUserById(req, res) {
    const { userId } = req.params
    const { updateObj } = req.body
    const updatedUser = await this.userService.updateUserById({
      userId,
      updateObj,
    })
    res.status(HTTP_CODES.accepted).json(updatedUser)
  }

  async deleteUserById(req, res) {
    const { userId } = req.params
    await this.userService.deleteUserById(userId)
    res.sendStatus(HTTP_CODES.accepted)
  }
}

module.exports = new UsersController(userService) // export singleton instance
exports.UsersController = UsersController // export class for tests
