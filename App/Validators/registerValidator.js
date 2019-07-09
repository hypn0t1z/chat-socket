const { body } = require('express-validator');

module.exports = [
  body('username')
    .exists()
    .withMessage('username_is_required')
    .not()
    .isEmpty()
    .withMessage('username_is_required'),
  body('password')
    .exists()
    .withMessage('password_is_required')
    .isLength({
      min: 8
    })
    .withMessage('password_min_length_is_8')
];
