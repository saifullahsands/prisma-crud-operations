class AppError extends Error{
constructor(message,status){
    super(message)
    this.message=message
    this.status=status
    Error.captureStackTrace(this,this.constructor)
}
}

class ValidationError extends AppError{
    constructor(message,skipLogging=false){
        super(message,422)
    }
}

class BadRequestError extends AppError{
    constructor(message,skipLogging=false){
        super(message,400)
    }
}

class unAuthorizedError extends AppError{
    constructor(message){
        super(message,401)
    }
}

