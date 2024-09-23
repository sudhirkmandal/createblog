const express = require('express');
const upload = require("../config/multer-config")
const { registerPageController, loginPageController, postRegisterController, profilePageController, postLoginController, logoutPageController } = require('../controllers/auth-controller');
const { isLoggedIn, isAuthenticate } = require('../middlewares/login-middleware');
const router = express.Router();

router.get("/", isAuthenticate, registerPageController)
router.get("/login",isAuthenticate, loginPageController)
router.post("/register",upload.single("image"), postRegisterController)
router.post("/login", postLoginController)
router.get("/profile", isLoggedIn, profilePageController)
router.get("/logout", logoutPageController)


module.exports = router;