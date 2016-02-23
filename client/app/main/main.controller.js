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

  $http.get('/api/things').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('thing', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    $http.post('/api/things', { name: self.newThing });
    self.newThing = '';
  };

  this.deleteThing = function(thing) {
    $http.delete('/api/things/' + thing._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('thing');
  });
}

angular.module('edGalaxyMap')
  .controller('MainController', MainController);

})();
