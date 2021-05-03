const errorsWrap = require("../decorators/errors-wrap.decorator")
const AbstractController = require("./abstract.controller")

/**
 * Auth Controller
 */
class AuthController extends AbstractController {
  constructor() {
    super()
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

module.exports = AuthController
