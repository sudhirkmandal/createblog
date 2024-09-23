const userModel = require("../models/user-model");
const placeModel = require("../models/place-model");

module.exports.placeController = async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  res.render("create", { user });
};

module.exports.createPlaceController = async function (req, res) {
  let { name, description, location } = req.body;
  let place = await placeModel.create({
    name,
    description,
    location,
    user: req.user.id,
    image: req.file.filename,
  });
  let user = await userModel.findOne({ email: req.user.email });
  user.places.push(place._id);
  await user.save();
  req.flash("success", "Place added successfully");
  res.redirect("/profile");
};

module.exports.viewPageController = async function (req, res) {
  try {
    let allPlace = await placeModel.findOne({ _id: req.params.id });

    let user = await userModel
      .findOne({ email: req.user.email })
      .populate("places");

    res.render("view", { user, allPlace });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while loading the page.");
  }
};

module.exports.editPageController = async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let allPlace = await placeModel.findOne({ _id: req.params.id })  
  res.render("edit", { user, allPlace });
};

module.exports.editPostPageController = async function (req, res) {
  try {
    const { name, description, location } = req.body;    
    const image = req.file ? req.file.filename : null;

    const place = await placeModel.findByIdAndUpdate(req.params.id, {
      name,
      description,
      location,
      ...(image && { image }), 
    });
    res.redirect('/profile');
  } catch (error) {
    console.error('Error updating place:', error);
    res.redirect('/profile');
  }
};


module.exports.deletePageController = async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let place = await placeModel.findByIdAndDelete(req.params.id);
  user.places.remove(place._id);
  await user.save();
  res.redirect("/profile");
}
