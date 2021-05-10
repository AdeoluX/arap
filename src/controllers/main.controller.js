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

/**
 * Swagger Docs
 * in case of exposing docs only in development, rely on process.env
 *
 * if(process.env.NODE_ENV === "development") {
 *  setup swagger and use in controller
 * }
 */
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../../swagger.json")
mainController.use("/docs", swaggerUi.serve)
mainController.get("/docs", swaggerUi.setup(swaggerDocument))

module.exports = mainController
