angular.module('edGalaxyMap').controller('RegisterModalCtrl', function ($scope, $uibModalInstance, userService) {

  $scope.registerUser = {
    name: null,
    email: null,
    password: null
  }

  $scope.register = function (registerUser) {
    console.log('sending user: ', registerUser);
    userService.register(registerUser);
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
