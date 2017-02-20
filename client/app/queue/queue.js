// Queue controller

angular.module('app.queue', [])
.controller('QueueController', ['$scope', 'TicketService', 'AuthService', '$interval', function($scope, TicketService, AuthService, $interval) {
  $scope.data = {};

  const initializeQueue = () => {
    // retrieve tickets from database
    TicketService.getTickets()
    .then((results) => {
      // add tickets to the scope
      $scope.data.tickets = results.data.tickets;
      // iterate through all tickets
      $scope.data.tickets.forEach((ticket) => {
        // if the userId of the ticket matches the current session user
        if (ticket.userId === results.data.userID) {
          // add and set isMine attribute to true
          ticket.ismine = true;
        } else {
          ticket.ismine = false;
        }
      });

      // set claims to the scope
      $scope.data.claims = results.data.claims;

      // iterate through all claims
      // for (let claim of $scope.data.claims) {
      $scope.data.claims.forEach((claim) => {
        // if the helpee (user) id of the claim matches the current session user
        if (claim.helpeeId === results.data.userID) {
          // alert the helpee and include the name of the user who claimed the ticket
          alert(`${claim.user.displayname} is on their way!`);

          // for (let ticket of $scope.data.tickets) {
          $scope.data.tickets.forEach((ticket) => {
            // if the ticket's claimed attribute is true
            // and the user of the claimed ticket matches the current session user
              // set the ticket's preSolved state to true
            if (ticket.claimed && ticket.userId === results.data.userID) {
              ticket.preSolved = true;
            }
          });
          // Delete the claim from the database
          TicketService.eraseClaim(claim)
          .then(() => {
            // wipe out client-side claims object
            $scope.data.claims = {};
          });
        }
      });
    })
    .catch((err) => {
      console.log(`Error in initializeQueue: ${err}`);
    });
  };

  $scope.ticket = {};

  $scope.addTicket = () => {
  // retrieve new ticket from html form, pass to add Ticket function
    TicketService.addTicket($scope.ticket)
    .then(() => {
      $scope.ticket = {};
      initializeQueue();
    })
    .catch((err) => {
      console.log(`Error adding ticket in queue controller: ${err}`);
    });
  };

  $scope.signout = () => {
    AuthService.signout();
  };

  $scope.claimTicket = (ticket) => {
    // once 'claim' has been clicked'
      // pass the claimed ticket to claim Ticket service
    TicketService.claimTicket(ticket)
    .then(() => {
      initializeQueue();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  $scope.solveTicket = (ticket) => {
    // if 'Solved' has been clicked on the ticket, pass that ticket into solveTicket service
    TicketService.solveTicket(ticket)
    .then(() => {
      initializeQueue();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  $scope.unsolveTicket = (ticket) => {
    // if 'Not Solved' is clicked, pass the ticket to unsolveTicket service
    TicketService.unsolveTicket(ticket)
    .then(() => {
      initializeQueue();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  initializeQueue();

  // place initialize queue in an interval so new tickets can be loaded continuously every 3 seconds
  // const interval = $interval(initializeQueue, 3000);
  // const isRunning = true;

  // renews interval if it has not been running already when hover event is over
  // $scope.renew = function () {
  //   if (!isRunning) {
  //     initializeQueue();
  //     interval = $interval(initializeQueue, 3000);
  //     isRunning = true;
  //   }
  // };
}]);
