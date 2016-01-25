angular.module('navbar', [])
	.directive('navbar',function ($q, systemsService) {
			return {
				restrict: 'E',
				templateUrl: 'views/navbar.html',
				link: function ($scope, elem, attr) {
            $scope.user = {
              email: 'burnsoft@gmail.com'
            }


					  $scope.ngModelOptionsSelected = function(value) {
					    if (arguments.length) {
					      _selected = value;
					    } else {
					      return _selected;
					    }
					  };


						$scope.modelOptions = {
							debounce: {
								default: 500,
								blur: 250
							},
							getterSetter: true
						};


						//wait for systems data to load, then draw systems and animate
						$scope.$watch(function() {
				        return systemsService.systems.length;
				    }, function(newVal, oldVal) {
								if(systemsService.systems.length >= 1){
									$scope.systems = systemsService.systems;
								}
				    });
        }
      }
    });
