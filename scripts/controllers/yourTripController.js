var app = angular.module('yourTripPlanner', []);

var yourTripController = function($scope, $window, $location) {

	$scope.email = undefined;
	
	$scope.sendEmail = function() {
		if (!$scope.email)
			return;
		console.log("Current location: " + $scope.email);
	};
}

app.controller('yourTripController', ['$scope', yourTripController]);