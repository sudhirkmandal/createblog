const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = function (req, res, next) {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                req.flash("error", "You must be logged in");
                return res.redirect("/login");
            }
            req.user = decoded;
            next();
        });
    } else {
        req.flash("error", "You must be logged in");
        res.redirect("/login");
    }
};

module.exports.isAuthenticate = function (req, res, next) {
    if (req.cookies.token) {
        return res.redirect("/profile");
    }
    next();
};
