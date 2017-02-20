// Signin controller
angular.module('app.auth', [])
.controller('AuthController', ['$scope', 'AuthService', function($scope, AuthService) {
// Signin function attached to scope
  $scope.signin = () => {
    // Triggers signin from Auth factory
    AuthService.signin();
  };
}]);
