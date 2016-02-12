angular.module('edGalaxyMap')
  .controller('StationModalCtrl', function ($scope, $uibModalInstance, station, system, listingsService) {
    listingsService.findListingsByStationId(station.id);

    $scope.$watch(function() {
        return listingsService.loading;
    }, function(newVal, oldVal) {
        if(listingsService.loading){
          $scope.isLoading = true;
        }
        else{
          $scope.isLoading = false;
          $scope.listings = listingsService.listings;
        }
    });

    $scope.system = system;
    $scope.station = station;

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});
