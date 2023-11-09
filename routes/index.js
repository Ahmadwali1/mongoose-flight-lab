var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate(
    //which passport strategy is being used?
    "google",
    {
      // Requesting the user's profile and email
      scope: ["profile", "email"],
      // Optionally force pick account every time
      prompt: "select_account",
    }
  )
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    // Change to what's best for your app
    failureRedirect: "/",
  })
);

//Oauth logout route
router.get("/logout", function (req, res) {
  req.logOut(function () {
    res.redirect("/");
  });
});

module.exports = router;
