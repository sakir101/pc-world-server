"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
// eslint-disable-next-line no-unused expressions
const mongoose_1 = require("mongoose");
const product_constant_1 = require("./product.constant");
const productSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: product_constant_1.productStatus
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    feature: {
        type: [String],
        required: true
    },
    rating: {
        type: [String]
    },
    avgRating: {
        type: Number,
    },
    reviews: {
        type: [String],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
