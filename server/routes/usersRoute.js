const express = require("express");
const router = express.Router();
const {getAllController, addFriendController, deleteFriendController} = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/", authMiddleware, getAllController);
router.post("/friendList/add", authMiddleware, addFriendController);
router.post("/friendList/delete", authMiddleware, deleteFriendController);

module.exports = router;