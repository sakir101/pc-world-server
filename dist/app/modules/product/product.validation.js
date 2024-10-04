"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
// eslint-disable-next-line no-unused expressions
const zod_1 = require("zod");
const product_constant_1 = require("./product.constant");
const createProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Id is required"
        }),
        productName: zod_1.z.string({
            required_error: "Product name is required"
        }),
        img: zod_1.z.string({
            required_error: "Image is required"
        }),
        category: zod_1.z.string({
            required_error: "Category is required"
        }),
        status: zod_1.z.enum([...product_constant_1.productStatus]),
        price: zod_1.z.string({
            required_error: "Price is required"
        }),
        description: zod_1.z.string({
            required_error: "Description is required"
        }),
        feature: zod_1.z.array(zod_1.z.string()).nonempty("Feature is required"),
    })
});
const updateProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string().optional(),
        img: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        status: zod_1.z.enum([...product_constant_1.productStatus]).optional(),
        price: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        feature: zod_1.z.array(zod_1.z.string()).optional()
    }).optional()
});
exports.ProductValidation = {
    createProductZodSchema,
    updateProductZodSchema
};
