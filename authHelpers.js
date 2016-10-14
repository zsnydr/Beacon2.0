const passport = require('passport');
const session = require('express-session');
const githubAuth = require('./gitAuth');

module.exports.auth = function(app) {
  app.use(session({ secret: 'login to our new site',
            resave : true,
            saveUninitialized: true,
            cookie: {maxAge: 30000},
          }));

 app.use(passport.initialize());
 app.use(passport.session());

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((user,done) => {

        if (!err) done(null, user);
        else done(err, null);
});



  githubAuth();


  app.get('/auth/github',
      passport.authenticate('github', { scope: [ 'user:email' ] }),
      function(req, res){
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
      });
  app.get('/callback',
      passport.authenticate('github', { failureRedirect: '/session' }),
      (req, res) => {
        console.log('SESSION:', req.session);
        res.redirect('/');
      });

}
