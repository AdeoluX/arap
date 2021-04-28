const dotenv = require("dotenv")
const ServerBuilder = require("./src/server")
const DatabaseConnector = require("./src/db.connector")

// parse envs first
dotenv.config() // take .env by default. other path can be specified

// entry point
;(async () => {
  try {
    const server = new ServerBuilder(new DatabaseConnector())
    server.init().configure()
    await server.connectDB()
    server.listen()
  } catch (err) {
    console.error("Server Error", { err })
    process.exit(1)
  }
})()
