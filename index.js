const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const cookieSession = require('cookie-session');

const config = require('./config/config.js');

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  token: String,
  tokenSecret: String,
  twitterId: String,
  username: String,
  displayName: String,
  profileImageUrl: String,
});

const User = mongoose.model('users', userSchema);
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }); // suppress deprecation warning

passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.TWITTER_CONSUMER_KEY,
      consumerSecret: config.TWITTER_CONSUMER_SECRET,
      callbackURL: '/auth/callback',
      proxy: true,
    },
    async function(token, tokenSecret, profile, cb) {
      const existingUser = await User.findOne({ twitterId: profile.id });
      if (existingUser) {
        return cb(null, existingUser);
      }
      const newUser = await new User({
        token: token,
        tokenSecret: tokenSecret,
        twitterId: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        profileImageUrl: profile._json.profile_image_url,
      }).save();
      return cb(null, newUser);
    }
  )
);

// user.id here is the unique id of database entry
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((obj, cb) => {
  User.findById(obj).then(user => {
    cb(null, user);
  });
});

const app = express();

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [config.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/apiRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));

  // Express will serve index.html for any
  // unrecognized path
  const path = require('path');
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
