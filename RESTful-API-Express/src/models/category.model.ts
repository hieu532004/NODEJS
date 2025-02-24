import { Schema, model } from 'mongoose';
import slugify from 'slugify'; // Thư viện để tự động tạo slug

// Định nghĩa cấu trúc của collection category
const categorySchema = new Schema(
  {
    categoryName: { // Đổi tên thành camelCase cho chuẩn JavaScript
      type: String,
      maxLength: [50, 'Tên danh mục không được vượt quá 50 ký tự'], // Thêm thông báo lỗi
      required: [true, 'Tên danh mục là bắt buộc'], // Thông báo lỗi tùy chỉnh
      unique: true, // Đảm bảo không trùng lặp
      trim: true, // Loại bỏ khoảng trắng thừa ở đầu/cuối
    },
    description: {
      type: String,
      maxLength: [500, 'Mô tả không được vượt quá 500 ký tự'],
      required: false, // Không bắt buộc
      trim: true, // Loại bỏ khoảng trắng thừa
    },
    slug: {
      type: String,
      maxLength: [50, 'Slug không được vượt quá 50 ký tự'],
      required: [true, 'Slug là bắt buộc'],
      unique: true, // Đảm bảo không trùng lặp
      trim: true,
      lowercase: true, // Chuyển slug về chữ thường
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    toJSON: { virtuals: true }, // Cho phép xuất các trường ảo nếu cần
    toObject: { virtuals: true },
  }
);

// Tự động sinh slug từ categoryName trước khi lưu
categorySchema.pre('save', function (next) {
  if (this.isModified('categoryName')) {
    this.slug = slugify(this.categoryName, { lower: true, strict: true });
  }
  next();
});

// Xuất model
export default model('Category', categorySchema);