angular.module('systemInfo', [])
	.directive('systemInfo',function ($q, systemsService) {
			return {
				restrict: 'E',
				templateUrl: 'views/systemInfo.html',
				link: function ($scope, elem, attr) {
          $scope.$on('selectedSystem:update', function(event,data) {
            $scope.selectedSystem = data;
            $scope.$apply();
         });
        }
      }
    });
