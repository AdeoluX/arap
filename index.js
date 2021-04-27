const dotenv = require("dotenv")
const ServerBuilder = require("./src/server")

// parse envs first
dotenv.config() // take .env by default. other path can be specified
;(async () => {
  try {
    const server = new ServerBuilder()
    server.init().configure()
    await server.connectDB()
    server.listen()
  } catch (err) {
    console.error("Server Error", { err })
    process.exit(1)
  }
})()
