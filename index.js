const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const cookieSession = require('cookie-session');
const config = require('./config/config.js');

passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.TWITTER_CONSUMER_KEY,
      consumerSecret: config.TWITTER_CONSUMER_SECRET,
      callbackURL: '/authenticate/callback',
    },
    function(token, tokenSecret, profile, cb) {
      return cb(null, profile);
    }
  )
);

// Only store the twitter profile id, we can lookup
// profile info using it later
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
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

app.get('/authenticate', passport.authenticate('twitter'));

app.get('/authenticate/callback', passport.authenticate('twitter'), (req, res) => {
  res.redirect('/');
});

// homepage route
// app.get('/', (req, res) => {
//   res.send(req.body);
// });

app.use(express.static('./client/build'));
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'client', 'build', 'index.html'));
});

app.listen(5000);
