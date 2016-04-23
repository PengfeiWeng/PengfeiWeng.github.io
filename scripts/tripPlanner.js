var tripPlanner = angular.module('tripPlanner', ['ngRoute']);

var MainController = function($scope) {

	$scope.location = undefined;
	
	$scope.showMap = function() {
		if (!$scope.location)
			return;
		console.log($scope.location);
	};
}

tripPlanner.controller('MainController', ['$scope', MainController]);



