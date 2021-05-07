const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const errorsInterceptor = require("./middlewares/error.interceptor")
const validationErrorsInterceptor = require("./middlewares/validation-errors.interceptor")
const mainController = require("./controllers/main.controller")

/**
 * Server creation class
 * Creates and configures express server
 */
class Server {
  /**
   * Server constructor.
   * @param {Object} dbConnector
   */
  constructor(dbConnector) {
    this.port = parseInt(process.env.API_PORT) || 5000
    this.apiPrefix = process.env.API_PREFIX || "api"
    this.server = express()
    this.dbConnector = dbConnector
  }

  /**
   * Configures server with middlewares and controllers
   */
  configure() {
    // add middlewares here
    this.server
      .use(cors())
      .use(morgan("combined"))
      .use(express.urlencoded({ extended: false }))
      .use(express.json())
      .use(this.apiPrefix, validationErrorsInterceptor, mainController)
      .use(errorsInterceptor)
  }

  /**
   * Connects to database using provided dbConnector
   */
  async connectDB() {
    this.dbConnector && (await this.dbConnector.connect())
  }

  /**
   * Launches server listen to port.
   */
  listen() {
    this.server.listen(this.port, () =>
      console.log(`Server is listenning on port ${this.port}`)
    )
  }
}

module.exports = Server
