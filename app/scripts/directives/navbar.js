angular.module('edGalaxyMap')
	.directive('navbar',function ($rootScope, $q, $uibModal, systemsService) {
			return {
				restrict: 'E',
				templateUrl: 'views/navbar.html',
				link: function ($scope, elem, attr) {

						$scope.loggedIn = false;

            $scope.user = {
              email: 'burnsoft@gmail.com'
            }

						$scope.changeSystem = function($item, $model, $label, $event){
							$rootScope.$broadcast('selectedSystem:update', $item);
						}

						//wait for systems data to load, then draw systems and animate
						$scope.$watch(function() {
				        return systemsService.systems.length;
				    }, function(newVal, oldVal) {
								if(systemsService.systems.length >= 1){
									$scope.systems = systemsService.systems;
								}
				    });

						$scope.openLoginModal = function () {
						 var modalInstance = $uibModal.open({
							 animation: $scope.animationsEnabled,
							 templateUrl: '/scripts/directives/loginModal/loginModal.html',
							 controller: 'LoginModalCtrl',
							 size: 'md'
						 });

						 modalInstance.result.then(function () {
						 }, function () {
						 });
					 };
        }
      }
    });
