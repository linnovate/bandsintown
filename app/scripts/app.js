'use strict';

angular.module('wixApp', [
    'ngRoute',
    'wix'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'views/app.html',
                controller: 'MainCtrl'
            })
            .when('/events',{
                templateUrl: 'views/events.html',
                controller: 'EventsController'
            })
            .otherwise({
                redirectTo: '/events'
            });
    });