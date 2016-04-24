var tripPlanner = angular.module('tripPlanner', []);

var MainController = function($scope, $window, $location) {

	$scope.location = undefined;
	
	$scope.showMap = function() {
		if (!$scope.location)
			return;
		console.log("Current location: " + $scope.location);
		$window.location.href = "views/yourtrip.html";
	};
}

tripPlanner.controller('MainController', ['$scope', '$window', '$location', MainController]);

