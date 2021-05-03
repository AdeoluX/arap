const AbstractController = require("./abstract.controller")
const { HTTP_CODES } = require("../constants")
const errorsWrap = require("../decorators/errors-wrap.decorator")

class UsersController extends AbstractController {
  constructor({ userService } = {}) {
    super()

    this.userService = userService
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

  createEndpoints() {
    this.router.get("/", errorsWrap(this.getAllUsers))
    this.router.get("/:userId", errorsWrap(this.getUserById))
    this.router.post("/", errorsWrap(this.createUser))
    this.router.patch("/:userId", errorsWrap(this.updateUserById))
    this.router.delete("/:userId", errorsWrap(this.deleteUserById))
  }
}

module.exports = UsersController
