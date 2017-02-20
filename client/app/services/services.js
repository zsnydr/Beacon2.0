angular.module('app.services', [])
// Tickets factory - handles all tickets manipulations
.service('TicketService', ['$http', '$window', function($http, $window) {
  // Sends GET request to the server in order to render tickets
  this.getTickets = () => {
    return $http({
      method: 'GET',
      url: '/api/tickets'
    })
    .then((resp) => {
      if (resp.data === 'failed') {
        // Redirects to signing if authentication fails
        $window.location = '/#!/signin';
      }
      return resp;
    })
    .catch((err) => {
      console.log(`Error getting tickets in Tickets factory: ${err}`);
    });
  };

  // Sends POST request to the server in order to post a new ticket
  this.addTicket = (ticket) => {
    return $http({
      method: 'POST',
      url: '/api/tickets',
      data: ticket
    });
  };

  // Sends PUT request to the server in order to mark the ticket as claimed
  this.claimTicket = (ticket) => {
    return $http({
      method: 'PUT',
      url: '/api/claimed',
      data: ticket
    });
  };

  // Sends POST request to the server in order to erase the ticket from claims table
  this.eraseClaim = (data) => {
    return $http({
      method: 'POST',
      url: '/eraseClaim',
      data
    });
  };

  // Sends PUT request to the server in order to mark the ticket as solved
  this.solveTicket = (ticket) => {
    return $http({
      method: 'PUT',
      url: '/api/solved',
      data: ticket
    });
  };

  // Sends PUT request to the server in order to mark the ticket as NOT solved
  this.unsolveTicket = (ticket) => {
    return $http({
      method: 'PUT',
      url: '/api/unsolved',
      data: ticket
    });
  };
}])

// Tickets factory - handles authentication processes
.service('AuthService', ['$http', '$window', function($http, $window) {
  // Redirects to path, so GitHub OAuth process will be triggered
  this.signin = () => {
    $window.location = '/api/auth/github';
  };

  // Redirects to path, so signout process will be triggered and handled on the server side
  this.signout = () => {
    $window.location = '/api/signout';
  };
}]);
