const express = require("express");
const router = express.Router();
const {signUpController, signInController, logoutController} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/signUp', signUpController);
router.post('/signIn', signInController);
router.get('/logout', authMiddleware, logoutController);

module.exports = router;