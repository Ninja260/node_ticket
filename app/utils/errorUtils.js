class CustomError extends Error {
    constructor(message, { httpStatus, errorCode, errors }) {
        super(message);
        this.message = message;
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.errors = errors;
    }
}

exports.CustomError = CustomError;

/**
 * 
 * @param {string} message - Error Message
 * @param {object} meta - more error info
 * @param {number} meta.httpStatus - Http Status code
 * @param {number} meta.errorCode - Error Code 
 * @param {Array<object>} meta.errors - Arrays of error objects
 * @returns {CustomError} Returns an instance of CustomError
 */
exports.error = (message, meta ) => {
    const { httpStatus, errorCode, errors } = meta || {};
    return new CustomError(message, { httpStatus, errorCode, errors })
}

exports.customErrorHandler = (err, _, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof CustomError) {
        res.status(err.httpStatus || 422)
            .json({
                success: false,
                errors: err.errors || {
                    code: err.errorCode,
                    message: err.message
                }
            });
        
        return;
    }

    res.status(500)
        .json({
            success: false,
            errors: {
                message: err.message
            }
        });
};