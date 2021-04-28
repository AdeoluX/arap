const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

class ServerBuilder {
  constructor() {
    this.port = parseInt(process.env.PORT) || 5000
    this.server = null
  }

  init() {
    this.server = express()
    return this
  }

  configure() {
    this.server &&
      this.server
        .use(cors())
        .use(morgan("combined"))
        .use(express.urlencoded({ extended: false }))
        .use(express.json())
    return this
  }

  async connectDB() {
    // TODO: add db connection
    return this
  }

  listen() {
    this.server.listen(this.port, () => `Server is listenning on port ${this.port}`)
    return this
  }
}

module.exports = ServerBuilder
