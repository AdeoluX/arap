const errorsWrap = require("../decorators/errors-wrap.decorator")
const AbstractController = require("./abstract.controller")
const authService = require("../services/auth.service")

/**
 * Auth Controller
 */
class AuthController extends AbstractController {
  constructor(authService) {
    super()
    this.authService = authService
  }

  async signin(req, res) {
    // todo
  }

  async signup(req, res) {
    // todo
  }

  createEndpoints() {
    this.router.post("/signin", errorsWrap(this.signin))
    this.router.post("/signup", errorsWrap(this.signup))
  }
}

module.exports = new AuthController(authService) // export singleton instance
exports.AuthController = AuthController // export class for tests
