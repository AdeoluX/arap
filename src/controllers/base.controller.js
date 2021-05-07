const { Router } = require("express")

/**
 * Base Controller class.
 * Used for inheritance only
 */
class BaseController {
  constructor() {
    this.router = Router()
  }

  /**
   * Common route handler wrapper with try-catch
   * In case of error, calls next() to pass error to express error handle middleware
   * @param {Function} asyncHandler async handler function
   * @returns Promise
   */
  async withTryCatch(asyncHandler) {
    return async (req, res, next) => {
      try {
        return await asyncHandler(req, res, next)
      } catch (error) {
        console.error("Intercepted Error: ", { error })
        next(error)
      }
    }
  }

  /**
   * Create controller routes wrapped with try-catch
   * @param {Object} endpointsMap object with endpoints names, methods and handlers
   * Example of endpointsMap:
   *  {
   *    "/test": {method: "get", handler: ()=> {}}
   *  }
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
