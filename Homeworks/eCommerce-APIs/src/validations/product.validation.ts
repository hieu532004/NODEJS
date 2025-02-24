import { check } from 'express-validator';

export const productValidation = [
  check('product_name').notEmpty().withMessage('Product name is required'),
  check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  check('discount').isFloat({ min: 0, max: 70 }).withMessage('Discount must be between 0 and 70'),
  check('category_id').notEmpty().withMessage('Category ID is required'),
  check('brand_id').notEmpty().withMessage('Brand ID is required'),
  check('model_year').isInt().withMessage('Model year must be an integer'),
  check('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];