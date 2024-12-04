const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new googleStrategy(
    {
      clientID: google_client_id,
      clientSecret: google_client_secret,
      callbackURL: `${process.env.HOST}/api/v1/auth/google/redirect`,
      scope: ["profile", "email"],
    },
    (authUser = async (request, accessToken, refreshToken, profile, done) => {
      const name = profile.name.givenName + " " + profile.name.familyName;
      const email = profile.emails[0].value;
      const profilePicture = profile.photos[0].value;

      const currentUser = await User.findOne({ email });
      if (!currentUser) {
        const newUser = new User({
          email: email,
          profile_image: profilePicture,
          user_name: name,
          password: email + " " + name + "_",
        });
        await newUser.save();

        return done(null, newUser);
      }
      return done(null, currentUser);
    })
  )
);

passport.serializeUser((user, done) => {
  done(null, { userId: user._id, name: user.user_name });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
