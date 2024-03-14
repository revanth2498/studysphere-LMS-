const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const UserSigned = require("./Models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/Auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: "sdoifnsdofnosdnfosd",
          image: profile.photos[0].value,
          role:"student"
        };
        try {
          let user = await UserSigned.findOne({ googleId: profile.id });
          console.log("this is trying to create a new user");
          console.log(user);
          if (user) {
            console.log("this is trying to create a find user");
            console.log(user);
            done(null, user);
          } else {
            console.log("this is trying to create a new user");
            console.log(user);
            user = await UserSigned.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserSigned.findById(id)
      .then((user) => {
        done(null, user); 
      })
      .catch((err) => {
        done(err, null);
      });
  });
};
