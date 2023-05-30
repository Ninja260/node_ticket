const { body, validationResult } = require('express-validator');

exports.loginPayloadValidator = [
    [
        body('email').trim().notEmpty().isEmail(),
        body('password').trim().notEmpty().escape(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];