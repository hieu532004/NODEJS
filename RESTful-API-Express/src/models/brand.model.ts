import { Schema, model } from 'mongoose';

const brandSchema = new Schema({
    brand_name: {
        type: String,
        required: true,
        unique: true, // Not null
        minlength: [4, 'tối thiểu phải 4 kí tự'],
        maxlength: 50, //độ dài tối đa
    },
    description: {
        type: String,
        maxlength: 500,
        trim: true,// xóa khoảng trắng ở đầu và cuối 
        default: ""// giá trị mặc định 
    },
},
    {
        timestamps: true,// Tự động sinh ra hai trường createAt và updateAt
        versionKey: false, // bỏ đi trường __v
        collection: "brands" // tùy chỉnh tên collection để tiện quản lý 
    })

export default model("Brand", brandSchema)