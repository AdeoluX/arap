const { Router } = require("express")
const AuthController = require("./auth.controller")
const UsersController = require("./users.controller")

// combine controllers into one here

const mainController = Router()

// temporary test route
mainController.get("/test", (req, res) => {
  res.json({ ok: true })
})

mainController
  .use("/auth", new AuthController())
  .use("/users", new UsersController())

module.exports = mainController
