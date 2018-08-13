const passport = require('passport');

module.exports = app => {
  app.get('/auth/authenticate', passport.authenticate('twitter'));

  app.get('/auth/callback', passport.authenticate('twitter'), (req, res) => {
    res.redirect('/');
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/status', (req, res) => {
    console.log(req.user.id);
    res.send(req.user.id);
  });
};
