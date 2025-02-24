
import { Schema, model, Document } from "mongoose";
import { generateSlug } from '../helpers/slugify.helper';
interface ICategory extends Document {
    category_id: number;
    category_name: string;
    description?: string;
    slug: string;
  }
const categorySchema = new Schema<ICategory> ({
    category_name: {
        type: String,
        maxLength: 50,
        required: true,
        unique: true
    },
    description: {
        type: String,
        maxLength: 255,
        required: false,
    },
    slug: {
        type: String,
        maxLength: 50,
        required: true,
        unique: true,
        lowercase: true,
    }
})
categorySchema.pre('save', function (next) {
    if (!this.slug) {
      this.slug = generateSlug(this.category_name);
    }
    next();
  });
export default model<ICategory>('Category', categorySchema);