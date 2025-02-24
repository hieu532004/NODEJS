import { Schema, model, Document } from 'mongoose';
import { hashPassword } from '../helpers/bcrypt.helper';

interface ICustomer extends Document {
  customer_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip_code?: string;
  password?: string;
}

const customerSchema = new Schema<ICustomer>({
  customer_id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip_code: { type: String },
  password: { type: String }
});

customerSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export const Customer = model('Customer', customerSchema);
export default ICustomer;