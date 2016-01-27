angular.module('systemInfo', [])
	.directive('systemInfo',function ($q, systemsService, stationsService) {
			return {
				restrict: 'E',
				templateUrl: 'views/systemInfo.html',
				link: function ($scope, elem, attr) {
          $scope.$on('selectedSystem:update', function(event,data) {
            $scope.selectedSystem = data;
         });

					 $scope.$watch(function() {
							 return stationsService.loading;
					 }, function(newVal, oldVal) {
							 if(stationsService.loading){
								 console.log('stations loading');
								 $scope.isLoading = true;
							 }
							 else{
								 $scope.isLoading = false;
							 }
					 });
        }
      }
    });
