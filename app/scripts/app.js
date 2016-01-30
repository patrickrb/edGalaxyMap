'use strict';

angular.module('edGalaxyMap', ['ui.bootstrap', 'ui.gravatar', 'ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
