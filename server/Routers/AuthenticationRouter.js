const router = require("express").Router();
const AuthenticationController = require("../Controllers/AuthenticationController");
const passport = require("passport");

router.post("/login", [], AuthenticationController.login);
router.post("/register", AuthenticationController.signUp);
router.post("/forgotPassword", AuthenticationController.forgotPassword);
router.post("/requestOTP", AuthenticationController.requestOTP);
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {  
    res.redirect("http://localhost:3000/student/courses");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
