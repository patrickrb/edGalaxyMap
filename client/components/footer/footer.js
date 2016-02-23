angular.module('edGalaxyMap')
	.directive('footer',function () {
			return {
				restrict: 'E',
				templateUrl: 'components/footer/footer.html',
				link: function ($scope, elem, attr) {
            $scope.projectUrl = 'https://github.com/patrickrb/edGalaxyMap';
        }
      }
    });
