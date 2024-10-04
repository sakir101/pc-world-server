"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = require("http-status");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = Object.assign(Object.assign({}, payload), { rating: [], avgRating: 0, reviews: [] });
    const result = yield product_model_1.Product.create(productData);
    return result;
});
const getAllProducts = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: product_constant_1.productSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }
    if (Object.keys(filtersData)[0] === 'maxRate') {
        const topRatedProducts = yield product_model_1.Product.find().sort({ avgRating: -1 });
        const total = yield product_model_1.Product.countDocuments(topRatedProducts);
        return {
            meta: {
                page,
                limit,
                total
            },
            data: topRatedProducts
        };
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield product_model_1.Product.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield product_model_1.Product.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const getSingleProductByName = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.Product.find({ category: category });
    return products;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviews, rating } = payload, restPayload = __rest(payload, ["reviews", "rating"]);
    if (reviews === undefined) {
        const result = yield product_model_1.Product.findOneAndUpdate({ _id: id }, payload, { new: true });
        return result;
    }
    let reviews1;
    let rating1;
    if (!Array.isArray(reviews)) {
        reviews1 = [reviews]; // Convert to an array if it's not already one
    }
    if (!Array.isArray(rating)) {
        rating1 = [rating]; // Convert to an array if it's not already one
    }
    const result = yield product_model_1.Product.findOneAndUpdate({ _id: id }, { $set: restPayload, $push: { reviews: { $each: reviews1 }, rating: { $each: rating1 } } }, { new: true });
    const product = yield product_model_1.Product.findById(id);
    if (!product) {
        throw new ApiError_1.default(http_status_1.NOT_FOUND, "Product Data not found");
    }
    const ratings = product.rating.map((value) => Number(value));
    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / ratings.length;
    const averageRatingInteger = Math.round(averageRating);
    const result2 = yield product_model_1.Product.findOneAndUpdate({ _id: id }, { $set: { avgRating: averageRatingInteger } }, { new: true });
    return result2;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.ProductService = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    getSingleProductByName,
    updateProduct,
    deleteProduct
};
