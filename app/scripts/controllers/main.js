'use strict';

angular.module('edGalaxyMap')
	.controller('MainCtrl', function ($scope, userService) {
		userService.init();
	});
