var app = angular.module('yourTripPlanner', []);

var yourTripController = function($scope, $window, $location) {

	$scope.email = undefined;
	
	$scope.markers = [
	    // name, lat, lng, z-index
		["Upper Geyser Basin", 44.46437, -110.82909, 1],
		["Old Faithful", 44.45664, -110.83144, 2],
		["Firehole Lake", 44.54422, -110.78476, 3],
		["Grand Prismatic Spring", 44.52508, -110.83818, 4],
		["Great Fountain Geyster", 44.53659, -110.80003, 5]
	];
	
	$scope.description = {
			'Yellow Stone': {
				url: '../imgs/yellowStone/yellowStone.jpg',
				description: "Yellow Stone",
				hour: 15,
			},
			'Old Faithful': {
				url: '../imgs/yellowStone/oldFaithful.jpg',
				description: "Old Faithful",
				hour: 2,
			},
			'Grand Prismatic Spring': {
				url: '../imgs/yellowStone/grandPrismaticSpring.jpg',
				description: "Grand Prismatic Spring",
				hour: 3,
			},
	};
	
	$scope.markerDetails = $scope.description['Yellow Stone'];
	
	$scope.days = [
	    {
	    	selected: false,
	    	places: [
	    	{
	    		name: "Mount Rainer",
	    		hour: 4,
	    	},
	    	{
	    		name: "Space Needle",
	    		hour: 3,
	    	}]
	    	
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
		
		$scope.days.push(newDay);
	};
	
	$scope.deleteDay = function() {
		if (!$scope.days) return;
		$scope.days.splice($scope.days.length-1, 1);
	};
	
	$scope.$on('clickMarker', function (event, args) {
		 console.log(args.message);
		 $scope.markerDetails = $scope.description[args.message];
		 $scope.$apply();
	});
	
	$scope.$on('addPlace', function (event, args) {
		 console.log(args.message);
		 addPlace(args.message);
	});
	
	function addPlace(name) {
		for (var i=0; i<$scope.days.length; i++) {
			if ($scope.days[i].selected) {
				$scope.days[i].places.push({
					name: name,
					hour: $scope.markerDetails.hour,
				});
				$scope.$apply();
				return;
			}
		}
	}
	
	
	$scope.sendEmail = function() {
		if (!$scope.email)
			return;
		console.log("Current email: " + $scope.email);
	};
}
app.controller('yourTripController', ['$scope', yourTripController]);

app.directive('day', function() {
  return {
    restrict: 'E',
    scope: {
      viewModel: '='
    },
    templateUrl: '../views/day.html',
    controller: function($scope, $element){
    	$scope.selected = function() {
        	$scope.viewModel.selected = !$scope.viewModel.selected;
        };
        
        $scope.totalHours = 0;
        
        $scope.$watch('viewModel.places.length', function(){
        	$scope.totalHours = 0;
        	for (var i=0; i<$scope.viewModel.places.length; i++){
            	$scope.totalHours += $scope.viewModel.places[i].hour;
            }
        	$scope.apply();
        });
    },
  };
});

app.directive('maps', function() {
	  return {
	    restrict: 'E',
	    scope: {
	    	markers: '='
	    },
	    templateUrl: '../views/map.html',
	    controller: function($scope, $element){
	    	
	    	function addMarker(map, i) {
	    		var current = $scope.markers[i];
            	var marker = new google.maps.Marker({
            	      position: {lat: current[1], lng: current[2]},
            	      map: map,
            	      title: current[0],
            	      zIndex: current[3]
            	});

            	marker.addListener('click', function() {
  	    			$scope.$emit('clickMarker', {message: marker.title});
  	    		});
	    	}
	    	
	    	function initialize() {
	    		// Create map of YellowStone NP and specify the DOM element for display.
                var map = new google.maps.Map(document.getElementById('googleMap'), {
                  center: { lat:44.42796, lng:-110.58845 },
                  scrollwheel: false,
                  zoom: 11   // zoom level
                });

                // Create markers
                for (var i = 0; i < $scope.markers.length; i++){
                	addMarker(map, i);
                }
	    	}
	    	google.maps.event.addDomListener(window, 'load', initialize);    
	    },
	  };
});


app.directive('description', function() {
	  return {
	    restrict: 'E',
	    scope: {
	      viewModel: '='
	    },
	    templateUrl: '../views/description.html',
	    controller: function($scope, $element){
	    	$scope.addPlace = function() {
	    		$scope.$emit('addPlace', {message: $scope.viewModel.description});
	    	};
	    },
	  };
});