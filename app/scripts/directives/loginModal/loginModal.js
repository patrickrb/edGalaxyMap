angular.module('edGalaxyMap').controller('LoginModalCtrl', function ($scope, $uibModalInstance) {



  $scope.ok = function () {
    console.log('ok clicked');
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
