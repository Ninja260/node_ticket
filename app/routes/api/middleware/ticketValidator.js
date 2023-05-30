const { body, param, query, validationResult } = require('express-validator');

exports.listQueryValidator = [
  query('type')
    .trim()
    .notEmpty()
    .isIn(['concern', 'all']),
  query('search').optional().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.idUrlSegmentValidator = [
  param('id').trim().notEmpty().isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.bodyPayloadValidator = [
  body('topic').trim().notEmpty().escape(),
  body('description').trim().notEmpty().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];