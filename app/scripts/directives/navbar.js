angular.module('edGalaxyMap')
	.directive('navbar',function ($rootScope, $q, $uibModal, systemsService, loginService, $cookieStore) {
			return {
				restrict: 'E',
				templateUrl: 'views/navbar.html',
				link: function ($scope, elem, attr) {
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

						$scope.$watch(function() {
								return loginService.isLoggedIn;
						}, function(newVal, oldVal) {
							if(loginService.isLoggedIn){
								$scope.user = $cookieStore.get('user');
								$scope.isLoggedIn = true
							}
							else{
								$scope.isLoggedIn = false;
							}
						});

						$scope.logout = function(){
							loginService.logout();
						}

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
