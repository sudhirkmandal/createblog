const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const { isLoggedIn } = require("../middlewares/login-middleware");
const { createPlaceController, placeController, viewPageController, editPageController, editPostPageController, deletePageController } = require("../controllers/place-controller");
const upload = require("../config/multer-config");

router.get("/", isLoggedIn, placeController)
router.post("/create",isLoggedIn, upload.single("image"), createPlaceController)
router.get("/view/:id", isLoggedIn, viewPageController)
router.get("/edit/:id", isLoggedIn, editPageController)
router.post("/edit/:id", isLoggedIn, upload.single("image"), editPostPageController)
router.get("/delete/:id", isLoggedIn, deletePageController)

module.exports = router;