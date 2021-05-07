const { Router } = require("express")

/**
 * Abstract Controller class.
 * Used for inheritance as basic controller
 */
class BaseController {
  constructor() {
    this.router = Router()
  }

  /**
   * Common route handler wrapper with try-catch
   * @param {Function} asyncHandler async handler function
   * @returns Promise
   */
  async withTryCatch(asyncHandler) {
    return async (req, res, next) => {
      try {
        console.error("Intercepted Error: ", { err })
        return await asyncHandler(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }

  /**
   * Create controller routes wrapped with try-catch
   * @param {Object} endpointsMap object with endpoints names, methods and handlers
   */
  initRoutes(endpointsMap = {}) {
    const _create = (mtd, name, cb) =>
      this.router[mtd](name, this.withTryCatch(cb))

    for (const endpointName in endpointsMap) {
      if (Array.isArray(endpointsMap[endpointName])) {
        endpointsMap[endpointName].forEach((endpoint) => {
          _create(endpoint.method, endpointName, endpoint.method)
        })
      } else {
        _create(
          endpointsMap[endpointName].method,
          endpointName,
          endpointsMap[endpointName].method
        )
      }
    }
  }
}

module.exports = BaseController
