class AppError extends Error {
    constructor(message, status, skipLogging) {
        super(message)
        this.message = message
        this.status = status;
        this.skipLogging = skipLogging
        Error.captureStackTrace(this, this.constructor)
    }
}

class ValidationError extends AppError {
    constructor(message, skipLogging = false) {
        super(message, 422)
    }
}

class BadRequestError extends AppError {
    constructor(message, skipLogging = false) {
        super(message, 400, skipLogging)
    }
}

class unAuthorizedError extends AppError {
    constructor(message) {
        super(message, 401)
    }
}

class ForbiddenError extends AppError {
    constructor(message) {
        super(message, 403);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

class InternalServerError extends AppError {
    constructor(message) {
        super(message, 500);
    }
}

module.exports = {
    InternalServerError,
    unAuthorizedError,
    NotFoundError,
    ForbiddenError,
    BadRequestError,
    ValidationError,
    AppError
}