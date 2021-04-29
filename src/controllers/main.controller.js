const { Router } = require("express")
const UsersController = require("./users.controller")

// combine controllers into one here

const mainController = Router()

// temporary test route
mainController.get("/test", (req, res) => {
  res.json({ ok: true })
})
mainController.use("/users", new UsersController())

module.exports = mainController
