const { Router } = require("express")

// combine controllers into one here

const mainController = Router()

// temporary test route
mainController.get("/test", (req, res) => {
  res.json({ ok: true })
})

module.exports = mainController
