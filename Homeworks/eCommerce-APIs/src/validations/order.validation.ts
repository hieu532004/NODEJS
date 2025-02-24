import { check } from 'express-validator';

export const orderValidation = [
  check('customer_id').notEmpty().withMessage('Customer ID is required'),
  check('order_status').isIn([1, 2, 3, 4]).withMessage('Order status must be 1, 2, 3, or 4'),
  check('staff_id').notEmpty().withMessage('Staff ID is required'),
  check('street').notEmpty().withMessage('Street is required'),
  check('city').notEmpty().withMessage('City is required'),
  check('state').notEmpty().withMessage('State is required'),
  check('payment_type').isIn([1, 2, 3, 4]).withMessage('Payment type must be 1, 2, 3, or 4'),
  check('order_items').isArray().withMessage('Order items must be an array'),
  check('order_items.*.product_id').notEmpty().withMessage('Product ID is required for each item'),
  check('order_items.*.quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  check('order_items.*.price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  check('order_items.*.discount').isFloat({ min: 0, max: 70 }).withMessage('Discount must be between 0 and 70')
];