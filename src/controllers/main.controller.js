const { Router } = require("express")
const authController = require("./auth.controller")
const usersController = require("./users.controller")

const mainController = Router()

// temporary test route
mainController.get("/test", (req, res) => {
  res.json({ ok: true })
})

/**
 * Main controller
 * Combines all sub-controllers
 */
mainController.use("/auth", authController).use("/users", usersController)

module.exports = mainController
