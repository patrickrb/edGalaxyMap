angular.module('edGalaxyMap').controller('LoginModalCtrl', function ($scope, $uibModalInstance, loginService) {

  $scope.user = {
    email: null,
    password: null
  }

  $scope.login = function (user) {
    loginService.login(user);
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
