const express = require("express")
const {addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders} = require("../controllers/orderController")

const router = express.Router();
const {protect, admin } = require('../middleware/authMiddleware.js')


router.route('/').get(protect, admin, getOrders).post(protect,addOrderItems);
router.route('/mine').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin,updateOrderToDelivered)


module.exports = router