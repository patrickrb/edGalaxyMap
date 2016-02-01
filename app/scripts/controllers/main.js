'use strict';

angular.module('edGalaxyMap')
	.controller('MainCtrl', function ($scope, loginService) {
		loginService.init();
	});
