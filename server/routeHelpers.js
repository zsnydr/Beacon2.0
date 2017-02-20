const dbHelpers = require('./dbHelpers');

module.exports = {
  // if the current user does not exist in the users table, create a new record,
  // then retrieve the user's information
  newUser: (req, res, next) => {
    dbHelpers.newUser(req.session.passport.user)
    .then((user) => {
      req.session.userID = user[0].dataValues.id;
      next();
    })
    .catch((err) => {
      console.log(`Error creating new user: ${err}`);
    });
  },

  // middleware that validates the user is currently logged in by analyzing the session
  isLoggedIn: (req, res, next) => {
    if (req.session && req.session.passport && req.session.passport.user.username && req.session.passport.user.provider === 'github') {
      next();
    } else {
      console.log('Failed loggedIn middleware');
      res.end('failed');
    }
  },

  terminateSession: (req, res) => {
    req.session.destroy();
    res.redirect('/#!/signin');
  },

  // query for all tickets and claims that exist in DB and send to client
  getTickets: (req, res) => {
    return dbHelpers.getTickets()
    .then(({ tickets, claims }) => {
      res.send({ tickets, claims, userID: req.session.userID });
    });
  },

  // create a new ticket instance and add it to the tickets table
  addToQueue: (req, res) => {
    console.log('req.session', req.session)
    return dbHelpers.addToQueue(req.body, req.session)
    .then((tickets) => {
      res.json(tickets);
    })
    .catch((err) => {
      console.log(`Error adding to queue: ${err}`);
    });
  },

  // mark the given ticket as claimed in the tickets table,
  // then add a new claim to the claims table
  tagClaimed: (req, res) => {
    dbHelpers.tagClaimed(req.body, req.session)
    .then(res.end)
    .catch((err) => {
      console.log(`Error tagging claimed: ${err}`);
    });
  },

  // delete the given claim from the claims table,
  // then flag the corresponding ticket as 'preSolved'
  eraseClaim: (req, res) => {
    dbHelpers.eraseClaim(req.body)
    .then(res.end)
    .catch((err) => {
      console.log(`Error erasing claim: ${err}`);
    });
  },

  // flag the given ticket as solved in the tickets table
  tagSolved: (req, res) => {
    dbHelpers.tagSolved(req.body.id)
    .then(res.end)
    .catch((err) => {
      console.log(`Error tagging solved: ${err}`);
    });
  },

  // flag the given ticket as not solved in the tickets table
  tagUnSolved: (req, res) => {
    dbHelpers.tagUnSolved(req.body.id)
    .then(res.end)
    .catch((err) => {
      console.log(`Error tagging un-solved: ${err}`);
    });
  }
};
