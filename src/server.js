const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const errorsInterceptor = require("./middlewares/error.interceptor")

class Server {
  constructor(dbConnector) {
    this.port = parseInt(process.env.PORT) || 5000
    this.server = express()
    this.dbConnector = dbConnector
  }

  configure() {
    this.server
      .use(cors())
      .use(morgan("combined"))
      .use(express.urlencoded({ extended: false }))
      .use(express.json())

      // TODO: add controllers
      .use(errorsInterceptor)
  }

  async connectDB() {
    await this.dbConnector.connect()
  }

  listen() {
    this.server.listen(this.port, () =>
      console.log(`Server is listenning on port ${this.port}`)
    )
  }
}

module.exports = Server
