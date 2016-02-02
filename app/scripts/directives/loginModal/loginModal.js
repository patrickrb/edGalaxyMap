angular.module('edGalaxyMap').controller('LoginModalCtrl', function ($scope, $uibModalInstance, userService) {

  $scope.user = {
    email: null,
    password: null
  }

  $scope.login = function (user) {
    userService.login(user);
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
