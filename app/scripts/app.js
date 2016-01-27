'use strict';

angular.module('edGalaxyMap', ['edSystemMap', 'systemInfo', 'navbar','ui.bootstrap', 'ui.gravatar', 'loadingSpinner', 'ngRoute'])
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
