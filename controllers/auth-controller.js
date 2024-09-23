const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const placeModel = require("../models/place-model");

module.exports.registerPageController = function (req, res) {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("register", { loggedIn: false, error, success });
};

module.exports.loginPageController = function (req, res) {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("login", { loggedIn: false, error, success });
};

module.exports.postRegisterController = async function (req, res) { 
  let { name, email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    req.flash("error", "User already registered, please login");
    return res.redirect("/");
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      user = await userModel.create({
        name,
        email,
        password: hash,
        profilepic: req.file.filename,
      });
      let token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token);
      req.flash("success", "Registration successful, welcome!");    
      res.redirect("/");
    });
  });
};

module.exports.postLoginController = async function (req, res) {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/login");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      req.flash("error", "Invalid email or password");
      res.redirect("/login");
    }
  });
};

module.exports.profilePageController = async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email }).populate("places");
  let success = req.flash("success")
  res.render("profile", { user, success }); 
};

module.exports.logoutPageController = async function (req, res) {
  res.cookie("token", "");
  req.flash("success", "Logged out successfully!");
  res.redirect("/login");
};
