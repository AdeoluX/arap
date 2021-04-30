const AbstractController = require("./abstract.controller")
const { HTTP_CODES } = require("../constants")
const errorsWrap = require("../decorators/errors-wrap.decorator")

class UsersController extends AbstractController {
  async getAllUsers(req, res) {
    // todo
    res.sedStatus(HTTP_CODES.notImplemented)
  }

  async getUserById(req, res) {
    // todo
    res.sedStatus(HTTP_CODES.notImplemented)
  }

  async createUser(req, res) {
    // todo
    res.sedStatus(HTTP_CODES.notImplemented)
  }

  async updateUserById(req, res) {
    // todo
    res.sedStatus(HTTP_CODES.notImplemented)
  }

  async deleteUserById(req, res) {
    // todo
    res.sedStatus(HTTP_CODES.notImplemented)
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
