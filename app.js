require('dotenv').config();
const express = require("express");
const app = express();
const indexRouter = require("./routes/index-router");
const placeRouter = require("./routes/place-router");
const path = require("path");
const flash = require("connect-flash");
const expressSession = require("express-session");

const db = require("./config/mongoose-connection");
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use("/", indexRouter);

app.use("/place", placeRouter);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
