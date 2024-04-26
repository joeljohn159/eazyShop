const express = require("express")
const { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    getUserById,
    updateUser} = require("../controllers/userController")
const router = express.Router();
const {protect, admin } = require('../middleware/authMiddleware.js')


router.route('/').get(protect, admin, getUsers).post(registerUser);
router.post('/logout', logoutUser);
router.post('/auth',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect, admin,deleteUsers).get(protect, admin,getUserById).put(protect, admin,updateUser);

module.exports = router;