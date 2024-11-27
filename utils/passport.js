const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;

const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new googleStrategy(
    {
      clientID: google_client_id,
      clientSecret: google_client_secret,
      callbackURL: "http://localhost:3000/auth/google/redirect",
      scope: ["profile"],
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
