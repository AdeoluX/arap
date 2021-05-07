const { Router } = require("express")
const authController = require("./auth.controller")
const usersController = require("./users.controller")

// combine controllers into one here

const mainController = Router()

// temporary test route
mainController.get("/test", (req, res) => {
  res.json({ ok: true })
})

mainController.use("/auth", authController).use("/users", usersController)

module.exports = mainController
