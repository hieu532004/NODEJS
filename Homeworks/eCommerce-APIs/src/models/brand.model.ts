import { Schema, model, Document } from "mongoose";
import { generateSlug } from '../helpers/slugify.helper';

interface IBrand extends Document {
    brand_id: number;
    brand_name: string;
    description?: string;
    slug: string;
  }
const brandSchema = new Schema<IBrand>({
    brand_name: {
        type: String,
        required: true, // NOT NULL
        unique: true, // duy nhất
        minLength: [4, 'Tối thiểu phải 4 kí tự'], // độ dài tối thiểu
        maxLength: 50, // độ dài tối đa
    },
    description: {
        type: String,
        maxLength: 500,
        trim: true, // xóa khoảng trắng ở đầu và cuối 
        default: "" // giá trị mặc định khi tạo mới
     },
    
},
    { 
        timestamps: true, // tự động sinh ra 2 trường createdAt và updatedAt
        versionKey: false, // bỏ đi trường __v
        collection: "brands" // tùy chỉnh tên collection để tiện quản lý
     })
     brandSchema.pre('save', function (next) {
        if (!this.slug) {
          this.slug = generateSlug(this.brand_name);
        }
        next();
      });
      export const Brand = model<IBrand>('Brand', brandSchema);