const { User, Ticket, Claim } = require('../db/schema');

module.exports = {
  newUser: ({ username, displayName }) => {
    return User.findOrCreate({
      where: {
        username,
        displayname: displayName
      }
    });
  },

  getTickets: () => {
    return Ticket.findAll({ include: [User] })
    .then((tickets) => {
      return Claim.findAll({ include: [User, Ticket] })
      .then((claims) => {
        return { tickets, claims };
      });
    });
  },

  addToQueue: ({ message, location, x, y, color }, { userID }) => {
    return Ticket.create({
      message,
      location,
      x,
      y,
      color,
      userId: userID
    })
    .then((ticket) => {
      return Ticket.findAll();
    });
  },

  tagClaimed: ({ id, userId }, { userID }) => {
    Ticket.find({ where: { id } })
    .then((ticket) => {
      ticket.update({ claimed: true });
    })
    .then(() => {
      Claim.create({
        userId: userID,
        ticketId: id,
        helpeeId: userId
      });
    });
  },

  eraseClaim: ({ id, ticketId }) => {
    Claim.destroy({ where: { id } })
    .then(() => {
      Ticket.find({ where: { id: ticketId } });
    })
    .then((ticket) => {
      ticket.update({ preSolved: true });
    });
  },

  tagSolved: (id) => {
    Ticket.find({ where: { id } })
    .then((ticket) => {
      ticket.update({ solved: true });
    });
  },

  tagUnSolved: (id) => {
    Ticket.find({ where: { id } })
    .then((ticket) => {
      ticket.update({ preSolved: false, claimed: false });
    });
  }
};
