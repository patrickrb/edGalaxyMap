'use strict';

angular.module('edGalaxyMap')
.directive('colorSelection', function ($rootScope, $q, colorService) {
	return {
		restrict : 'E',
		templateUrl : 'components/colorSelection/colorSelection.html',
		link : function ($scope) {
			$scope.$on('selectedSystem:update', function (event, data) {
				$scope.selectedSystem = data;
			});

			$scope.$on('systemColoring:update', function() {
				$scope.colorNames = colorService.getColorNames();
				$scope.activeColors = colorService.getActiveColors();
			});


		 $scope.hideColorSelection = function(){
			 	$rootScope.colorSelectionHidden = true;
		 };

			$scope.updateColorFlags = function(index) {
				colorService.setColorActive(index, $scope.activeColors[index]);
				$rootScope.$broadcast('systemColoring:updateActives');
			};

			$scope.colorNames = colorService.getColorNames();
			$scope.activeColors = colorService.getActiveColors();

			$scope.colors = colorService.colorPalette;

		}
	};
});
