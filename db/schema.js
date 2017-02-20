const Sequelize = require('sequelize');
const db = require('./config');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING, //GitHub username
  displayname: Sequelize.STRING //full first and last name
});

//Creates table of tickets
const Ticket = db.define('ticket', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message: Sequelize.TEXT,
  location: Sequelize.STRING,
  //pulsing dot coordinates
  x: Sequelize.INTEGER,
  y: Sequelize.INTEGER,
  //dot color
  color: Sequelize.STRING,

  claimed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  solved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  preSolved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

//creates table of claimed tickets
const Claim = db.define('claim', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  //id of the user who claimed the ticket
  helpeeId: Sequelize.INTEGER
});

//Defines relationships between tables
User.hasMany(Ticket);
Ticket.belongsTo(User);

User.hasMany(Claim);
Claim.belongsTo(User);

Ticket.hasOne(Claim);
Claim.belongsTo(Ticket);

// Create Tables
db
  .sync({ force: false })
  .then(() => {
    console.log('Postgres tables synced');
  })
  .catch((err) => {
    console.log(`Error syncing tables: ${err}`);
  });

module.exports = {
  User,
  Ticket,
  Claim
};
