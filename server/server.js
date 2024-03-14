const express = require("express");
const app = express();
const path = require("path");
const AuthenticationRouter = require("./Routers/AuthenticationRouter");
const PermissionRouter = require("./Routers/PermissionRouter");
const RequestRouter = require("./Routers/RequestRouters");
const CourseRouter = require("./Routers/CourseRouter");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const modifiedCourse = require("./Models/modifiedCourse");



dotenv.config();
require("./passport")(passport);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);



app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req, res) => {
  res.send("Working");
});
app.use("/Auth", AuthenticationRouter);
app.use("/Permissions", PermissionRouter);
app.use("/Course", CourseRouter);
app.use("/requests", RequestRouter);
if (process.env.NODE_ENV == "production") {
  app.listen(3000, "127.0.0.1", 511, () => {
    console.log(`Production server is running on port 3000`);
  });
  app.use(express.static(path.join(__dirname, "./build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./build", "index.html"));
  });
} else {
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
}
