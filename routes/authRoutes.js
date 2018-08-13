const passport = require('passport');

module.exports = app => {
  app.get('/authenticate', passport.authenticate('twitter'));

  app.get('/authenticate/callback', passport.authenticate('twitter'), (req, res) => {
    res.redirect('/');
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/getAuth/', (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
};
