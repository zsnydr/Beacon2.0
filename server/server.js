const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const router = require('./routes');
const config = require('./config');
const db = require('../db/config');

// const webpack = require('webpack');
// const webpackConfig = require('../webpack.config');
// const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const expressRouter = express.Router();
// const compiler = webpack(webpackConfig);

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// set configuration keys for Github authentication via Passport

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || config.keys.gitHubClientId,
    clientSecret: process.env.GITHUB_SECRET_KEY || config.keys.gitHubSecretKey,
    callbackURL: process.env.GIT_CALLBACK_URL || config.keys.gitCallbackUrl
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      return done(null, profile);
    });
  }
));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000 * 3 } // 30 mins
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(webpackDevMiddleware(compiler));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', expressRouter);
router(expressRouter);

app.set('port', process.env.PORT || 3000);

db.authenticate()
  .then(() => {
    console.log('Postgres connection established');
    app.listen(app.get('port'), () => {
      console.log(`Listening on port: ${app.get('port')}`);
    });
  })
  .catch((err) => {
    console.log(`Unable to connect to Postgres: ${err}`);
  });

module.exports = app;
