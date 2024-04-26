const express = require("express");
const {getProducts, getAllProducts, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts} = require('../controllers/productController');
const {protect, admin} = require('../middleware/authMiddleware')
const checkObjectId = require('../middleware/checkObjectid')
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect,checkObjectId,createProductReview)
router.route('/top').get(getTopProducts)
router.route('/:id').get(checkObjectId,getAllProducts).put(protect,admin,checkObjectId, updateProduct).delete(protect, admin,checkObjectId, deleteProduct);


module.exports = router;