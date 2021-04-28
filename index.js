const dotenv = require("dotenv")
const Server = require("./src/server")
const DatabaseConnector = require("./src/db.connector")

// parse envs first
dotenv.config() // take .env by default. other path can be specified

/**
 * Entry app function
 */
;(async () => {
  try {
    const server = new Server(new DatabaseConnector())

    server.configure()
    await server.connectDB()
    server.listen()
  } catch (err) {
    console.error("Server Error", { err })
    process.exit(1)
  }
})()
