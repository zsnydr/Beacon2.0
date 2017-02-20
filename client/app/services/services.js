angular.module('app.services', [])

// Tickets factory - handles all tickets manipulations
.factory('Tickets', ['$http', '$window', ($http, $window) => {
  // Sends GET request to the server in order to render tickets
  const getTickets = () => {
    return $http({
      method: 'GET',
      url: '/tickets'
    })
    .then((resp) => {
      if (resp.data === 'failed') {
        // Redirects to signing if authentication fails
        console.log('failed')
        $window.location = '/#!/signin';
      }
      return resp;
    })
    .catch((err) => {
      console.log(`Error getting tickets in Tickets factory: ${err}`);
    });
  };

  // Sends POST request to the server in order to post a new ticket
  const addTicket = (ticket) => {
    return $http({
      method: 'POST',
      url: '/tickets',
      data: ticket
    });
  };

  // Sends PUT request to the server in order to mark the ticket as claimed
  const claimTicket = (ticket) => {
    return $http({
      method: 'PUT',
      url: '/claimed',
      data: ticket
    });
  };

  // Sends POST request to the server in order to erase the ticket from claims table
  const eraseClaim = (data) => {
    return $http({
      method: 'POST',
      url: '/eraseClaim',
      data
    });
  };

  // Sends PUT request to the server in order to mark the ticket as solved
  const solveTicket = (ticket) => {
    return $http({
      method: 'PUT',
      url: '/solved',
      data: ticket
    });
  };

  // Sends PUT request to the server in order to mark the ticket as NOT solved
  const unsolveTicket = (ticket) => {
    return $http({
      method: 'PUT',
      url: '/unsolved',
      data: ticket
    });
  };

  return {
    getTickets,
    addTicket,
    claimTicket,
    eraseClaim,
    solveTicket,
    unsolveTicket
  };
}])

// Tickets factory - handles authentication processes
.factory('Auth', ['$http', '$window', ($http, $window) => {

  // Redirects to path, so GitHub OAuth process will be triggered
  const signin = () => {
    $window.location = '/auth/github';
  };

  // Redirects to path, so signout process will be triggered and handled on the server side
  const signout = () => {
    $window.location = '/signout';
  };

  return {
    signin,
    signout
  };
}]);
