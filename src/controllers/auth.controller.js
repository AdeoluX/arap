const BaseController = require("./base.controller")
const authService = require("../services/auth.service")
const { ROUTER_METHODS } = require("../constants")

/**
 * Auth Controller
 */
class AuthController extends BaseController {
  constructor(authService) {
    super({ useValidatorErrCapture: true })
    this.authService = authService

    // use base controller build-in way to init routes
    this.initRoutes({
      // TODO: add validations
      "/signin": { method: ROUTER_METHODS.post, handler: this.signin },
      "/signup": { method: ROUTER_METHODS.post, handler: this.signup },
    })
  }

  async signin(req, res) {
    // todo
  }

  async signup(req, res) {
    // todo
  }
}

module.exports = new AuthController(authService) // export singleton instance
exports.AuthController = AuthController // export class for tests
