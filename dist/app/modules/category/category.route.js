"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
// eslint-disable-next-line no-unused expressions
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.get('/:id', category_controller_1.CategoryController.getSingleCategory);
router.get('/', category_controller_1.CategoryController.getAllCategories);
exports.CategoryRoutes = router;
