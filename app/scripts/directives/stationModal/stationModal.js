angular.module('edGalaxyMap').controller('StationModalCtrl', function ($scope, $uibModalInstance, station, system) {
  $scope.system = system;
  $scope.station = station;
  console.log('got station in modal ctrl', $scope.station);

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
