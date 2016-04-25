var app = angular.module('yourTripPlanner', []);

var yourTripController = function($scope, $window, $location) {

	$scope.email = undefined;
	
	$scope.days = [
	    {
	    	selected: false,
	    	places: ["Mount Rainer", "Pike Market", "Space Needle"],
	    },
	    {
	    	selected: false,
	    	places: ["UW"],
	    },
	    {
	    	selected: false,
		    places: [],
	    }
	];
	
	$scope.addDay = function() {
		if (!$scope.days)
			$scope.days = [];
		
		var newDay = {
		    selected: false,
		    places: [],
		};
		
		for (var i=0; i<$scope.days.length; i++) {
			if ($scope.days[i].selected) {
				$scope.days.splice(i, 0, newDay);
				return;
			}
		}
		
		$scope.days.push(newDay);
	};
	
	$scope.deleteDay = function() {
		if (!$scope.days) return;
		for (var i=0; i<$scope.days.length; i++) {
			if ($scope.days[i].selected) {
				$scope.days.splice(i, 1);
				return;
			}
		}
	};
	
	$scope.sendEmail = function() {
		if (!$scope.email)
			return;
		console.log("Current email: " + $scope.email);
	};
}

app.controller('yourTripController', ['$scope', yourTripController]);

app.directive('day', function() {
  return {
    require: 'ngModel',
    restrict: 'E',
    scope: {
      viewModel: '='
    },
    templateUrl: '../views/day.html',
    controller: function($scope, $element){
    	$scope.selected = function() {
        	$scope.viewModel.selected = !$scope.viewModel.selected;
        };
    },
  };
});