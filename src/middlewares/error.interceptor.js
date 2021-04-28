const { HTTP_CODES, ERROR_MSG, ERROR_NAMES } = require("../constants")

/**
 * App errors interceptor, which transforms error into api response with proper error message
 * @param {*} err Error
 * @param {*} req Express request
 * @param {*} res Express response
 * @param {*} next Express next
 * @returns undefined
 */
const errorsInterceptor = (err, req, res, next) => {
  if (err) {
    console.log("ERRORS INTERCEPTOR CATCH: ", err, "\n")
    const errKey = ERROR_NAMES[err.message] || ""
    return res.status(HTTP_CODES[errKey] || HTTP_CODES.serverError).json({
      message: ERROR_MSG[errKey] || ERROR_MSG.serverError,
    })
  }
  next()
}

module.exports = errorsInterceptor
