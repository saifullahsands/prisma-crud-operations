const { handleError } = require("../utils/index")

const globalMiddleware = (err, req, res, next) => {
    const message = err.message ?? "Something went wrong"
    const status = err.status ?? 500
    return handleError(res, status, message, null)
}

module.exports = globalMiddleware