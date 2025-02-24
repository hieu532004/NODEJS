import { check } from 'express-validator';

export const staffValidation = [
  check('first_name').notEmpty().withMessage('First name is required'),
  check('last_name').notEmpty().withMessage('Last name is required'),
  check('phone').notEmpty().withMessage('Phone is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('active').isIn([0, 1]).withMessage('Active must be 0 or 1'),
  check('store_id').isInt().withMessage('Store ID must be an integer'),
  check('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];