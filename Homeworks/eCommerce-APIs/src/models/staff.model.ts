import { Schema, model, Document, Types } from 'mongoose';
import { hashPassword } from '../helpers/bcrypt.helper';

interface IStaff extends Document {
  staff_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  active: number;
  store_id: number;
  manage_id?: Types.ObjectId;
  password: string;
}

const staffSchema = new Schema<IStaff>({
  staff_id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  active: { type: Number, required: true, default: 0 },
  store_id: { type: Number, required: true },
  manage_id: { type: Schema.Types.ObjectId, ref: 'Staff' },
  password: { type: String, required: true }
});

staffSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export const Staff = model('Staff', staffSchema);
export default IStaff;