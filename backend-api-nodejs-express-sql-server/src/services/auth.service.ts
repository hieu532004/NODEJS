import bcrypt from 'bcrypt';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { Staff } from '../entities/staff.entity';
import { env } from '../helpers/env.helper';
import { Response } from 'express';
import { myDataSource } from '../data-source';

const staffRepository = myDataSource.getRepository(Staff);
const login = async ({
  email,
  password
}: {
  email: string,
  password: string,
}) => {
  // Check if email exists
  const staff = await staffRepository.findOne({ where: { email } });
  if (!staff) {
    // General error message to avoid revealing if email exists
    throw createError(400, 'Email or password is invalid');
  }

  // Check password
  const passwordHash = staff.password;
  const isValid = await bcrypt.compare(password, passwordHash);
  if (!isValid) {
    // General error message to avoid revealing if password is incorrect
    throw createError(400, 'Email or password is invalid');
  }

  // Login successful, create tokens
  const accessToken = jwt.sign(
    { staff_id: staff.staff_id, email: staff.email },
    env.JWT_SECRET as string,
    { expiresIn: '24h' } // expires in 24 hours
  );

  const refreshToken = jwt.sign(
    { staff_id: staff.staff_id, email: staff.email },
    env.JWT_SECRET as string,
    { expiresIn: '365d' } // expires in 365 days
  );

  return {
    accessToken,
    refreshToken
  };
}

const getProfile = async (res: Response) => {
  const { staff } = res.locals;
  return staff;
}

export default {
  login,
  getProfile
}
