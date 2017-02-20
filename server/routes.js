const passport = require('passport');
const routeHelpers = require('./routeHelpers');

module.exports = (app) => {
  app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

  app.get('/callback', passport.authenticate('github', { failureRedirect: '/session' }), routeHelpers.newUser, (req, res) => {
    // upon Github authentication, add the passport object to the current cookie
    // and redirect to tickets page
    req.session.cookie.passport = req.session.passport;
    res.redirect('/#!/tickets');
  });

  app.get('/tickets', routeHelpers.isLoggedIn, routeHelpers.getTickets);

  app.post('/tickets', routeHelpers.isLoggedIn, routeHelpers.addToQueue);

  app.put('/claimed', routeHelpers.isLoggedIn, routeHelpers.tagClaimed);

  app.post('/eraseClaim', routeHelpers.isLoggedIn, routeHelpers.eraseClaim);

  app.put('/solved', routeHelpers.isLoggedIn, routeHelpers.tagSolved);

  app.put('/unsolved', routeHelpers.isLoggedIn, routeHelpers.tagUnSolved);

  app.get('/signout', routeHelpers.isLoggedIn, routeHelpers.terminateSession)
};
