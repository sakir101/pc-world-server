"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
// eslint-disable-next-line no-unused expressions
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Category = (0, mongoose_1.model)('Catagory', categorySchema);
