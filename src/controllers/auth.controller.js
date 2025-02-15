const BaseController = require("./base.controller")
const authService = require("../services/auth.service")
const { ROUTER_METHODS, HTTP_CODES } = require("../constants")
const responder = require("../helper/controller.responder")
const authInterceptor = require("../interceptors/auth.interceptor")

/**
 * Auth Controller
 */
class AuthController extends BaseController {
  constructor(authService) {
    super({ useValidatorErrCapture: true })
    this.authService = authService

    // use base controller build-in way to init routes and express router
    this.initRoutes({
      "/signin": {
        method: ROUTER_METHODS.post,
        /*add validations middleware */ handler: this.signin,
      },
      "/signup": {
        method: ROUTER_METHODS.post,
        /*add validations middleware */ handler: this.signup,
      },
      "/add-user": {
        method: ROUTER_METHODS.post,
        middlewares: [
          authInterceptor('entity')
        ],
        handler: this.addUser
      },
    })
  }

  async signin(req, res) {
    // add signin logic
    const { email, password } = req.body;
    const result = await this.authService.signin({
      email, password
    })
    if(!result?.success) return responder(res, HTTP_CODES.badRequest, result)
    return responder(res, HTTP_CODES.ok, result)
  }

  async signup(req, res) {
    // add signup logic
    const {
      name, type, email, password, confirmPassword
    } = req.body
    const result = await this.authService.signup({
      name, type, email, password, confirmPassword
    })
    if(!result?.success) return responder(res, HTTP_CODES.badRequest, result)
    return responder(res, HTTP_CODES.created, result)
  }

  async addUser(req, res) {
    const { id: authId, type } = req.auth
    const { username, email } = req.body;
    const result = await this.authService.addUser({
      email, username, entity: authId
    })
    if(!result?.success) return responder(res, HTTP_CODES.badRequest, result);
    return responder(res, HTTP_CODES.created, result)
  }
}

module.exports = new AuthController(authService) // export singleton instance
exports.AuthController = AuthController // export class for tests
