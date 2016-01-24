angular.module('navbar', [])
	.directive('navbar',function ($q, systemsService) {
			return {
				restrict: 'E',
				templateUrl: 'views/navbar.html',
				link: function ($scope, elem, attr) {
            $scope.user = {
              email: 'burnsoft@gmail.com'
            }
        }
      }
    });
