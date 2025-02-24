import { check } from 'express-validator';

export const customerValidation = [
  check('first_name').notEmpty().withMessage('First name is required'),
  check('last_name').notEmpty().withMessage('Last name is required'),
  check('phone').notEmpty().withMessage('Phone is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('street').notEmpty().withMessage('Street is required'),
  check('city').notEmpty().withMessage('City is required'),
  check('state').notEmpty().withMessage('State is required'),
  check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];