'use strict';

angular.module('wixApp')
    .controller('EventsController', function ($scope, $http) {
        $http.jsonp('http://api.bandsintown.com/artists/Kenny%20Chesney/events.json?api_version=2.0&app_id=bit&callback=JSON_CALLBACK')
            .success(function(data, status, headers, config)  {
                $scope.concerts = data;

            })
            .error(function() {
                alert('Cant get events');
            });


    });