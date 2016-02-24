'use strict';
(function() {

function MainController($scope, $rootScope, $http, socket) {
  var self = this;
  this.awesomeThings = [];

	 $scope.$watch(function() {
			 return $rootScope.systemInfoHidden;
	 }, function(newVal, oldVal) {
     $scope.systemInfoHidden = $rootScope.systemInfoHidden;
	 });

   $scope.$watch(function() {
       return $rootScope.colorSelectionHidden;
   }, function(newVal, oldVal) {
      $scope.colorSelectionHidden = $rootScope.colorSelectionHidden;
   });
}

angular.module('edGalaxyMap')
  .controller('MainController', MainController);

})();
