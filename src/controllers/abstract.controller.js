const { Router } = require("express")

/**
 * Abstract Controller class.
 * Used for inheritance as basic controller template
 */
class AbstractController {
  constructor() {
    this.router = Router()

    this.createEndpoints()
  }

  createEndpoints() {
    // will be defined inside child controllers classes
  }
}

module.exports = AbstractController
