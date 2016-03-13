var tripPlanner = angular.module('tripPlanner');
var MainController = function($scope, $http, $location) {

  var person = {
    first: "Pengfei",
    last: "Weng"
  };

  var onSucceed = function(response) {
    $scope.user = response.data;
  };

  var onError = function(reason) {
    $scope.error = "cannot find it!";
  }

  $http.get("https://api.github.com/users/angular").then(onSucceed, onError);

  $scope.username = "angular";
  $scope.message = 'Angular Viewer';
  $scope.person = person;
  
  //$location.path('/tours');
}

tripPlanner.controller('MainController', ['$scope', '$http', '$location', MainController]);