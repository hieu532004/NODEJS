import { Schema, model, Document, Types } from 'mongoose';

interface IOrderItem {
  item_id: number;
  product_id: Types.ObjectId;
  quantity: number;
  price: number;
  discount: number;
}

interface IOrder extends Document {
  order_id: number;
  customer_id: Types.ObjectId;
  order_status: number;
  order_date: string;
  require_date?: Date;
  shipping_date?: Date;
  staff_id: Types.ObjectId;
  order_note?: string;
  street: string;
  city: string;
  state: string;
  payment_type: number;
  order_items: IOrderItem[];
}

const orderItemSchema = new Schema<IOrderItem>({
  item_id: { type: Number, required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, required: true, min: 0, max: 70 }
});

const orderSchema = new Schema<IOrder>({
  order_id: { type: Number, required: true, unique: true },
  customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  order_status: { type: Number, required: true, enum: [1, 2, 3, 4] },
  order_date: { type: String, required: true, default: new Date().toISOString().split('T')[0] },
  require_date: { type: Date },
  shipping_date: { type: Date },
  staff_id: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
  order_note: { type: String },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  payment_type: { type: Number, required: true, enum: [1, 2, 3, 4] },
  order_items: [orderItemSchema]
});

export const Order = model('Order', orderSchema);
export default IOrder;